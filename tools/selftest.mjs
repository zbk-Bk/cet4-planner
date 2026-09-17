/* 无浏览器自检：加载全部模块，渲染每条路由，检查计划生成与同步码往返
   运行：node tools/selftest.mjs */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = process.cwd();
function node() {
  const n = {
    innerHTML: '', textContent: '', value: '', hidden: false, checked: false, disabled: false,
    style: { setProperty() {} }, dataset: {}, files: [],
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    parentNode: { replaceChild() {} },
    addEventListener() {}, removeEventListener() {}, appendChild() {}, remove() {},
    setAttribute() {}, getAttribute() { return null; }, hasAttribute() { return false; },
    querySelector() { return node(); }, querySelectorAll() { return []; },
    closest() { return null; }, contains() { return false; }, focus() {}, select() {}, click() {}
  };
  return n;
}
let viewNode = node();
let lastMain = null;
const store = {};

globalThis.window = globalThis;
globalThis.console = console;
globalThis.location = { hash: '#/today', href: 'file:///app/index.html#/today', protocol: 'file:', origin: 'file://' };
try { Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node' }, configurable: true }); } catch (e) {}
globalThis.scrollTo = () => {};
globalThis.setInterval = () => 0;
globalThis.setTimeout = (f) => 0;
globalThis.clearTimeout = () => {};
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; }
};
globalThis.document = {
  getElementById: (id) => (id === 'view' ? (lastMain || viewNode) : node()),
  createElement: (tag) => { const n = node(); if (tag === 'main') lastMain = n; return n; },
  querySelector: () => node(),
  querySelectorAll: () => [],
  addEventListener() {},
  body: node(),
  documentElement: node()
};

const files = [
  'assets/js/data-vocab.js', 'assets/js/data-reading.js', 'assets/js/data-writing.js', 'assets/js/data-skills.js',
  'assets/js/util.js', 'assets/js/libs.js', 'assets/js/store.js', 'assets/js/plan.js',
  'assets/js/practice.js', 'assets/js/practice2.js', 'assets/js/views.js'
];
for (const f of files) vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f });

let fails = 0;
function check(name, fn) {
  try {
    const r = fn();
    if (r === false) { fails++; console.log('FAIL  ' + name); }
    else console.log('ok    ' + name + (typeof r === 'string' ? '  → ' + r : ''));
  } catch (e) {
    fails++; console.log('ERROR ' + name + '  → ' + e.message + '\n      ' + (e.stack || '').split('\n')[1]);
  }
}

check('题库统计', () => JSON.stringify(Libs.stats()));
check('词表字段完整', () => {
  const bad = Libs.vocab.filter((w) => !w.w || !w.zh || !w.en || !w.zhEx);
  if (bad.length) throw new Error(bad.length + ' 条词缺字段，例如 ' + JSON.stringify(bad[0]));
  return Libs.vocab.length + ' 词全部完整';
});
check('短语与同义替换', () => Libs.phrases.length + ' 短语 / ' + Libs.synonyms.length + ' 组替换');
check('计划生成 60 天', () => {
  const p = Plan.build();
  if (p.total !== 60) throw new Error('天数 = ' + p.total);
  return p.total + ' 天 / ' + p.taskTotal + ' 项任务 / 阶段 ' + p.stageCount.map((s) => s.name + s.count).join(' ');
});
check('每天任务数与时长达标', () => {
  const p = Plan.build();
  const bad = p.days.filter((d) => d.tasks.length < 3 || d.minutes < 30 || d.minutes > 400);
  if (bad.length) throw new Error('异常天数：' + bad.map((d) => d.i + '(' + d.tasks.length + '项/' + d.minutes + '分)').join(', '));
  const avg = Math.round(p.days.reduce((s, d) => s + d.minutes, 0) / p.total);
  return '平均每天 ' + avg + ' 分钟';
});
check('所有任务内容可解析', () => {
  const p = Plan.build();
  let n = 0;
  p.days.forEach((d) => d.tasks.forEach((t) => {
    if (t.module === 'listening' && !Libs.byId(Libs.listening, t.data.id)) throw new Error('听力 ' + t.data.id);
    if (t.module === 'reading' && !Libs.byId(Libs.reading, t.data.id)) throw new Error('阅读 ' + t.data.id);
    if (t.module === 'writing' && !Libs.byId(Libs.writing, t.data.id)) throw new Error('写作 ' + t.data.id);
    if (t.module === 'translation' && !Libs.byId(Libs.translation, t.data.id)) throw new Error('翻译 ' + t.data.id);
    if (t.module === 'grammar' && !Libs.byId(Libs.grammar, t.data.id)) throw new Error('语法 ' + t.data.id);
    if (t.module === 'skill' && !Libs.byId(Libs.skills, t.data.id)) throw new Error('技巧 ' + t.data.id);
    if (t.module === 'vocab' && !t.data.words && !t.data.phrases) throw new Error('词汇任务没有内容');
    n++;
  }));
  return n + ' 项任务全部可定位到内容';
});
check('任务详情渲染', () => {
  const p = Plan.build();
  let n = 0;
  p.days.forEach((d) => d.tasks.forEach((t) => {
    const html = Practice.task(t, d.i);
    if (!html || html.length < 80) throw new Error('第 ' + d.i + ' 天 ' + t.module + ' 渲染过短');
    if (/undefined/.test(html)) throw new Error('第 ' + d.i + ' 天 ' + t.module + ' 出现 undefined');
    n++;
  }));
  return n + ' 个任务详情全部渲染成功';
});
check('每周都覆盖听力/阅读/写作/翻译', () => {
  const p = Plan.build();
  const week = p.days.slice(0, 7).map((d) => d.title).join(' | ');
  ['听力', '阅读', '写作', '翻译'].forEach((m) => { if (week.indexOf(m) < 0) throw new Error('第一周缺少 ' + m); });
  return week;
});
check('每日计划（设置 45/90/180 分钟）', () => {
  const out = [];
  [45, 90, 180].forEach((m) => {
    Store.get().dailyMinutes = m;
    Plan.reset();
    const p = Plan.build();
    out.push(m + '分钟→' + Math.round(p.days[0].minutes) + '分/' + p.days[0].tasks.length + '项');
  });
  Store.get().dailyMinutes = 120; Plan.reset();
  return out.join('  ');
});
check('间隔重复复习词', () => {
  const r = Plan.reviewWordsFor(8, 20).map((w) => w.w);
  if (!r.length) throw new Error('第 8 天没有复习词');
  return r.length + ' 词（例：' + r.slice(0, 5).join(', ') + '）';
});
function rendered() { return (lastMain || viewNode).innerHTML || ''; }

