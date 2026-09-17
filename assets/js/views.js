/* 页面框架：路由、今日任务、60 天计划、每日详情 */
window.App = (function () {
  var view = document.getElementById('view');

  var NAV = [
    { id: 'today', label: '今日任务', icon: '◎', mobile: true },
    { id: 'plan', label: '备考计划', icon: '▤', mobile: true },
    { id: 'practice', label: '专项练习', icon: '✎', mobile: true },
    { id: 'vocab', label: '词汇库', icon: 'A', mobile: true },
    { id: 'stats', label: '学习统计', icon: '◔', mobile: true },
    { id: 'mock', label: '模考中心', icon: '⏱' },
    { id: 'settings', label: '设置与同步', icon: '⚙' }
  ];

  function go(hash) {
    if (location.hash === '#/' + hash) render();
    else location.hash = '#/' + hash;
  }

  function render() {
    var route = (location.hash || '').replace(/^#\/?/, '') || 'today';
    var parts = route.split('/');
    var name = parts[0], arg = parts[1], arg2 = parts[2];
    U.stopSpeak();
    U.stopTimer();
    var fresh = document.createElement('main');
    fresh.id = 'view';
    fresh.className = 'view';
    view.parentNode.replaceChild(fresh, view);
    view = fresh;
    renderNav(name);
    try {
      switch (name) {
        case 'plan': view.innerHTML = planPage(); bindPlan(); break;
        case 'day': view.innerHTML = dayPage(+arg); bindDay(); break;
        case 'task': view.innerHTML = taskPage(+arg, +arg2); bindTask(+arg, +arg2); break;
        case 'vocab': view.innerHTML = Practice.vocabLib(); Practice.bindVocabLib(); break;
        case 'practice': view.innerHTML = practicePage(); break;
        case 'listen': view.innerHTML = Practice.listenDetail(Libs.byId(Libs.listening, arg)); Practice.bindListen(); break;
        case 'read': view.innerHTML = Practice.readDetail(Libs.byId(Libs.reading, arg)); Practice.bindRead(); break;
        case 'write': view.innerHTML = Practice.writeDetail(Libs.byId(Libs.writing, arg)); Practice.bindWrite(); break;
        case 'trans': view.innerHTML = Practice.transDetail(Libs.byId(Libs.translation, arg)); Practice.bindTrans(); break;
        case 'gram': view.innerHTML = Practice.gramDetail(Libs.byId(Libs.grammar, arg)); break;
        case 'skill': view.innerHTML = Practice.skillDetail(Libs.byId(Libs.skills, arg)); break;
        case 'mock': view.innerHTML = Mock.page(); Mock.bind(); break;
        case 'stats': view.innerHTML = statsPage(); bindStats(); break;
        case 'settings': view.innerHTML = settingsPage(); bindSettings(); break;
        default: view.innerHTML = todayPage(); bindToday();
      }
    } catch (e) {
      console.error(e);
      view.innerHTML = '<div class="card"><h3>页面出错了</h3><p class="muted">' + U.esc(e.message) + '</p>' +
        '<button class="btn" onclick="location.hash=\'#/today\'">回到今日任务</button></div>';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderNav(name) {
    var extra = { day: 'plan', task: 'plan', listen: 'practice', read: 'practice', write: 'practice',
      trans: 'practice', gram: 'practice', skill: 'practice' }[name] || name;
    U.qsa('#sidebar a, #tabbar a').forEach(function (a) {
      var id = a.getAttribute('data-nav');
      a.classList.toggle('active', id === extra || (id === 'today' && name === ''));
    });
    document.body.classList.toggle('nav-open', false);
  }

  /* ---------------- 组件 ---------------- */
  function ring(pct, size, label, sub) {
    var r = (size - 10) / 2, c = 2 * Math.PI * r;
    var off = c * (1 - pct / 100);
    return '<div class="ring" style="width:' + size + 'px;height:' + size + 'px">' +
      '<svg width="' + size + '" height="' + size + '"><circle cx="' + size / 2 + '" cy="' + size / 2 +
      '" r="' + r + '" fill="none" stroke="var(--ring-bg)" stroke-width="8"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--accent)" stroke-width="8" ' +
      'stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
      '</svg><div class="ring-label"><b>' + label + '</b>' + (sub ? '<span>' + sub + '</span>' : '') + '</div></div>';
  }

  function moduleChip(m) {
    var map = { vocab: ['词汇', 'm-vocab'], listening: ['听力', 'm-listen'], reading: ['阅读', 'm-read'],
      writing: ['写作', 'm-write'], translation: ['翻译', 'm-trans'], grammar: ['语法', 'm-gram'],
      skill: ['技巧', 'm-skill'], review: ['复盘', 'm-review'], mock: ['模考', 'm-mock'] };
    var v = map[m] || [m, ''];
    return '<span class="chip ' + v[1] + '">' + v[0] + '</span>';
  }

  function taskRow(day, task, opts) {
    var done = Store.isDone(day, task.idx);
    opts = opts || {};
    return '<div class="task' + (done ? ' done' : '') + '">' +
      '<button class="check" data-check="' + day + '" data-idx="' + task.idx + '" aria-label="勾选任务">' + (done ? '✓' : '') + '</button>' +
      '<div class="task-main" data-open="' + day + '/' + task.idx + '">' +
        '<div class="task-head">' + moduleChip(task.module) + '<b>' + U.esc(task.title) + '</b></div>' +
        '<p class="muted small">' + U.esc(task.desc) + '</p>' +
      '</div>' +
      '<div class="task-side"><span class="min">' + task.min + '′</span>' +
        (opts.hideOpen ? '' : '<button class="btn tiny ghost" data-open="' + day + '/' + task.idx + '">开始</button>') + '</div>' +
      '</div>';
  }

  function bindTaskRows(root) {
    U.on(root || view, 'click', '[data-check]', function (e, el) {
      var day = +el.getAttribute('data-check'), idx = +el.getAttribute('data-idx');
      var t = Plan.day(day).tasks[idx];
      Store.toggleTask(day, idx, t ? t.min : 0);
      el.classList.toggle('done');
      render();
    });
    U.on(root || view, 'click', '[data-open]', function (e, el) {
      go('task/' + el.getAttribute('data-open'));
    });
  }

  /* ---------------- 今日任务 ---------------- */
  function todayPage() {
    var st = Store.get(), p = Plan.build(), idx = Store.todayIndex();
    var d = Plan.day(idx);
    var s = Plan.stats();
    var left = Math.max(0, U.diffDays(new Date(), U.parseISO(st.examDate)));
    var doneTasks = d.tasks.filter(function (t) { return Store.isDone(idx, t.idx); }).length;
    var pct = Math.round(100 * doneTasks / d.tasks.length);
    var words = Libs.allVocab();
    var group = Math.min(Math.ceil(words.length / p.perDay), 30);

    var html = '<section class="hero">' +
      '<div class="hero-left">' +
        '<div class="hero-tag">' + U.fmtCN(st.planStart) + ' 开始 · 共 ' + p.total + ' 天</div>' +
        '<h1>距离四级考试还有 <em>' + left + '</em> 天</h1>' +
        '<p class="muted">今天是计划第 <b>' + idx + '</b> 天 · ' + d.stage.name + ' · ' + d.wdName + '</p>' +
        '<p class="stage-desc">' + U.esc(d.stage.desc) + '</p>' +
        '<div class="hero-actions">' +
          '<button class="btn primary" data-open-first>开始今天的任务</button>' +
          '<button class="btn ghost" data-go="mock">先做一次模考</button>' +
        '</div>' +
      '</div>' +
      '<div class="hero-right">' + ring(pct, 132, pct + '%', '今日完成') +
        '<div class="mini-stats">' +
          '<div><b>' + Store.streak() + '</b><span>连续打卡</span></div>' +
          '<div><b>' + s.doneDays + '</b><span>完整完成天数</span></div>' +
          '<div><b>' + Store.masteredWords() + '</b><span>已掌握词汇</span></div>' +
          '<div><b>' + Math.round(d.minutes) + '</b><span>今日计划分钟</span></div>' +
        '</div>' +
      '</div>' +
    '</section>';

    html += '<section class="card">' +
      '<div class="card-head"><h2>今日任务清单</h2><span class="muted small">勾选后自动保存 · 换设备可用同步码恢复</span></div>' +
      '<div class="tasks">' + d.tasks.map(function (t) { return taskRow(idx, t); }).join('') + '</div>' +
      '<div class="card-foot"><button class="btn ghost small" data-done-all>标记今天全部完成</button>' +
      '<span class="muted small">预计用时约 ' + Math.round(d.minutes) + ' 分钟</span></div>' +
    '</section>';

    /* 词汇速览 */
    var todayWords = (d.tasks.filter(function (t) { return t.module === 'vocab'; })[0] || { data: {} }).data.words || [];
    html += '<section class="card">' +
      '<div class="card-head"><h2>今日词汇速览</h2><span class="muted small">点击喇叭听发音（需要浏览器支持朗读）</span></div>' +
      (todayWords.length ? '<div class="word-grid">' + todayWords.map(function (w) {
        return '<div class="word-card"><div class="w-top"><b>' + U.esc(w.w) + '</b><button class="icon-btn" data-say="' + U.esc(w.en || w.w) + '">🔊</button></div>' +
          '<span class="pos">' + U.esc(w.pos) + '</span><p>' + U.esc(w.zh) + '</p>' +
          '<p class="ex">' + U.esc(w.en || '') + '</p></div>';
      }).join('') + '</div>' : '<p class="muted">今天没有新词任务，去<a href="#/vocab">词汇库</a>复习错词吧。</p>') +
      '<div class="card-foot"><button class="btn ghost small" data-go="vocab">进入词汇库训练</button></div>' +
    '</section>';

    /* 学习笔记 */
    html += '<section class="card">' +
      '<div class="card-head"><h2>今日笔记与疑问</h2><span class="muted small">自动保存</span></div>' +
      '<textarea class="textarea" data-note="' + idx + '" rows="4" placeholder="例如：今天错的题是态度的题，总是被 only 干扰；明天重点复习第 ' + (idx + 1) + ' 天的新词。">' +
      U.esc(st.notes[idx] || '') + '</textarea></section>';

    return html;
  }

  function bindToday() {
    bindTaskRows();
    U.on(view, 'click', '[data-go]', function (e, el) { go(el.getAttribute('data-go')); });
    U.on(view, 'click', '[data-open-first]', function () {
      var idx = Store.todayIndex(), d = Plan.day(idx);
      var next = d.tasks.filter(function (t) { return !Store.isDone(idx, t.idx); })[0] || d.tasks[0];
      go('task/' + idx + '/' + next.idx);
    });
    U.on(view, 'click', '[data-say]', function (e, el) {
      U.speak(el.getAttribute('data-say'), { rate: Store.get().settings.ttsRate });
    });
    U.on(view, 'click', '[data-done-all]', function () {
      var idx = Store.todayIndex(), d = Plan.day(idx);
      d.tasks.forEach(function (t) { Store.setTask(idx, t.idx, true, 0); });
      U.toast('今天全部标记为完成，坚持就是胜利');
      render();
    });
    U.on(view, 'input', '[data-note]', function (e, el) {
      Store.setNote(el.getAttribute('data-note'), el.value);
    });
  }

  /* ---------------- 计划页 ---------------- */
  function planPage() {
    var p = Plan.build(), st = Store.get(), s = Plan.stats();
    var today = Store.todayIndex();
    var html = '<section class="card">' +
      '<div class="card-head"><h2>整体备考路线</h2><span class="muted small">每天任务自动生成，勾选即保存</span></div>' +
      '<div class="stage-grid">' + p.stageCount.map(function (c) {
        var ss = s.stageStats.filter(function (x) { return x.stage.id === c.id; })[0] || { done: 0, total: 1 };
        var pct = ss.total ? Math.round(100 * ss.done / ss.total) : 0;
        return '<div class="stage-card" style="--c:' + c.color + '">' +
          '<div class="stage-name">' + c.name + '<span>' + c.count + ' 天</span></div>' +
          '<p class="small muted">' + U.esc(c.desc) + '</p>' +
          '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
          '<span class="small">已完成 ' + pct + '%</span></div>';
      }).join('') + '</div>' +
      '<div class="plan-meta">' +
        '<span>开始日期：' + st.planStart + '</span><span>考试日期：' + st.examDate + '</span>' +
        '<span>每日时长：' + st.dailyMinutes + ' 分钟</span>' +
        '<button class="btn tiny ghost" data-go="settings">调整</button>' +
      '</div>' +
    '</section>';

    html += '<section class="card">' +
      '<div class="card-head"><h2>' + p.total + ' 天日历</h2>' +
        '<div class="seg" data-seg="planView"><button class="active" data-v="grid">日历</button><button data-v="list">列表</button></div>' +
      '</div><div id="planBody">' + planGrid(p) + '</div></section>';
    return html;
  }

  function planGrid(p) {
    var cells = [];
    var first = p.days[0].date.getDay();
    for (var i = 0; i < first; i++) cells.push('<div class="cell empty"></div>');
    p.days.forEach(function (d) {
      var st = Store.get();
      var done = d.tasks.filter(function (t) { return st.done[d.i + '-' + t.idx]; }).length;
      var cls = done === d.tasks.length ? 'full' : (done ? 'part' : '');
      if (d.i === Store.todayIndex()) cls += ' today';
      cells.push('<button class="cell ' + cls + '" style="--c:' + d.stage.color + '" data-day="' + d.i + '">' +
        '<span class="d">' + d.date.getDate() + '</span>' +
        '<span class="m">' + (done === d.tasks.length ? '✓' : (done ? done + '/' + d.tasks.length : '')) + '</span>' +
        '<i class="dot"></i></button>');
    });
    return '<div class="week-head">' + ['日', '一', '二', '三', '四', '五', '六'].map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
      '<div class="calendar">' + cells.join('') + '</div>' +
      '<div class="legend"><span><i style="background:#4f7cff"></i>基础期</span><span><i style="background:#7b5cff"></i>强化期</span>' +
      '<span><i style="background:#c2579b"></i>提升期</span><span><i style="background:#e0562f"></i>冲刺期</span></div>';
  }

  function planList(p) {
    return '<div class="plan-list">' + p.days.map(function (d) {
      var st = Store.get();
      var done = d.tasks.filter(function (t) { return st.done[d.i + '-' + t.idx]; }).length;
      return '<button class="plan-item" data-day="' + d.i + '" style="--c:' + d.stage.color + '">' +
        '<span class="pi-day">D' + d.i + '</span>' +
        '<span class="pi-main"><b>' + U.fmtCN(d.iso) + ' ' + d.wdName + '</b>' +
        '<span class="muted small">' + U.esc(d.title) + ' · ' + d.tasks.length + ' 项 · ' + Math.round(d.minutes) + ' 分钟</span></span>' +
        '<span class="pi-state">' + (done === d.tasks.length ? '已完成' : done ? done + '/' + d.tasks.length : d.stage.name) + '</span></button>';
    }).join('') + '</div>';
  }

  function bindPlan() {
    U.on(view, 'click', '[data-day]', function (e, el) { go('day/' + el.getAttribute('data-day')); });
    U.on(view, 'click', '[data-go]', function (e, el) { go(el.getAttribute('data-go')); });
    U.on(view, 'click', '[data-seg="planView"] button', function (e, el) {
      U.qsa('[data-seg="planView"] button').forEach(function (b) { b.classList.toggle('active', b === el); });
      var p = Plan.build();
      U.qs('#planBody').innerHTML = el.getAttribute('data-v') === 'grid' ? planGrid(p) : planList(p);
    });
  }

  /* ---------------- 某天详情 ---------------- */
  function dayPage(n) {
    var p = Plan.build();
    if (!n || n < 1 || n > p.total) n = Store.todayIndex();
    var d = Plan.day(n);
    var done = d.tasks.filter(function (t) { return Store.isDone(n, t.idx); }).length;
    var pct = Math.round(100 * done / d.tasks.length);
    var html = '<div class="page-head">' +
      '<button class="btn ghost small" data-back>← 返回计划</button>' +
      '<div class="ph-title"><h1>第 ' + n + ' 天 · ' + U.fmtCN(d.iso) + ' ' + d.wdName + '</h1>' +
      '<span class="stage-pill" style="--c:' + d.stage.color + '">' + d.stage.name + '</span></div>' +
      '<p class="muted">' + U.esc(d.stage.desc) + ' · 共 ' + d.tasks.length + ' 项任务 · 约 ' + Math.round(d.minutes) + ' 分钟</p>' +
    '</div>';

    html += '<section class="card">' +
      '<div class="card-head"><h2>今日安排</h2>' +
      '<div class="row gap center"><span class="muted small">完成 ' + done + '/' + d.tasks.length + '</span>' +
      '<div class="bar thin" style="width:120px"><i style="width:' + pct + '%"></i></div></div></div>' +
      '<div class="tasks">' + d.tasks.map(function (t) { return taskRow(n, t); }).join('') + '</div>' +
      '<div class="card-foot"><button class="btn ghost small" data-done-all-day="' + n + '">全部标记完成</button>' +
      '<div class="row gap"><button class="btn tiny ghost" data-prev="' + (n - 1) + '"' + (n <= 1 ? ' disabled' : '') + '>前一天</button>' +
      '<button class="btn tiny ghost" data-next="' + (n + 1) + '"' + (n >= p.total ? ' disabled' : '') + '>后一天</button></div></div>' +
    '</section>';

    html += '<section class="card"><div class="card-head"><h2>当天笔记</h2></div>' +
      '<textarea class="textarea" rows="4" data-note="' + n + '" placeholder="记录今天的错题、难点和感受">' + U.esc(Store.get().notes[n] || '') + '</textarea></section>';
    return html;
  }

  function bindDay() {
    bindTaskRows();
    U.on(view, 'click', '[data-back]', function () { go('plan'); });
    U.on(view, 'click', '[data-prev]', function (e, el) { var v = +el.getAttribute('data-prev'); if (v >= 1) go('day/' + v); });
    U.on(view, 'click', '[data-next]', function (e, el) { if (!el.disabled) go('day/' + el.getAttribute('data-next')); });
    U.on(view, 'click', '[data-done-all-day]', function (e, el) {
      var n = +el.getAttribute('data-done-all-day');
      Plan.day(n).tasks.forEach(function (t) { Store.setTask(n, t.idx, true, 0); });
      render();
    });
    U.on(view, 'input', '[data-note]', function (e, el) { Store.setNote(el.getAttribute('data-note'), el.value); });
  }

  /* ---------------- 任务详情 ---------------- */
  function taskPage(day, idx) {
    var d = Plan.day(day);
    var t = d.tasks[idx];
    if (!t) return '<div class="card"><p>任务不存在</p></div>';
    var body = Practice.task(t, day);
    return '<div class="page-head">' +
      '<button class="btn ghost small" data-back="' + day + '">← 返回第 ' + day + ' 天</button>' +
      '<div class="ph-title">' + moduleChip(t.module) + '<h1>' + U.esc(t.title) + '</h1></div>' +
      '<p class="muted">' + U.esc(t.desc) + ' · 建议 ' + t.min + ' 分钟</p>' +
      '<label class="row gap center complete-toggle"><input type="checkbox" data-check2="' + day + '" data-idx="' + idx + '"' +
        (Store.isDone(day, idx) ? ' checked' : '') + '> 完成这项任务</label>' +
    '</div>' + body;
  }

  function bindTask(day, idx) {
    U.on(view, 'click', '[data-back]', function (e, el) { go('day/' + el.getAttribute('data-back')); });
    U.on(view, 'change', '[data-check2]', function (e, el) {
      var d = +el.getAttribute('data-check2'), i = +el.getAttribute('data-idx');
      Store.setTask(d, i, el.checked, Plan.day(d).tasks[i].min);
      U.toast(el.checked ? '已完成，记得明天复习' : '已取消完成');
    });
    Practice.bind(day, idx);
  }

  /* ---------------- 专项练习入口 ---------------- */
  function practicePage() {
    var s = Libs.stats();
    var blocks = [
      { module: 'listening', title: '听力训练', desc: '短篇新闻 / 长对话 / 听力篇章，支持网页朗读、逐句精听与听写', count: s.listening, go: 'listen/' + Libs.listening[0].id },
      { module: 'reading', title: '阅读训练', desc: '仔细阅读 / 长篇匹配 / 选词填空，限时 + 定位句解析', count: s.reading, go: 'read/' + Libs.reading[0].id },
      { module: 'writing', title: '写作训练', desc: '议论文 / 图表 / 书信 / 通知，含万能模板与范文', count: s.writing, go: 'write/' + Libs.writing[0].id },
      { module: 'translation', title: '翻译训练', desc: '中国文化与生活话题段落，含参考译文与难点解析', count: s.translation, go: 'trans/' + Libs.translation[0].id },
      { module: 'grammar', title: '语法与长难句', desc: '18 个高频语法点，含易错提醒与例句', count: s.grammar, go: 'gram/' + Libs.grammar[0].id },
      { module: 'skill', title: '题型技巧', desc: '听力、阅读、写作、翻译、词汇、考场策略', count: s.skills, go: 'skill/' + Libs.skills[0].id }
    ];
    var html = '<div class="page-head"><h1>专项练习</h1><p class="muted">所有材料都按四级真题题型编写，可直接在这里练</p></div>';
    html += '<div class="grid-3">' + blocks.map(function (b) {
      return '<button class="tile" data-go="' + b.go + '">' +
        moduleChip(b.module) + '<b>' + b.title + '</b><p class="muted small">' + b.desc + '</p>' +
        '<span class="count">' + b.count + ' 组材料</span></button>';
    }).join('') + '</div>';
    html += '<section class="card"><div class="card-head"><h2>按题型清单</h2><span class="muted small">点击进入对应训练</span></div>' +
      '<h3 class="sub">听力 ' + Libs.listening.length + ' 组</h3><div class="chips">' +
        Libs.listening.map(function (x) { return '<button class="pill" data-go="listen/' + x.id + '">' + x.id + ' ' + U.esc(x.title) + '</button>'; }).join('') + '</div>' +
      '<h3 class="sub">阅读 ' + Libs.reading.length + ' 组</h3><div class="chips">' +
        Libs.reading.map(function (x) { return '<button class="pill" data-go="read/' + x.id + '">' + x.id + ' ' + U.esc(x.title) + '</button>'; }).join('') + '</div>' +
      '<h3 class="sub">写作 ' + Libs.writing.length + ' 题</h3><div class="chips">' +
        Libs.writing.map(function (x) { return '<button class="pill" data-go="write/' + x.id + '">' + x.id + ' ' + U.esc(x.title) + '</button>'; }).join('') + '</div>' +
      '<h3 class="sub">翻译 ' + Libs.translation.length + ' 题</h3><div class="chips">' +
        Libs.translation.map(function (x) { return '<button class="pill" data-go="trans/' + x.id + '">' + x.id + ' ' + U.esc(x.topic) + '</button>'; }).join('') + '</div>' +
      '<h3 class="sub">语法 ' + Libs.grammar.length + ' 点</h3><div class="chips">' +
        Libs.grammar.map(function (x) { return '<button class="pill" data-go="gram/' + x.id + '">' + U.esc(x.title) + '</button>'; }).join('') + '</div>' +
      '<h3 class="sub">技巧 ' + Libs.skills.length + ' 篇</h3><div class="chips">' +
        Libs.skills.map(function (x) { return '<button class="pill" data-go="skill/' + x.id + '">' + U.esc(x.title) + '</button>'; }).join('') + '</div>' +
    '</section>';
    return html;
  }

  /* ---------------- 统计 ---------------- */
  function statsPage() {
    var s = Plan.stats(), st = Store.get();
    var totalMin = 0;
    Object.keys(st.hours).forEach(function (k) { totalMin += st.hours[k]; });
    var logs = st.logs;
    var days = [], today = new Date();
    for (var i = 13; i >= 0; i--) {
      var iso = U.toISO(U.addDays(today, -i));
      days.push({ iso: iso, min: st.hours[iso] || 0, tasks: countTasksOn(iso) });
    }
    var maxMin = Math.max(30, days.reduce(function (m, d) { return Math.max(m, d.min); }, 0));

    var html = '<div class="page-head"><h1>学习统计</h1><p class="muted">数据自动保存在本机浏览器中，可通过同步码或云同步在设备间共享</p></div>';
    html += '<div class="grid-4">' +
      statCard('总完成率', s.rate + '%', s.doneTasks + ' / ' + s.taskTotal + ' 项任务') +
      statCard('累计时长', (totalMin / 60).toFixed(1) + ' h', '约 ' + Math.round(totalMin / Math.max(1, s.doneDays)) + ' 分钟/天') +
      statCard('连续打卡', Store.streak() + ' 天', '完整完成 ' + s.doneDays + ' 天') +
      statCard('掌握词汇', Store.masteredWords() + ' 个', '词库共 ' + Libs.allVocab().length + ' 词') +
    '</div>';

    html += '<section class="card"><div class="card-head"><h2>最近 14 天学习时长</h2><span class="muted small">单位：分钟</span></div>' +
      '<div class="chart">' + days.map(function (d) {
        var h = Math.round(100 * d.min / maxMin);
        return '<div class="col" title="' + d.iso + ' ' + d.min + ' 分钟"><div class="col-bar" style="height:' + h + '%"></div>' +
          '<span>' + d.iso.slice(8) + '</span></div>';
      }).join('') + '</div></section>';

    html += '<section class="card"><div class="card-head"><h2>各阶段进度</h2></div>' +
      '<div class="stage-grid">' + s.stageStats.map(function (x) {
        var pct = x.total ? Math.round(100 * x.done / x.total) : 0;
        return '<div class="stage-card" style="--c:' + x.stage.color + '"><div class="stage-name">' + x.stage.name + '<span>' + x.days + ' 天</span></div>' +
          '<div class="bar"><i style="width:' + pct + '%"></i></div><span class="small">' + x.done + '/' + x.total + ' 项 · ' + pct + '%</span></div>';
      }).join('') + '</div></section>';

    var byModule = {};
    Object.keys(st.done).forEach(function (k) {
      var dayIdx = +k.split('-')[0], ti = +k.split('-')[1];
      var t = Plan.day(dayIdx).tasks[ti];
      if (!t) return;
      byModule[t.module] = (byModule[t.module] || 0) + 1;
    });
    var modNames = { vocab: '词汇', listening: '听力', reading: '阅读', writing: '写作', translation: '翻译', grammar: '语法', skill: '技巧', review: '复盘', mock: '模考' };
    html += '<section class="card"><div class="card-head"><h2>各模块完成情况</h2></div><table class="table"><thead><tr><th>模块</th><th>完成项</th><th>占比</th></tr></thead><tbody>' +
      Object.keys(byModule).sort(function (a, b) { return byModule[b] - byModule[a]; }).map(function (m) {
        return '<tr><td>' + (modNames[m] || m) + '</td><td>' + byModule[m] + '</td><td>' +
          Math.round(100 * byModule[m] / Math.max(1, s.doneTasks)) + '%</td></tr>';
      }).join('') + '</tbody></table></section>';

    if (st.mocks.length) {
      html += '<section class="card"><div class="card-head"><h2>模考成绩记录</h2><span class="muted small">估算总分（满分 710）</span></div>' +
        '<table class="table"><thead><tr><th>时间</th><th>写作</th><th>听力</th><th>阅读</th><th>翻译</th><th>估算</th></tr></thead><tbody>' +
        st.mocks.map(function (m) {
          var t = Mock.estimate(m);
          return '<tr><td>' + m.at.slice(0, 10) + '</td><td>' + m.writing + '</td><td>' + m.listening + '</td><td>' + m.reading + '</td><td>' + m.translation + '</td><td><b>' + t.total + '</b></td></tr>';
        }).join('') + '</tbody></table>' +
        '<div class="chart line">' + st.mocks.map(function (m, i) {
          var t = Mock.estimate(m);
          var h = Math.max(4, Math.min(100, t.total / 710 * 100));
          return '<div class="col"><div class="col-bar" style="height:' + h + '%"></div><span>' + (i + 1) + '</span></div>';
        }).join('') + '</div></section>';
    } else {
      html += '<section class="card"><div class="card-head"><h2>模考成绩记录</h2></div>' +
        '<p class="muted">还没有模考记录。<a href="#/mock">去模考中心</a> 用 130 分钟完成一次完整模考，系统会估算总分并记录趋势。</p></section>';
    }
    return html;
  }

  function statCard(t, v, s) {
    return '<div class="stat"><span class="label">' + t + '</span><b>' + v + '</b><span class="muted small">' + s + '</span></div>';
  }

  function countTasksOn(iso) {
    var st = Store.get(), n = 0;
    Object.keys(st.done).forEach(function (k) {
      var dayIdx = +k.split('-')[0];
      if (Store.dayISO(dayIdx) === iso) n++;
    });
    return n;
  }

  function bindStats() {}

  /* ---------------- 设置与同步 ---------------- */
  function settingsPage() {
    var st = Store.get(), c = st.settings.cloud;
    var r = Libs.stats();
    var html = '<div class="page-head"><h1>设置与数据同步</h1><p class="muted">进度默认保存在本机浏览器；跨设备请用同步码或云同步</p></div>';

    html += '<section class="card"><div class="card-head"><h2>基本设置</h2></div><div class="form-grid">' +
      field('姓名（可选）', '<input class="input" data-set="name" value="' + U.esc(st.name) + '" placeholder="用于页面问候">') +
      field('考试日期', '<input class="input" type="date" data-set="examDate" value="' + st.examDate + '">') +
      field('计划开始日期', '<input class="input" type="date" data-set="planStart" value="' + st.planStart + '">') +
      field('每日学习时长', selectSet('dailyMinutes', [[45, '45 分钟（轻量）'], [60, '1 小时'], [90, '1.5 小时'], [120, '2 小时（推荐）'], [180, '3 小时（强化）']], st.dailyMinutes)) +
      field('目标分数', selectSet('targetScore', [[425, '425 过线'], [500, '500 中等'], [550, '550 良好'], [600, '600 优秀']], st.targetScore)) +
      field('界面主题', selectSet('theme', [['auto', '跟随系统'], ['light', '浅色'], ['dark', '深色']], st.settings.theme)) +
      field('朗读语速', selectSet('ttsRate', [[0.8, '慢速 0.8'], [0.95, '正常 0.95'], [1.1, '稍快 1.1']], st.settings.ttsRate)) +
      field('朗读语音', '<select class="input" data-set="voiceName"><option value="">自动选择</option>' +
        U.enVoices().map(function (v) { return '<option value="' + U.esc(v.name) + '"' + (st.settings.voiceName === v.name ? ' selected' : '') + '>' + U.esc(v.name) + '</option>'; }).join('') + '</select>') +
      '</div><p class="muted small">修改考试日期后，全站计划会自动重新生成，已完成的进度按天数保留。</p></section>';

    html += '<section class="card"><div class="card-head"><h2>跨设备同步</h2><span class="muted small">三种方式任选</span></div>' +
      '<div class="sync-block"><h3 class="sub">① 同步码（推荐，无需服务器）</h3>' +
      '<p class="muted small">在 A 设备点“生成同步码”并复制，在 B 设备粘贴后导入即可。数据只在你两台设备之间传递。</p>' +
      '<div class="row gap"><button class="btn primary" data-make-code>生成同步码</button>' +
      '<button class="btn ghost" data-copy-code>复制</button><button class="btn ghost" data-copy-link>复制为链接</button></div>' +
      '<textarea class="textarea code" rows="4" data-code placeholder="点击“生成同步码”，或在此粘贴另一台设备的同步码"></textarea>' +
      '<div class="row gap"><button class="btn" data-apply-merge>合并导入（推荐）</button>' +
      '<button class="btn ghost" data-apply-over>覆盖导入</button></div></div>' +

      '<div class="sync-block"><h3 class="sub">② 导出 / 导入文件</h3>' +
      '<p class="muted small">导出 JSON 备份文件，可通过微信、网盘传到手机后导入。</p>' +
      '<div class="row gap"><button class="btn" data-export>导出备份文件</button>' +
      '<button class="btn ghost" data-import>选择文件导入</button><input type="file" accept=".json,application/json" data-file hidden></div></div>' +

      '<div class="sync-block"><h3 class="sub">③ 云同步（自动同步，需要你自己准备一个接口地址）</h3>' +
      '<p class="muted small">填写一个能读写 JSON 的服务地址即可，例如 npoint.io 免费端点，或你自己的服务器接口。开启自动同步后，每次勾选任务都会在 5 秒内上传。</p>' +
      '<div class="form-grid">' +
      field('服务类型', selectSet('cloudProvider', [['off', '关闭'], ['npoint', 'npoint.io（免费）'], ['custom', '自定义 REST 接口']], c.provider)) +
      field('npoint 标识', '<input class="input" data-cloud="key" value="' + U.esc(c.key || '') + '" placeholder="例如 5f1d3c9b2a1f">') +
      field('自定义地址', '<input class="input" data-cloud="url" value="' + U.esc(c.url || '') + '" placeholder="https://example.com/api/progress">') +
      field('令牌（可选）', '<input class="input" data-cloud="token" value="' + U.esc(c.token || '') + '" placeholder="Bearer 或 API Key">') +
      '</div>' +
      '<label class="row gap center"><input type="checkbox" data-cloud-auto' + (c.auto ? ' checked' : '') + '> 开启自动同步（修改后自动上传）</label>' +
      '<div class="row gap"><button class="btn" data-cloud-push>立即上传</button>' +
      '<button class="btn ghost" data-cloud-pull>从云端拉取</button></div>' +
      '<p class="muted small">上次同步：' + (c.lastSyncAt ? new Date(c.lastSyncAt).toLocaleString() : '从未同步') + '</p></div>' +
    '</section>';

    html += '<section class="card"><div class="card-head"><h2>自定义词库</h2><span class="muted small">每行一个：单词 中文释义（可选英文例句）</span></div>' +
      '<p class="muted small">内置 ' + r.vocab + ' 个四级核心词、' + r.phrases + ' 个高频短语。把你自己在背的单词粘贴进来，备考计划会自动把它们排进每日任务。</p>' +
      '<textarea class="textarea" rows="4" data-custom placeholder="abandon 放弃\nillustrate 说明；举例"></textarea>' +
      '<div class="row gap"><button class="btn" data-add-words>添加到词库</button>' +
      '<span class="muted small">当前自定义词条：' + st.customWords.length + ' 个</span></div></section>';

    html += '<section class="card"><div class="card-head"><h2>数据管理</h2></div>' +
      '<p class="muted small">清空后无法恢复，请先导出备份或生成同步码。</p>' +
      '<div class="row gap"><button class="btn danger" data-reset>清空全部进度</button>' +
      '<button class="btn ghost" data-log-today>补记今天 30 分钟学习时长</button></div></section>';

    html += '<section class="card"><div class="card-head"><h2>使用说明</h2></div><div class="doc">' +
      '<p><b>1. 每天打开“今日任务”</b>，按清单完成即可，不需要自己安排内容。任务包含词汇、听力、阅读、写作、翻译、语法与复盘。</p>' +
      '<p><b>2. 听力怎么练：</b>先做题 → 点“逐句播放”精听 → 在听写框里写 → 对照原文标出漏听点。网页使用系统语音朗读，无需下载音频。</p>' +
      '<p><b>3. 手机使用：</b>用手机浏览器打开同一网址，选择“添加到主屏幕”，即可像 App 一样使用，断网也能打开（需支持离线缓存）。</p>' +
      '<p><b>4. 进度同步：</b>推荐用同步码在电脑和手机之间搬一次；如果你有自己的服务器或 npoint 地址，可以开启自动云同步。</p>' +
      '<p><b>5. 模考：</b>冲刺阶段每周安排整套模考，做完在“模考中心”录入各部分得分，系统会估算 710 分制总分并画出趋势。</p>' +
    '</div></section>';
    return html;
  }

  function field(label, inner) {
    return '<label class="field"><span>' + label + '</span>' + inner + '</label>';
  }
  function selectSet(key, opts, val) {
    return '<select class="input" data-set="' + key + '">' + opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + o[1] + '</option>';
    }).join('') + '</select>';
  }

  function bindSettings() {
    U.on(view, 'change', '[data-set]', function (e, el) {
      var k = el.getAttribute('data-set'), v = el.value, st = Store.get();
      if (k === 'name' || k === 'examDate' || k === 'planStart') st[k] = v;
      else if (k === 'theme' || k === 'voiceName') st.settings[k] = k === 'ttsRate' ? +v : v;
      else if (k === 'ttsRate') st.settings.ttsRate = +v;
      else st[k] = +v;
      Store.save();
      applyTheme();
      if (k === 'examDate' || k === 'planStart' || k === 'dailyMinutes') { Plan.reset(); Store.toast('计划已按新设置重新生成'); }
      render();
    });
    U.on(view, 'change', '[data-cloud]', function (e, el) {
      Store.get().settings.cloud[el.getAttribute('data-cloud')] = el.value; Store.save();
    });
    U.on(view, 'change', '[data-cloud-auto]', function (e, el) {
      Store.get().settings.cloud.auto = el.checked; Store.save();
    });
    U.on(view, 'click', '[data-cloud-push]', function () { Store.pushCloud(false).catch(function () {}); });
    U.on(view, 'click', '[data-cloud-pull]', function () { Store.pullCloud(false).then(render).catch(function () {}); });
    U.on(view, 'click', '[data-export]', function () {
      U.download('cet4-backup-' + U.todayISO() + '.json', Store.exportJSON());
      U.toast('已导出备份文件');
    });
    U.on(view, 'click', '[data-import]', function () { U.qs('[data-file]').click(); });
    U.on(view, 'change', '[data-file]', function (e, el) {
      var f = el.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try { Store.importJSON(String(reader.result)); Plan.reset(); U.toast('导入成功'); render(); }
        catch (err) { U.toast('导入失败：' + err.message); }
      };
      reader.readAsText(f);
    });
    U.on(view, 'click', '[data-make-code]', function () {
      var code = Store.makeSyncCode();
      var ta = U.qs('[data-code]');
      ta.value = code;
      ta.select();
      U.toast('同步码已生成（' + code.length + ' 字符），复制后到另一台设备粘贴导入');
    });
    U.on(view, 'click', '[data-copy-code]', function () {
      var ta = U.qs('[data-code]');
      if (!ta.value) ta.value = Store.makeSyncCode();
      U.copy(ta.value).then(function (ok) { U.toast(ok ? '已复制同步码' : '复制失败，请手动选择文本复制'); });
    });
    U.on(view, 'click', '[data-copy-link]', function () {
      var code = Store.makeSyncCode();
      var url = location.href.split('#')[0] + '#/settings?code=' + code;
      U.copy(url).then(function (ok) { U.toast(ok ? '已复制链接（' + url.length + ' 字符），发给手机打开即可导入' : '复制失败'); });
    });
    U.on(view, 'click', '[data-apply-merge]', applyCode('merge'));
    U.on(view, 'click', '[data-apply-over]', applyCode('over'));
    U.on(view, 'click', '[data-add-words]', function () {
      var txt = U.qs('[data-custom]').value || '';
      var added = 0;
      txt.split('\n').forEach(function (line) {
        line = line.trim();
        if (!line) return;
        var m = line.split(/[\s,，\t]+/);
        if (m.length < 2) return;
        var w = m[0], zh = m.slice(1).join(' ');
        if (!Libs.findWord(w)) { Store.get().customWords.push({ w: w, zh: zh }); added++; }
      });
      Store.save(); Plan.reset();
      U.toast(added ? '已添加 ' + added + ' 个词，已排入每日任务' : '没有识别到新词，请检查格式');
      render();
    });
    U.on(view, 'click', '[data-log-today]', function () {
      Store.log({ module: 'manual', minutes: 30 }); Store.toast('已补记 30 分钟'); render();
    });
    U.on(view, 'click', '[data-reset]', function () {
      U.confirm('确定清空全部学习进度吗？此操作不可恢复。', '清空', function () {
        Store.reset(); Plan.reset(); U.toast('已清空'); render();
      });
    });
  }

  function applyCode(mode) {
    return function () {
      var ta = U.qs('[data-code]');
      if (!ta.value.trim()) { U.toast('请先粘贴同步码'); return; }
      try {
        Store.applySyncCode(ta.value, mode); Plan.reset();
        U.toast(mode === 'merge' ? '已合并导入' : '已覆盖导入'); render();
      } catch (e) { U.toast('同步码无效：' + e.message); }
    };
  }

  /* ---------------- 主题 ---------------- */
  function applyTheme() {
    var t = Store.get().settings.theme;
    document.documentElement.setAttribute('data-theme', t === 'auto' ? '' : t);
  }

  /* ---------------- 启动 ---------------- */
  function boot() {
    U.loadVoices(function () {});
    applyTheme();
    var q = location.hash.indexOf('?code=') > 0 ? decodeURIComponent(location.hash.split('?code=')[1]) : '';
    if (q) {
      location.hash = '#/settings';
      setTimeout(function () {
        try {
          Store.applySyncCode(q, 'merge'); Plan.reset(); U.toast('已从链接导入进度');
        } catch (e) { U.toast('链接中的同步码无效'); }
        render();
        var ta = U.qs('[data-code]'); if (ta) ta.value = q;
      }, 60);
    }
    window.addEventListener('hashchange', render);
    Store.subscribe(function () {});
    render();
    var d = Plan.build();
    var total = d.days.reduce(function (s, x) { return s + x.tasks.length; }, 0);
    console.log('CET-4 备考网站已加载：' + d.total + ' 天 / ' + total + ' 项任务');
  }

  return { render: render, go: go, boot: boot, applyTheme: applyTheme,
    ring: ring, moduleChip: moduleChip, field: field, selectSet: selectSet, statCard: statCard };
})();

document.addEventListener('DOMContentLoaded', function () { App.boot(); });
