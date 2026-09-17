/* 练习模块（续）：写作、翻译、语法、技巧、复盘、模考中心 */
(function () {
  var P = window.Practice;
  var sec = P.section, speakBtn = P.speakBtn, answerCard = P.answerCard;

  var WRITE_TEMPLATE = [
    ['首段（3 句）', '背景句 → 争议/现象 → 中心句（明确表态）'],
    ['中间段（5-6 句）', 'First, 观点一 + 原因 + 例子 → What is more, 观点二 + 原因 + 例子 → 小结'],
    ['末段（2-3 句）', 'To sum up, 重申观点 → 建议/展望（It is high time that we ...）']
  ];

  function writePanel(item, ctx) {
    if (!item) return '<div class="card"><p>写作题目不存在</p></div>';
    ctx = ctx || 'write-' + item.id;
    var draft = P.getAns(ctx + ':draft', '');
    var html = '';
    html += sec('题目：' + U.esc(item.title) + '（' + item.type + '）',
      '<p class="prompt">' + U.esc(item.cn) + '</p>' +
      '<h3 class="sub">三段提纲</h3><ol class="outline">' + item.points.map(function (p) { return '<li>' + U.esc(p) + '</li>'; }).join('') + '</ol>' +
      '<h3 class="sub">必备表达（写完请检查是否用上至少 3 个）</h3>' +
      '<div class="chips">' + item.ex.map(function (x) { return '<span class="pill static">' + U.esc(x) + '</span>'; }).join('') + '</div>');

    html += sec('万能结构模板',
      '<div class="table-wrap"><table class="table"><tbody>' + WRITE_TEMPLATE.map(function (r) {
        return '<tr><td><b>' + r[0] + '</b></td><td>' + U.esc(r[1]) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="muted small">评分要点：内容切题、结构清楚、语言准确、词汇多样。四级作文 120-180 词，建议写 3 段。</p>');

    html += sec('计时写作（30 分钟）',
      '<div class="timer-row"><div class="timer" data-timer>--:--</div>' +
      '<button class="btn primary" data-timer-min="30">开始 30 分钟</button>' +
      '<button class="btn ghost" data-timer-min="20">先写 20 分钟提纲版</button></div>' +
      '<textarea class="textarea big" rows="12" data-essay="' + ctx + '" placeholder="在这里写你的作文，自动保存…">' + U.esc(draft) + '</textarea>' +
      '<div class="row gap between"><span class="muted small" data-word-count>0 词</span>' +
      '<span class="muted small">建议 120-180 词</span></div>');

    html += sec('参考范文（先自己写完再看）',
      '<div class="row gap"><button class="btn ghost small" data-reveal="model">显示 / 隐藏范文</button></div>' +
      '<div class="model" hidden data-model><div class="passage">' + item.model.split('\n\n').map(function (p) { return '<p>' + U.esc(p) + '</p>'; }).join('') + '</div>' +
      '<p class="muted small">提醒：' + U.esc(item.tips) + '</p></div>');

    html += sec('自评打分', selfAssess(ctx));
    return html;
  }

  function selfAssess(ctx) {
    var saved = P.getAns(ctx + ':self', {});
    var items = [['c1', '内容切题：每段都扣住题目'], ['c2', '结构清楚：有明确三段与连接词'],
      ['c3', '语言准确：无主谓一致/时态错误'], ['c4', '词汇多样：同义替换 3 处以上'],
      ['c5', '字数达标：120-180 词'], ['c6', '书写规范：英文标点、无中文标点']];
    return '<div class="checks">' + items.map(function (it) {
      return '<label class="check-row"><input type="checkbox" data-self="' + ctx + ':' + it[0] + '"' + (saved[it[0]] ? ' checked' : '') + '> ' + it[1] + '</label>';
    }).join('') + '</div><p class="muted small">每项 1 分，5 分以上说明这篇作文达到及格水平（对应 11 分档）。</p>';
  }

  function transPanel(item, ctx) {
    if (!item) return '<div class="card"><p>翻译题目不存在</p></div>';
    ctx = ctx || 'trans-' + item.id;
    var draft = P.getAns(ctx + ':draft', '');
    var html = '';
    html += sec('中文原文（' + item.topic + '）',
      '<div class="cn-text">' + U.esc(item.zh) + '</div>' +
      '<p class="muted small">共 ' + item.zh.length + ' 字，四级翻译通常 140-180 字，建议 30 分钟内完成。</p>');
    html += sec('计时翻译（建议 20 分钟）',
      '<div class="timer-row"><div class="timer" data-timer>--:--</div>' +
      '<button class="btn primary" data-timer-min="20">开始 20 分钟</button>' +
      '<button class="btn ghost" data-timer-min="30">按考试 30 分钟</button></div>' +
      '<textarea class="textarea big" rows="10" data-essay="' + ctx + '" placeholder="在这里写你的英文译文，自动保存…">' + U.esc(draft) + '</textarea>');
    html += sec('参考译文',
      '<div class="row gap"><button class="btn ghost small" data-reveal="model">显示 / 隐藏参考译文</button></div>' +
      '<div hidden data-model><div class="passage en">' + U.esc(item.en) + '</div>' +
        '<h3 class="sub">关键词与高频表达</h3><div class="chips">' + item.keys.map(function (k) { return '<span class="pill static">' + U.esc(k) + '</span>'; }).join('') + '</div>' +
        '<h3 class="sub">难点解析</h3><p class="muted">' + U.esc(item.hard.join(' ')) + '</p></div>');
    html += sec('自评打分', selfAssess(ctx).replace(/内容切题：每段都扣住题目/, '内容完整：原文信息没有遗漏')
      .replace(/结构清楚：有明确三段与连接词/, '句子通顺：主干与从句结构正确')
      .replace(/语言准确：无主谓一致\/时态错误/, '时态正确：符合“介绍现状/近年变化”的时态')
      .replace(/词汇多样：同义替换 3 处以上/, '用词恰当：关键词翻译准确')
      .replace(/字数达标：120-180 词/, '无中式英语：避免逐字直译')
      .replace(/书写规范：英文标点、无中文标点/, '拼写与标点：全篇英文标点、无拼写错误'));
    return html;
  }

  function gramDetail(item) {
    if (!item) return '<div class="card"><p>语法点不存在</p></div>';
    return '<div class="page-head"><h1>' + U.esc(item.title) + '</h1><p class="muted">' + U.esc(item.cat) + '</p></div>' +
      sec('讲解', '<p class="doc-p">' + U.esc(item.exp) + '</p>') +
      sec('例句', '<div class="ex-list">' + item.ex.map(function (e) {
        return '<div class="ex-item"><p class="en">' + U.esc(e[0]) + speakBtn(e[0]) + '</p><p class="muted">' + U.esc(e[1]) + '</p></div>';
      }).join('') + '</div>') +
      sec('容易出错的地方', '<p class="warn">' + U.esc(item.trap) + '</p>') +
      sec('马上用一次', '<p class="muted small">用这个语法点写一句和四级话题（学习、校园、科技、环保）相关的句子，写完读出来。</p>' +
        '<textarea class="textarea" rows="3" data-essay="gram-' + item.id + '" placeholder="My sentence: ...">' + U.esc(P.getAns('gram-' + item.id + ':draft', '')) + '</textarea>');
  }

  function skillDetail(item) {
    if (!item) return '<div class="card"><p>技巧不存在</p></div>';
    var mod = { listening: '听力', reading: '阅读', writing: '写作', translation: '翻译', vocab: '词汇', exam: '考场策略' }[item.module] || '';
    return '<div class="page-head"><h1>' + U.esc(item.title) + '</h1><p class="muted">' + mod + '</p></div>' +
      sec('要点', '<ol class="points">' + item.points.map(function (p) { return '<li>' + U.esc(p) + '</li>'; }).join('') + '</ol>') +
      sec('下一步', '<p class="muted small">看完技巧后，回到今日任务或专项练习，在做题时用一次；只读技巧不练题，效果很有限。</p>' +
        '<button class="btn" onclick="location.hash=\'#/practice\'">去专项练习</button>');
  }

  function reviewPanel(day) {
    var s = Plan.stats();
    var st = Store.get();
    var weak = weakWords(12);
    var d = Plan.day(day);
    return sec('今日复盘',
      '<p class="muted small">完成率 ' + s.rate + '% · 连续打卡 ' + Store.streak() + ' 天 · 掌握词汇 ' + Store.masteredWords() + ' 个</p>' +
      '<h3 class="sub">今天的任务完成情况</h3>' +
      '<ul class="plain">' + d.tasks.map(function (t) {
        return '<li>' + (Store.isDone(day, t.idx) ? '✅' : '⬜') + ' ' + U.esc(t.title) + '</li>';
      }).join('') + '</ul>' +
      (weak.length ? '<h3 class="sub">需要再看的词（按掌握度排序）</h3><div class="chips">' +
        weak.map(function (w) { return '<span class="pill static">' + U.esc(w.w) + ' · ' + U.esc(w.zh) + '</span>'; }).join('') + '</div>' : '') +
      '<h3 class="sub">写下来才算复盘</h3>' +
      '<textarea class="textarea" rows="4" data-essay="review-' + day + '" placeholder="今天错的题属于哪一类？下次遇到同样的题怎么做？">' +
      U.esc(P.getAns('review-' + day + ':draft', '')) + '</textarea>');
  }

  function weakWords(n) {
    var st = Store.get().wordStat;
    var list = Object.keys(st).filter(function (w) { return st[w].m > 0 && st[w].m < 3; });
    list.sort(function (a, b) { return st[a].m - st[b].m; });
    return list.slice(0, n).map(function (w) { return Libs.findWord(w) || { w: w, zh: '' }; });
  }

  /* ---------- 任务分发 ---------- */
  function taskView(t, day) {
    var ctx = 'd' + day + '-' + t.idx;
    switch (t.module) {
      case 'vocab': return P.vocabPanel(t);
      case 'listening': return P.listenDetail(Libs.byId(Libs.listening, t.data.id), ctx);
      case 'reading': return P.readDetail(Libs.byId(Libs.reading, t.data.id), ctx);
      case 'writing': return writePanel(Libs.byId(Libs.writing, t.data.id), ctx);
      case 'translation': return transPanel(Libs.byId(Libs.translation, t.data.id), ctx);
      case 'grammar': return gramDetail(Libs.byId(Libs.grammar, t.data.id));
      case 'skill': return skillDetail(Libs.byId(Libs.skills, t.data.id));
      case 'review': return reviewPanel(day);
      case 'mock': return window.Mock.page(true);
      default: return '<div class="card"><p class="muted">该任务暂无详情。</p></div>';
    }
  }

  /* ---------- 统一事件绑定 ---------- */
  function bind(day, idx) {
    var root = document.getElementById('view');
    var st = Store.get();

    U.on(root, 'click', '[data-say]', function (e, el) {
      U.speak(el.getAttribute('data-say'), { rate: st.settings.ttsRate, voiceName: st.settings.voiceName });
    });
    U.on(root, 'click', '[data-say-all]', function (e, el) {
      U.speak(el.getAttribute('data-say-all').split(', ').join(', '), { rate: 0.9, voiceName: st.settings.voiceName });
    });

    /* 选择题 */
    U.on(root, 'click', '[data-pick]', function (e, el) {
      var quiz = el.closest('.quiz'), ctx = quiz.getAttribute('data-quiz');
      var qEl = el.closest('.q'), qi = +qEl.getAttribute('data-q'), ans = +qEl.getAttribute('data-ans');
      var saved = P.getAns(ctx + ':quiz', {}) || {};
      if (saved[qi] !== undefined) return;
      saved[qi] = +el.getAttribute('data-pick');
      P.setAns(ctx + ':quiz', saved);
      U.qsa('.opt', qEl).forEach(function (o, j) {
        if (j === ans) o.classList.add('right');
        else if (j === saved[qi]) o.classList.add('wrong');
      });
      if (!qEl.querySelector('.explain')) {
        var ex = document.createElement('p');
        ex.className = 'explain';
        ex.textContent = '正确答案：' + 'ABCD'[ans] + ' · ' + (qEl.getAttribute('data-ex') || '');
        qEl.appendChild(ex);
      }
      var total = U.qsa('.q', quiz).length;
      if (Object.keys(saved).length >= total) {
        var right = 0;
        U.qsa('.q', quiz).forEach(function (q, i) { if (saved[i] === +q.getAttribute('data-ans')) right++; });
        U.toast('本轮完成：答对 ' + right + ' / ' + total + ' 题');
        Store.log({ module: 'quiz', minutes: 5, score: right, total: total });
      }
    });
    U.on(root, 'click', '[data-quiz-reset]', function (e, el) {
      var quiz = el.closest('.card').querySelector('.quiz');
      if (quiz) { P.setAns(quiz.getAttribute('data-quiz') + ':quiz', {}); App.render(); }
    });

    /* 词汇掌握标记 */
    U.on(root, 'click', '[data-mark]', function (e, el) {
      var w = el.getAttribute('data-mark');
      var lv = Store.wordLevel(w);
      Store.get().wordStat[w] = { m: (lv + 1) % 4, n: 1, t: U.todayISO() };
      Store.save();
      el.textContent = ['未学', '模糊', '眼熟', '掌握'][Store.wordLevel(w)];
    });

    /* 计时器 */
    U.on(root, 'click', '[data-timer-min]', function (e, el) {
      var box = root.querySelector('[data-timer]');
      var min = +el.getAttribute('data-timer-min');
      U.startTimer(box, min * 60, function () {
        U.toast('时间到！无论做到哪里都停笔，先看答案再补完');
      });
      U.toast('已开始 ' + min + ' 分钟计时');
    });

    /* 听力播放 */
    var item = currentListening();
    U.on(root, 'click', '[data-listen]', function (e, el) {
      if (!item) return;
      var mode = el.getAttribute('data-listen');
      if (mode === 'stop') { U.stopSpeak(); return; }
      U.speak(item.script, { rate: mode === 'slow' ? 0.72 : st.settings.ttsRate, voiceName: st.settings.voiceName });
    });
    U.on(root, 'click', '[data-listen-one]', function (e, el) {
      if (!item) return;
      var i = +el.getAttribute('data-listen-one');
      var s = P.sentences(item.script)[i];
      if (s) U.speak(s, { rate: st.settings.ttsRate, voiceName: st.settings.voiceName });
    });
    U.on(root, 'click', '[data-toggle-script]', function () {
      var box = root.querySelector('[data-script]');
      if (box) box.hidden = !box.hidden;
    });

    /* 听写对照 */
    U.on(root, 'input', '[data-dictation]', function (e, el) {
      var key = (item ? 'listen-' + item.id : 'listen') + ':dict';
      P.setAns(key, el.value);
    });
    U.on(root, 'click', '[data-check-dict]', function () {
      if (!item) return;
      var text = (root.querySelector('[data-dictation]') || {}).value || '';
      var expect = words(item.script), got = words(text);
      if (!got.length) { U.toast('先写下你听到的内容再对照'); return; }
      var pool = expect.slice(), hit = 0;
      got.forEach(function (w) {
        var i = pool.indexOf(w);
        if (i >= 0) { hit++; pool.splice(i, 1); }
      });
      var acc = Math.round(100 * hit / expect.length);
      var miss = pool.slice(0, 12).join(', ');
      var box = root.querySelector('[data-dict-result]');
      if (box) box.innerHTML = '准确率 <b>' + acc + '%</b>（' + hit + '/' + expect.length + ' 词）' +
        (miss ? '<br>漏听或写错的词：' + U.esc(miss) : '<br>全部听对，非常好！');
      Store.log({ module: 'dictation', minutes: 10, score: hit, total: expect.length });
    });

    /* 范文 / 译文显示 */
    U.on(root, 'click', '[data-reveal]', function () {
      var box = root.querySelector('[data-model]');
      if (box) box.hidden = !box.hidden;
    });

    /* 写作与翻译草稿 */
    U.on(root, 'input', '[data-essay]', function (e, el) {
      var key = el.getAttribute('data-essay');
      P.setAns(key + ':draft', el.value);
      var c = root.querySelector('[data-word-count]');
      if (c) c.textContent = (el.value.trim().match(/[A-Za-z][A-Za-z'-]*/g) || []).length + ' 词';
    });
    U.on(root, 'change', '[data-self]', function (e, el) {
      var key = el.getAttribute('data-self'), parts = key.split(':');
      var saved = P.getAns(parts[0] + ':self', {}) || {};
      saved[parts[1]] = el.checked;
      P.setAns(parts[0] + ':self', saved);
    });

    /* 初始化字数显示 */
    var essay = root.querySelector('[data-essay]');
    var counter = root.querySelector('[data-word-count]');
    if (essay && counter) counter.textContent = (essay.value.trim().match(/[A-Za-z][A-Za-z'-]*/g) || []).length + ' 词';
  }

  function words(s) {
    return String(s).toLowerCase().replace(/[^a-z\s']/g, ' ').split(/\s+/).filter(Boolean);
  }
  function currentListening() {
    var m = /^#\/listen\/(L\d+)/.exec(location.hash) || /^#\/task\/(\d+)\/(\d+)/.exec(location.hash);
    if (!m) return null;
    if (/^#\/listen\//.test(location.hash)) return Libs.byId(Libs.listening, m[1]);
    var d = +m[1], i = +m[2], t = Plan.day(d).tasks[i];
    return t && t.module === 'listening' ? Libs.byId(Libs.listening, t.data.id) : null;
  }

  P.task = taskView;
  P.bind = bind;
  P.bindListen = bind;
  P.bindRead = bind;
  P.writeDetail = function (item) { return writePanel(item); };
  P.bindWrite = function () { bind(); };
  P.transDetail = function (item) { return transPanel(item); };
  P.bindTrans = function () { bind(); };
  P.gramDetail = gramDetail;
  P.skillDetail = skillDetail;
  P.weakWords = weakWords;
  P.listenDetailBase = P.listenDetail;
  P.readDetailBase = P.readDetail;
})();

/* ---------------- 模考中心 ---------------- */
window.Mock = (function () {
  function estimate(m) {
    var w = (+m.writing || 0) / 15 * 106.5;
    var t = (+m.translation || 0) / 15 * 106.5;
    var l = (+m.listening || 0) / 25 * 248.5;
    var r = (+m.reading || 0) / 30 * 248.5;
    var total = Math.round(w + t + l + r);
    return { writing: Math.round(w), translation: Math.round(t), listening: Math.round(l), reading: Math.round(r), total: total };
  }

  function page(inner) {
    var exam = Libs.exam;
    var st = Store.get();
    var html = '';
    if (!inner) {
      html += '<div class="page-head"><h1>模考中心</h1>' +
        '<p class="muted">四级总分 710 分，425 分通过；建议冲刺阶段每周做 1-2 套完整模考</p></div>';
    } else {
      html += '<div class="page-head"><p class="muted">严格按考试时间完成，中间不查词、不看答案；做完在下方录入分数。</p></div>';
    }
    html += '<section class="card"><div class="card-head"><h2>试卷结构</h2><span class="muted small">报名后请以官方通知为准</span></div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>部分</th><th>占比</th><th>分值</th><th>时间</th><th>题型</th></tr></thead><tbody>' +
      exam.sections.map(function (s) {
        return '<tr><td><b>' + s.name + '</b></td><td>' + s.ratio + '</td><td>' + s.score + '</td><td>' + s.time + ' 分钟</td><td class="ex">' + U.esc(s.desc) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<h3 class="sub">阅读部分分值分布（决定做题顺序）</h3>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>题型</th><th>题数</th><th>每题分值</th><th>建议</th></tr></thead><tbody>' +
      exam.readingDetail.map(function (r) {
        return '<tr><td>' + r.name + '</td><td>' + r.count + '</td><td><b>' + r.per + '</b></td><td class="ex">' + U.esc(r.advice) + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';

    html += '<section class="card"><div class="card-head"><h2>考试计时器</h2><span class="muted small">按真实考试时间练习</span></div>' +
      '<div class="timer-row"><div class="timer big" data-timer>--:--</div>' +
      '<div class="chips">' +
        '<button class="pill" data-timer-min="30">写作 30′</button>' +
        '<button class="pill" data-timer-min="25">听力 25′</button>' +
        '<button class="pill" data-timer-min="40">阅读 40′</button>' +
        '<button class="pill" data-timer-min="30">翻译 30′</button>' +
        '<button class="pill" data-timer-min="130">整套 130′</button>' +
        '<button class="pill" data-timer-stop>停止</button>' +
      '</div></div>' +
      '<p class="muted small">真实流程：先写作文（30 分钟）→ 听力（25 分钟，边听边涂卡）→ 阅读 + 翻译（70 分钟）。</p></section>';

    html += '<section class="card"><div class="card-head"><h2>成绩录入与总分估算</h2><span class="muted small">估算仅作参考</span></div>' +
      '<div class="form-grid four">' +
      num('写作（0-15 分）', 'writing', 15) +
      num('翻译（0-15 分）', 'translation', 15) +
      num('听力答对（0-25 题）', 'listening', 25) +
      num('阅读答对（0-30 题）', 'reading', 30) +
      '</div>' +
      '<div class="estimate" data-estimate><span>估算总分</span><b>--</b><span class="muted small">/ 710</span></div>' +
      '<div class="row gap"><button class="btn primary" data-save-mock>保存本次模考成绩</button>' +
      '<button class="btn ghost" data-export-mock>导出成绩 CSV</button></div>' +
      '<p class="muted small">换算方式：写作/翻译按 15 分制折算为 106.5 分，听力 25 题、阅读 30 题按题数折算为 248.5 分。实际成绩采用常模转换，会有差异。</p></section>';

    html += '<section class="card"><div class="card-head"><h2>历年成绩记录</h2></div>' +
      (st.mocks.length ? '<div class="table-wrap"><table class="table"><thead><tr><th>日期</th><th>写作</th><th>翻译</th><th>听力</th><th>阅读</th><th>估算总分</th></tr></thead><tbody>' +
        st.mocks.map(function (m) {
          var e = estimate(m);
          return '<tr><td>' + m.at.slice(0, 10) + '</td><td>' + m.writing + '</td><td>' + m.translation + '</td>' +
            '<td>' + m.listening + '/25</td><td>' + m.reading + '/30</td><td><b>' + e.total + '</b>' +
            (e.total >= st.targetScore ? ' <span class="ok">达标</span>' : ' <span class="bad">待提升</span>') + '</td></tr>';
        }).join('') + '</tbody></table></div>'
        : '<p class="muted">还没有记录，完成一次模考后录入分数即可看到趋势。</p>') +
      '</section>';

    html += '<section class="card"><div class="card-head"><h2>写作与翻译评分标准</h2></div>' +
      '<div class="two-col">' +
      '<div><h3 class="sub">写作</h3><div class="table-wrap"><table class="table"><tbody>' +
        exam.writingScale.map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td class="ex">' + U.esc(r[1]) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>' +
      '<div><h3 class="sub">翻译</h3><div class="table-wrap"><table class="table"><tbody>' +
        exam.translationScale.map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td class="ex">' + U.esc(r[1]) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div></div></section>';

    html += '<section class="card"><div class="card-head"><h2>考场流程与注意事项</h2></div>' +
      '<ol class="points">' + (Libs.byId(Libs.skills, 'S20') || { points: [] }).points.map(function (p) { return '<li>' + U.esc(p) + '</li>'; }).join('') + '</ol></section>';
    return html;
  }

  function num(label, key, max) {
    return '<label class="field"><span>' + label + '</span><input class="input" type="number" min="0" max="' + max + '" step="1" data-mock="' + key + '" placeholder="0"></label>';
  }

  function bind() {
    var root = document.getElementById('view');
    var values = {};
    function refresh() {
      var box = root.querySelector('[data-estimate]');
      if (!box) return;
      var e = estimate(values);
      box.querySelector('b').textContent = e.total;
    }
    U.on(root, 'input', '[data-mock]', function (e, el) {
      values[el.getAttribute('data-mock')] = +el.value || 0;
      refresh();
    });
    U.on(root, 'click', '[data-timer-min]', function (e, el) {
      var box = root.querySelector('[data-timer]');
      U.startTimer(box, +el.getAttribute('data-timer-min') * 60, function () { U.toast('时间到，停笔检查'); });
    });
    U.on(root, 'click', '[data-timer-stop]', function () { U.stopTimer(); U.toast('计时已停止'); });
    U.on(root, 'click', '[data-save-mock]', function () {
      var has = ['writing', 'translation', 'listening', 'reading'].some(function (k) { return values[k]; });
      if (!has) { U.toast('请先填写至少一项分数'); return; }
      Store.addMock(values);
      U.toast('已保存模考成绩，估算总分 ' + estimate(values).total + ' 分');
      App.render();
    });
    U.on(root, 'click', '[data-export-mock]', function () {
      var rows = [['日期', '写作', '翻译', '听力', '阅读', '估算总分']].concat(Store.get().mocks.map(function (m) {
        var e = estimate(m);
        return [m.at.slice(0, 10), m.writing, m.translation, m.listening, m.reading, e.total];
      }));
      U.download('cet4-mock-scores.csv', rows.map(function (r) { return r.join(','); }).join('\n'), 'text/csv');
    });
  }

  return { page: page, bind: bind, estimate: estimate };
})();