check('路由渲染', () => {
  const routes = ['#/today', '#/plan', '#/day/1', '#/day/30', '#/day/60', '#/vocab', '#/practice',
    '#/listen/L01', '#/read/R03', '#/write/W01', '#/trans/T01', '#/gram/G05', '#/skill/S09', '#/mock', '#/stats', '#/settings'];
  const out = [];
  routes.forEach((h) => {
    globalThis.location.hash = h;
    App.render();
    const html = rendered();
    if (!html || html.length < 200) throw new Error(h + ' 渲染为空');
    if (/undefined/.test(html)) throw new Error(h + ' 出现 undefined');
    out.push(h + ':' + Math.round(html.length / 1024) + 'KB');
  });
  return out.join(' ');
});
check('进度勾选与统计', () => {
  [1, 2, 3].forEach((i) => Plan.day(i).tasks.forEach((t) => Store.setTask(i, t.idx, true, t.min)));
  Store.get().wordStat['abandon'] = { m: 3, n: 3, t: '2026-09-17' };
  const s = Plan.stats();
  if (s.doneTasks < 10) throw new Error('完成数异常 ' + s.doneTasks);
  return '完成 ' + s.doneTasks + '/' + s.taskTotal + ' · 完成率 ' + s.rate + '% · 连续打卡 ' + Store.streak() + ' 天';
});
check('统计页与模考页读取真实数据', () => {
  Store.addMock({ writing: 12, translation: 11, listening: 20, reading: 24 });
  const e = Mock.estimate({ writing: 12, translation: 11, listening: 20, reading: 24 });
  globalThis.location.hash = '#/stats'; App.render();
  if (rendered().indexOf('模考') < 0) throw new Error('统计页缺少模考记录');
  return '估算总分 ' + e.total + '（写作 ' + e.writing + ' / 听力 ' + e.listening + ' / 阅读 ' + e.reading + ' / 翻译 ' + e.translation + '）';
});
check('同步码往返', () => {
  const code = Store.makeSyncCode();
  const before = Store.get().done;
  const n = Object.keys(before).length;
  Store.reset();
  if (Object.keys(Store.get().done).length !== 0) throw new Error('清空失败');
  Store.applySyncCode(code, 'over');
  const after = Object.keys(Store.get().done).length;
  if (after !== n) throw new Error('恢复 ' + after + ' 项，应为 ' + n);
  return '同步码 ' + code.length + ' 字符，恢复 ' + after + ' 项进度';
});
check('损坏同步码不会崩溃', () => {
  try { Store.applySyncCode('CET4-FFFF-abcd', 'over'); } catch (e) { return '正确报错：' + e.message; }
  throw new Error('应当报错');
});
check('导出 / 导入 JSON', () => {
  const json = Store.exportJSON();
  if (json.length < 100) throw new Error('导出过短');
  Store.reset();
  Store.importJSON(json);
  return '导出 ' + Math.round(json.length / 1024) + 'KB 并成功导入';
});

console.log(fails ? '\n❌ 自检失败 ' + fails + ' 项' : '\n✅ 全部自检通过');
process.exit(fails ? 1 : 0);
