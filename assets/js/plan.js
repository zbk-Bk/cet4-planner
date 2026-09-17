/* 备考计划引擎：按考试日期与每日时长自动生成每天的学习任务与内容 */
window.Plan = (function () {
  var CACHE = null;

  function totalWordsPerDay(minutes) {
    if (minutes <= 45) return 10;
    if (minutes <= 75) return 12;
    if (minutes <= 105) return 15;
    if (minutes <= 150) return 20;
    return 25;
  }

  function stageOf(day, total) {
    var a = Math.ceil(total * 0.25), b = Math.ceil(total * 0.55), c = Math.ceil(total * 0.85);
    if (day <= a) return { id: 1, name: '基础期', color: '#4f7cff', desc: '建立词汇与听力基础，熟悉每种题型' };
    if (day <= b) return { id: 2, name: '强化期', color: '#7b5cff', desc: '分题型专项突破，开始限时训练' };
    if (day <= c) return { id: 3, name: '提升期', color: '#c2579b', desc: '整套限时训练，集中消灭薄弱项' };
    return { id: 4, name: '冲刺期', color: '#e0562f', desc: '全真模考与查漏补缺，保持状态' };
  }

  /* 取某天的新词（按词库顺序分组） */
  function newWordsFor(day, perDay) {
    var all = Libs.allVocab();
    var group = day - 1;
    var start = group * perDay;
    if (start >= all.length) return [];
    return all.slice(start, start + perDay);
  }

  /* 间隔重复复习词：复习第 1、2、4、7、15 天前的词 */
  function reviewWordsFor(day, perDay) {
    var offsets = [1, 2, 4, 7, 15];
    var out = [], seen = {};
    offsets.forEach(function (o) {
      var d = day - o;
      if (d < 1) return;
      newWordsFor(d, perDay).forEach(function (w) {
        if (!seen[w.w]) { seen[w.w] = 1; out.push(w); }
      });
    });
    return U.shuffle(out, day * 71).slice(0, perDay);
  }

  function scale(tasks, minutes) {
    var base = tasks.reduce(function (s, t) { return s + t.min; }, 0);
    if (!base) return tasks;
    var factor = minutes / base;
    tasks.forEach(function (t) {
      t.min = Math.max(5, Math.round(t.min * factor / 5) * 5);
    });
    return tasks;
  }

  function T(module, key, title, desc, min, data) {
    return { module: module, key: key, title: title, desc: desc, min: min, data: data || {} };
  }

  function vocabTask(day, perDay, mode) {
    if (mode === 'review') {
      var rw = reviewWordsFor(day, perDay);
      if (!rw.length) return T('vocab', 'vocab-new', '词汇：新词 ' + perDay + ' 个', '从词库学习中高频词汇，跟读发音并造句。', 30, { words: newWordsFor(day, perDay), type: 'new' });
      return T('vocab', 'vocab-review', '词汇：复习 ' + rw.length + ' 个旧词', '按遗忘曲线复习第 1/2/4/7/15 天前的词，遮挡自测。', 20, { words: rw, type: 'review' });
    }
    var list = newWordsFor(day, perDay);
    if (list.length) {
      return T('vocab', 'vocab-new', '词汇：新词 ' + list.length + ' 个', '听发音 → 看释义 → 看例句 → 遮挡自测，标出没记住的词。', 35, { words: list, type: 'new' });
    }
    var ph = U.shuffle(Libs.phrases, day).slice(0, 10);
    return T('vocab', 'vocab-phrase', '词汇：高频短语 10 组', '核心词已学完，进入短语与搭配阶段，重点记“动词+介词”整体。', 30, { phrases: ph, type: 'phrase' });
  }

  function listeningTask(day, kind, minutes) {
    var pool = Libs.listening.filter(function (x) { return !kind || x.type === kind; });
    if (!pool.length) pool = Libs.listening;
    var item = Libs.pick(pool, day);
    var label = { news: '短篇新闻', conversation: '长对话', passage: '听力篇章' }[item.type] || '听力';
    return T('listening', 'listen-' + item.id, '听力：' + label + '精听', '先做题，再逐句精听 + 听写，最后核对原文找出漏听点。', minutes, { id: item.id });
  }

  function readingTask(day, kinds, minutes) {
    var pool = Libs.reading.filter(function (x) { return kinds.indexOf(x.kind) >= 0; });
    if (!pool.length) pool = Libs.reading;
    var item = Libs.pick(pool, day);
    var label = { careful: '仔细阅读', matching: '长篇阅读匹配', cloze: '选词填空' }[item.kind];
    return T('reading', 'read-' + item.id, '阅读：' + label, '限时完成并逐题写出定位句，分析干扰项。', minutes, { id: item.id });
  }

  function writingTask(day, minutes, full) {
    var item = Libs.pick(Libs.writing, day);
    return T('writing', 'write-' + item.id, '写作：' + (full ? '整篇限时' : '结构与句子') + '（' + item.type + '）',
      full ? '按 30 分钟计时完成整篇作文，之后对照评分标准自评。' : '审题列提纲 → 背 3 个句型 → 写首段与末段。',
      minutes, { id: item.id, full: !!full });
  }

  function translationTask(day, minutes) {
    var item = Libs.pick(Libs.translation, day);
    return T('translation', 'trans-' + item.id, '翻译：' + item.topic, '先自己翻译（限时 15 分钟），再对照参考译文，标出错点。', minutes, { id: item.id });
  }

  function grammarTask(day, minutes) {
    var item = Libs.pick(Libs.grammar, day);
    return T('grammar', 'gram-' + item.id, '语法：' + item.title, item.cat + ' · 看懂讲解后造 3 个自己的句子。', minutes, { id: item.id });
  }

  function skillTask(day, module, minutes) {
    var pool = Libs.skills.filter(function (x) { return x.module === module; });
    var item = Libs.pick(pool, day);
    return T('skill', 'skill-' + item.id, '技巧：' + item.title, '先读技巧，再在今天的练习里用一次。', minutes, { id: item.id });
  }

  function reviewTask(day, minutes, weak) {
    return T('review', 'review-' + day, weak ? '错题复盘与薄弱项突破' : '今日复盘',
      weak ? '整理今天做错的题：写出定位句、错因、下次的对策。' : '用 5 分钟写下今天记住的 3 个新词和 1 个句型。', minutes, {});
  }

  function mockTask(day, part, minutes) {
    return T('mock', 'mock-' + part + '-' + day, part === 'full' ? '全真模考（整套 130 分钟）' : '半套模考（听力 + 阅读）',
      '严格按考试时间完成，中途不查词、不看答案，做完后录入分数。', minutes, { part: part });
  }

  function tasksFor(day, stage, perDay, isSun, isSat) {
    var wd = U.parseISO(Store.dayISO(day)).getDay(); // 0 周日
    var list = [];
    var target = Store.get().dailyMinutes;

    if (stage.id === 4) {
      list.push(vocabTask(day, perDay, 'review'));
      list.push(mockTask(day, isSun || isSat ? 'full' : 'half', isSun ? 130 : 90));
      list.push(T('review', 'mock-review-' + day, '模考复盘', '逐项分析失分原因，把错题写进错题本，重听最差的一段听力。', 40, {}));
      if (!isSun) list.push(skillTask(day, 'exam', 15));
      return scale(list, Math.max(Store.get().dailyMinutes, isSun ? 180 : 120));
    }

    list.push(vocabTask(day, perDay, wd === 0 || wd === 6 ? 'review' : 'new'));

    switch (wd) {
      case 1: // 周一
        list.push(listeningTask(day, 'news', 35));
        list.push(readingTask(day, ['careful'], 35));
        break;
      case 2: // 周二
        list.push(grammarTask(day, 30));
        list.push(writingTask(day, 35, stage.id >= 2));
        break;
      case 3: // 周三
        list.push(listeningTask(day, 'conversation', 35));
        list.push(readingTask(day, stage.id >= 2 ? ['matching'] : ['matching', 'careful'], 35));
        break;
      case 4: // 周四
        list.push(translationTask(day, 40));
        list.push(readingTask(day, ['cloze'], 25));
        break;
      case 5: // 周五
        list.push(listeningTask(day, 'passage', 35));
        list.push(writingTask(day, 40, true));
        break;
      case 6: // 周六
        list.push(skillTask(day, stage.id >= 2 ? 'reading' : 'listening', 25));
        list.push(reviewTask(day, 40, true));
        list.push(readingTask(day, ['careful'], 35));
        break;
      default: // 周日
        list.push(mockTask(day, stage.id >= 3 ? 'full' : 'half', stage.id >= 3 ? 130 : 60));
        list.push(T('review', 'week-review-' + day, '本周复盘与下周计划', '统计完成率，找出最弱题型，调整下周重点。', 35, {}));
        break;
    }

    list.push(reviewTask(day, 15, false));
    if (wd === 0 && stage.id >= 3) target = Math.max(target, 170);
    return scale(trim(list, target), target);
  }

  /* 学习时间较少时自动精简任务：优先保留词汇、当天主任务与复盘 */
  function trim(list, target) {
    var coreKeys = { listening: 1, reading: 1, writing: 1, translation: 1, grammar: 1, skill: 1, mock: 1 };
    var maxCore = target <= 60 ? 1 : (target <= 90 ? 2 : 99);
    var kept = [], core = 0;
    list.forEach(function (t) {
      if (coreKeys[t.module]) {
        if (core < maxCore) { core++; kept.push(t); }
      } else kept.push(t);
    });
    return kept;
  }

  function build(force) {
    if (CACHE && !force) return CACHE;
    var st = Store.get();
    var total = Store.totalDays();
    var perDay = totalWordsPerDay(st.dailyMinutes);
    var days = [];
    for (var d = 1; d <= total; d++) {
      var iso = Store.dayISO(d);
      var date = U.parseISO(iso);
      var stage = stageOf(d, total);
      var wd = date.getDay();
      var tasks = tasksFor(d, stage, perDay, wd === 0, wd === 6);
      tasks.forEach(function (t, i) { t.idx = i; t.day = d; });
      var rec = st.done[d + '-0'] ? '已开始' : '未开始';
      days.push({
        i: d, iso: iso, date: date, wd: wd, wdName: U.weekday(date), stage: stage,
        tasks: tasks, minutes: tasks.reduce(function (s, t) { return s + t.min; }, 0),
        title: tasks.map(function (t) { return t.module; }).filter(function (m, i, a) { return a.indexOf(m) === i; })
          .map(function (m) { return ({ vocab: '词汇', listening: '听力', reading: '阅读', writing: '写作', translation: '翻译', grammar: '语法', skill: '技巧', review: '复盘', mock: '模考' })[m]; }).join(' + '),
        paper: rec
      });
    }
    var tasksTotal = days.reduce(function (s, d) { return s + d.tasks.length; }, 0);
    st._taskTotal = tasksTotal;
    CACHE = {
      days: days, total: total, perDay: perDay,
      stageCount: [1, 2, 3, 4].map(function (id) {
        return { id: id, name: stageOf(days[0].i, total).name, count: days.filter(function (d) { return d.stage.id === id; }).length,
          color: stageOf(1, 1).color, desc: stageOf(1, 1).desc };
      })
    };
    CACHE.stageCount.forEach(function (s) {
      var sample = days.filter(function (d) { return d.stage.id === s.id; })[0] || days[0];
      s.name = sample.stage.name; s.color = sample.stage.color; s.desc = sample.stage.desc;
    });
    CACHE.taskTotal = tasksTotal;
    CACHE.today = Store.todayIndex();
    return CACHE;
  }

  function reset() { CACHE = null; }

  function day(idx) {
    var p = build();
    return p.days[Math.max(0, Math.min(p.total - 1, idx - 1))];
  }

  function stats() {
    var p = build();
    var st = Store.get();
    var doneTasks = 0, doneDays = 0;
    p.days.forEach(function (d) {
      var c = 0;
      d.tasks.forEach(function (t) { if (st.done[d.i + '-' + t.idx]) c++; });
      doneTasks += c;
      if (c === d.tasks.length) doneDays++;
    });
    var stageStats = [1, 2, 3, 4].map(function (id) {
      var ds = p.days.filter(function (d) { return d.stage.id === id; });
      var totalTasks = 0, done = 0;
      ds.forEach(function (d) {
        totalTasks += d.tasks.length;
        d.tasks.forEach(function (t) { if (st.done[d.i + '-' + t.idx]) done++; });
      });
      return { stage: ds[0] ? ds[0].stage : stageOf(1, 1), days: ds.length, done: done, total: totalTasks };
    });
    return { doneTasks: doneTasks, taskTotal: p.taskTotal, doneDays: doneDays, total: p.total,
      rate: p.taskTotal ? Math.round(100 * doneTasks / p.taskTotal) : 0, stageStats: stageStats };
  }

  return { build: build, day: day, reset: reset, stats: stats, newWordsFor: newWordsFor,
    reviewWordsFor: reviewWordsFor, totalWordsPerDay: totalWordsPerDay };
})();
