/* 练习模块：词汇、听力、阅读 */
window.Practice = (function () {
  /* ---------- 小工具 ---------- */
  function answers() { return Store.get().answers || (Store.get().answers = {}); }
  function getAns(key, def) { var a = answers()[key]; return a === undefined ? def : a; }
  function setAns(key, val) { answers()[key] = val; Store.save({ silent: true }); }
  function speakBtn(text, cls) {
    return '<button class="icon-btn ' + (cls || '') + '" data-say="' + U.esc(text) + '" title="朗读">🔊</button>';
  }
  function sentences(text) {
    return String(text).replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function quizOptions(word, pool, seed) {
    var opts = [word.zh];
    var others = U.shuffle(pool.filter(function (x) { return x.zh !== word.zh; }), seed || 7);
    for (var i = 0; i < others.length && opts.length < 4; i++) opts.push(others[i].zh);
    return U.shuffle(opts, (seed || 7) + 13);
  }
  function section(title, inner, extra) {
    return '<section class="card"><div class="card-head"><h2>' + title + '</h2>' + (extra || '') + '</div>' + inner + '</section>';
  }
  function answerCard(qs, ctx, opts) {
    opts = opts || {};
    var saved = getAns(ctx + ':quiz', {});
    var html = '<div class="quiz" data-quiz="' + ctx + '">' + qs.map(function (q, i) {
      var pick = saved[i];
      return '<div class="q" data-q="' + i + '" data-ans="' + q[2] + '" data-ex="' + U.esc(q[3]) + '">' +
        '<p class="q-title"><b>' + (i + 1) + '.</b> ' + U.esc(q[0]) + '</p>' +
        '<div class="options">' + q[1].map(function (o, j) {
          var cls = '';
          if (pick !== undefined) {
            if (j === q[2]) cls = 'right';
            else if (j === pick) cls = 'wrong';
          }
          return '<button class="opt ' + cls + '" data-pick="' + j + '"><span>' + 'ABCD'[j] + '</span>' + U.esc(o) + '</button>';
        }).join('') + '</div>' +
        (pick !== undefined ? '<p class="explain">正确答案：' + 'ABCD'[q[2]] + ' · ' + U.esc(q[3]) + '</p>' : '') +
      '</div>';
    }).join('') + '</div>' +
    '<div class="card-foot"><button class="btn" data-quiz-reset>重做本题组</button>' +
      '<span class="muted small">' + (opts.hint || '选择选项后立即显示答案与解析') + '</span></div>';
    return html;
  }

  /* ---------- 词汇任务 ---------- */
  function vocabPanel(task) {
    var data = task.data || {};
    if (data.type === 'phrase') {
      var ph = data.phrases || [];
      return section('高频短语 10 组', '<div class="phrase-list">' + ph.map(function (p) {
        return '<div class="phrase"><div><b>' + U.esc(p.p) + '</b>' + speakBtn(p.en) + '</div>' +
          '<p class="muted small">' + U.esc(p.zh) + '</p><p class="ex">' + U.esc(p.en) + '</p></div>';
      }).join('') + '</div>' +
      '<p class="muted small">背搭配要整体记：把“动词 + 介词”当成一个单词，抄写 3 遍并在句子里读出来。</p>');
    }
    var words = data.words || [];
    if (!words.length) return section('词汇', '<p class="muted">今天没有词汇任务。</p>');
    var isReview = data.type === 'review';
    var pool = Libs.allVocab();
    var quizWords = U.shuffle(words, 11).slice(0, Math.min(8, words.length));
    var qs = quizWords.map(function (w, i) { return ['请选出 “' + w.w + '” 的中文释义', quizOptions(w, pool, i + 3), 0, w.zh + '（' + (w.pos || '') + '）']; });
    qs = qs.map(function (q, i) {
      var w = quizWords[i];
      var opts = quizOptions(w, pool, i + 3);
      return [q[0], opts, opts.indexOf(w.zh), w.zh + '　例：' + (w.en || '')];
    });

    var html = '';
    html += section(isReview ? '复习词表（' + words.length + ' 个）' : '今日新词（' + words.length + ' 个）',
      '<div class="table-wrap"><table class="table words"><thead><tr><th>单词</th><th>词性</th><th>释义</th><th>例句</th><th>掌握</th></tr></thead><tbody>' +
      words.map(function (w) {
        var lv = Store.wordLevel(w.w);
        return '<tr><td><b>' + U.esc(w.w) + '</b>' + speakBtn(w.w) + '</td><td class="pos">' + U.esc(w.pos || '') + '</td>' +
          '<td>' + U.esc(w.zh) + '</td><td class="ex">' + U.esc(w.en || '') + '<br><span class="muted">' + U.esc(w.zhEx || '') + '</span></td>' +
          '<td><button class="lvl" data-mark="' + U.esc(w.w) + '" title="标记掌握程度">' + ['未学', '模糊', '眼熟', '掌握'][lv] + '</button></td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="card-foot"><button class="btn ghost small" data-say-all="' + U.esc(words.map(function (w) { return w.w; }).join(', ')) + '">连续朗读全部单词</button>' +
      '<span class="muted small">点击“掌握”按钮循环切换：未学 → 模糊 → 眼熟 → 掌握</span></div>');

    html += section('遮挡自测（' + Math.min(8, words.length) + ' 题）',
      answerCard(qs, 'vocab-' + (data.words[0] ? data.words[0].w : 'x'), { hint: '先自己回忆，再看选项；答错的词回到上面的词表再读一遍例句' }),
      '<span class="muted small">答对 8 题以上说明今天的新词基本掌握</span>');
    return html;
  }

  /* ---------- 听力 ---------- */
  var audio = null;          // 复用的 <audio>
  var playing = null;        // 当前播放的句子下标

  function audioList(item) {
    var m = window.CET4_AUDIO || {};
    return m[item.id] || null;
  }

  function playList(list, rate, start) {
    stopAudio();
    audio = new Audio();
    audio._chain = true;
    playAt(list, start || 0, rate || 1);
  }

  function audioSrc(file) { return 'assets/audio/' + file; }

  function stopAudio() {
    if (audio) { try { audio.pause(); } catch (e) {} audio = null; }
    playing = null;
    U.qsa('.sent-list li').forEach(function (li) { li.classList.remove('playing'); });
  }

  function playAt(list, i, rate, onEnd) {
    if (!list || i >= list.length) { stopAudio(); if (onEnd) onEnd(); return; }
    if (!audio) audio = new Audio();
    var seg = list[i];
    audio.src = audioSrc(seg[0]);
    audio.playbackRate = rate || 1;
    playing = i;
    U.qsa('.sent-list li').forEach(function (li) {
      li.classList.toggle('playing', +li.getAttribute('data-sent') === i);
    });
    audio.onended = function () {
      if (audio._chain) playAt(list, i + 1, rate, onEnd);
      else { playing = null; U.qsa('.sent-list li').forEach(function (li) { li.classList.remove('playing'); }); }
    };
    audio.play().catch(function (e) {
      U.toast('音频播放被浏览器拦截或文件缺失，已改用系统朗读');
      stopAudio();
      U.speak(seg[2], { rate: Store.get().settings.ttsRate, voiceName: Store.get().settings.voiceName });
    });
  }

  function listenDetail(item, ctx) {
    if (!item) return '<div class="card"><p>听力材料不存在</p></div>';
    ctx = ctx || 'listen-' + item.id;
    var list = audioList(item);
    var sents = list ? list.map(function (x) { return x[2]; }) : sentences(item.script);
    var speakers = list ? list.map(function (x) { return x[1]; }) : null;
    var typeName = { news: '短篇新闻', conversation: '长对话', passage: '听力篇章' }[item.type];
    var html = '';

    html += section(typeName + ' · ' + U.esc(item.title), '', '<span class="muted small">' + sents.length + ' 句 · 建议先做题再精听</span>');
    html += section('播放与精听',
      '<div class="player">' +
        '<button class="btn primary" data-listen="all">▶ 播放全文</button>' +
        '<button class="btn ghost" data-listen="slow">🐢 慢速播放（0.8 倍）</button>' +
        '<button class="btn ghost" data-listen="stop">■ 停止</button>' +
        '<span class="muted small">' + (list ? '考场风格录音（' + (item.type === 'conversation' ? '男声 + 女声对话' : '播音音色') + '，语速接近真题）'
          : '本材料暂无录音文件，使用系统语音朗读') + '</span>' +
      '</div>' +
      '<ol class="sent-list">' + sents.map(function (s, i) {
        var who = speakers && speakers[i] ? '<em class="speaker">' + (speakers[i] === 'M' ? '男' : '女') + '</em>' : '';
        return '<li data-sent="' + i + '"><button class="icon-btn" data-listen-one="' + i + '">▶</button>' +
          who + '<span>' + U.esc(s) + '</span></li>';
      }).join('') + '</ol>' +
      '<div class="card-foot"><button class="btn ghost small" data-toggle-script>显示 / 隐藏听力原文</button>' +
      '<span class="muted small">点句子前面的 ▶ 可以反复精听同一句</span></div>' +
      '<div class="script" hidden data-script>' + U.esc(item.script.split('\n').join(' ')) +
        '<p class="muted small">参考译文：' + U.esc(item.zh) + '</p></div>');

    html += section('听写训练',
      '<p class="muted small">点“播放全文”后，把听到的内容写在下面；写完点“对照原文”，系统会标出准确率。</p>' +
      '<textarea class="textarea" rows="5" data-dictation placeholder="在这里写下你听到的句子…">' + U.esc(getAns(ctx + ':dict', '')) + '</textarea>' +
      '<div class="row gap"><button class="btn" data-check-dict>对照原文</button>' +
      '<span class="muted small" data-dict-result></span></div>');

    html += section('听力题（' + item.qs.length + ' 题）', answerCard(item.qs, ctx, { hint: '做完后核对解析，标出漏听的关键词' }));

    html += section('生词与表达',
      '<div class="chips">' + (item.words || []).map(function (w) {
        return '<span class="pill static">' + U.esc(w[0]) + ' · ' + U.esc(w[1]) + '</span>';
      }).join('') + '</div>');
    return html;
  }

  /* ---------- 阅读 ---------- */
  function readDetail(item, ctx) {
    if (!item) return '<div class="card"><p>阅读材料不存在</p></div>';
    ctx = ctx || 'read-' + item.id;
    var kindName = { careful: '仔细阅读', matching: '长篇阅读匹配', cloze: '选词填空' }[item.kind];
    var limit = { careful: 9, matching: 12, cloze: 8 }[item.kind];
    var html = '';
    html += '<div class="page-head"><h1>' + kindName + ' · ' + U.esc(item.title) + '</h1>' +
      '<p class="muted">话题：' + U.esc(item.topic) + ' · 建议限时 ' + limit + ' 分钟 · ' + item.qs.length + ' 题</p></div>';
    html += section('计时器',
      '<div class="timer-row"><div class="timer" data-timer>--:--</div>' +
      '<button class="btn primary" data-timer-min="' + limit + '">开始 ' + limit + ' 分钟计时</button>' +
      '<button class="btn ghost" data-timer-min="' + (limit + 3) + '">宽松 ' + (limit + 3) + ' 分钟</button></div>');
    html += section('文章',
      '<div class="passage">' + item.passage.split('\n\n').map(function (p) { return '<p>' + U.esc(p) + '</p>'; }).join('') + '</div>');
    html += section('题目（' + item.qs.length + ' 题）', answerCard(item.qs, ctx, {
      hint: item.kind === 'matching' ? '匹配题先看题干关键词，再回文定位；一段可能对应多题' : '每题都要在原文找到定位句'
    }));
    html += section('生词与表达',
      '<div class="table-wrap"><table class="table"><tbody>' + (item.words || []).map(function (w) {
        return '<tr><td><b>' + U.esc(w[0]) + '</b>' + speakBtn(w[0]) + '</td><td>' + U.esc(w[1]) + '</td></tr>';
      }).join('') + '</tbody></table></div>');
    return html;
  }

  /* ---------- 词汇库页面 ---------- */
  function vocabLib() {
    var st = Store.get();
    var all = Libs.allVocab();
    var mastered = Store.masteredWords();
    var s = Libs.stats();
    var html = '<div class="page-head"><h1>词汇库</h1>' +
      '<p class="muted">共 ' + all.length + ' 词（四级全量词表 ' + s.vocab + ' 词，其中 ' + s.withExample +
      ' 个带例句；自定义 ' + st.customWords.length + ' 个）· 已标记掌握 ' + mastered +
      ' 个 · 也可以导入自己在背的词表</p></div>';
    html += '<section class="card"><div class="card-head"><h2>查询与筛选</h2></div>' +
      '<div class="row gap"><input class="input" data-search placeholder="输入英文单词或中文释义搜索" style="max-width:320px">' +
      '<div class="seg" data-seg="wordFilter"><button class="active" data-f="all">全部</button><button data-f="new">未学</button>' +
      '<button data-f="fuzzy">模糊</button><button data-f="known">已掌握</button></div>' +
      '<button class="btn ghost small" data-review-weak>只复习没掌握的词</button></div>' +
      '<div id="wordBody"></div></section>';
    html += '<section class="card"><div class="card-head"><h2>高频短语与同义替换</h2></div>' +
      '<div class="chips">' + Libs.phrases.slice(0, 20).map(function (p) {
        return '<span class="pill static" title="' + U.esc(p.en) + '">' + U.esc(p.p) + ' · ' + U.esc(p.zh) + '</span>';
      }).join('') + '</div>' +
      '<h3 class="sub">写作同义替换（避免重复用词）</h3>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>常见词</th><th>升级表达</th><th>例句</th></tr></thead><tbody>' +
      Libs.synonyms.map(function (s) {
        return '<tr><td><b>' + U.esc(s.w) + '</b></td><td>' + U.esc(s.alt) + '</td><td class="ex">' + U.esc(s.en) + '</td></tr>';
      }).join('') + '</tbody></table></div></section>';
    return html;
  }

  function wordTable(query, filter, limit) {
    var list = Libs.search(query);
    if (filter && filter !== 'all') {
      list = list.filter(function (w) {
        var lv = Store.wordLevel(w.w);
        if (filter === 'new') return lv === 0;
        if (filter === 'fuzzy') return lv === 1 || lv === 2;
        if (filter === 'known') return lv >= 3;
        return true;
      });
    }
    var size = limit || 80;
    var shown = list.slice(0, size);
    return '<div class="table-wrap"><table class="table words"><thead><tr><th>单词</th><th>词性</th><th>释义</th><th>例句</th><th>掌握</th></tr></thead><tbody>' +
      shown.map(function (w) {
        var lv = Store.wordLevel(w.w);
        return '<tr><td><b>' + U.esc(w.w) + '</b>' + speakBtn(w.w) + '</td><td class="pos">' + U.esc(w.pos || '') + '</td>' +
          '<td>' + U.esc(w.zh) + '</td><td class="ex">' + U.esc(w.en || '') + '<br><span class="muted">' + U.esc(w.zhEx || '') + '</span></td>' +
          '<td><button class="lvl" data-mark="' + U.esc(w.w) + '">' + ['未学', '模糊', '眼熟', '掌握'][lv] + '</button></td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="card-foot"><span class="muted small">共匹配 ' + list.length + ' 词，已显示 ' + shown.length + ' 条' +
      '（点击单词旁的喇叭可朗读，点“未学/模糊/掌握”循环标记）</span>' +
      (list.length > shown.length ? '<button class="btn small" data-more>加载更多</button>' : '') + '</div>';
  }

  /* 词汇相关的通用事件：朗读 + 掌握标记 */
  function bindWordTools(root) {
    root = root || document.getElementById('view');
    U.on(root, 'click', '[data-say]', function (e, el) {
      U.speak(el.getAttribute('data-say'), {
        rate: Store.get().settings.ttsRate, voiceName: Store.get().settings.voiceName
      });
    });
    U.on(root, 'click', '[data-mark]', function (e, el) {
      var w = el.getAttribute('data-mark');
      var lv = Store.wordLevel(w);
      Store.get().wordStat[w] = { m: (lv + 1) % 4, n: 1, t: U.todayISO() };
      Store.save();
      el.textContent = ['未学', '模糊', '眼熟', '掌握'][Store.wordLevel(w)];
    });
  }

  function bindVocabLib() {
    var state = { q: '', f: 'all', limit: 80 };
    function refresh() { U.qs('#wordBody').innerHTML = wordTable(state.q, state.f, state.limit); }
    refresh();
    var root = document.getElementById('view');
    U.on(root, 'input', '[data-search]', function (e, el) { state.q = el.value; state.limit = 80; refresh(); });
    U.on(root, 'click', '[data-seg="wordFilter"] button', function (e, el) {
      state.f = el.getAttribute('data-f');
      state.limit = 80;
      U.qsa('[data-seg="wordFilter"] button').forEach(function (b) { b.classList.toggle('active', b === el); });
      refresh();
    });
    U.on(root, 'click', '[data-more]', function () { state.limit += 80; refresh(); });
    U.on(root, 'click', '[data-review-weak]', function () {
      state.f = 'fuzzy';
      U.qsa('[data-seg="wordFilter"] button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-f') === 'fuzzy'); });
      refresh();
    });
    bindWordTools(root);
  }

  return {
    vocabPanel: vocabPanel, listenDetail: listenDetail, readDetail: readDetail,
    vocabLib: vocabLib, bindVocabLib: bindVocabLib, wordTable: wordTable,
    answers: answers, getAns: getAns, setAns: setAns, answerCard: answerCard,
    section: section, speakBtn: speakBtn, sentences: sentences,
    stopAudio: stopAudio, playList: playList, audioListOf: audioList, bindWordTools: bindWordTools
  };
})();
