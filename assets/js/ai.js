/* 作文批改：DeepSeek 直连（按四级评分细则）+ 离线规则检查 */
window.AI = (function () {
  /* 四级写作评分标准（15 分制） */
  var RUBRIC = [
    ['14 分', '切题。表达思想清楚，文字通顺、连贯，基本上无语言错误，句式有变化。'],
    ['11-13 分', '切题。表达思想清楚，文字连贯，但有少量语言错误。'],
    ['8-10 分', '基本切题。有些地方表达思想不够清楚，文字尚连贯，语言错误较多。'],
    ['5-7 分', '基本切题。表达思想不清楚，连贯性差，有较多严重语言错误。'],
    ['2-4 分', '条理不清，思路紊乱，语言支离破碎，大部分句子有错误。'],
    ['0-1 分', '白卷，或只有几个孤立的词，或完全离题。']
  ];

  var CONNECTORS = ['however', 'moreover', 'furthermore', 'therefore', 'thus', 'meanwhile', 'besides',
    'in addition', 'what is more', 'for example', 'for instance', 'as a result', 'in short', 'in conclusion',
    'to sum up', 'on the contrary', 'in contrast', 'while', 'although', 'whereas', 'because', 'since',
    'first', 'second', 'finally', 'more importantly', 'in my view', 'as far as i am concerned'];

  var SUBORDINATORS = ['which', 'that', 'who', 'when', 'if', 'unless', 'because', 'although', 'though',
    'while', 'since', 'as', 'so that', 'even if', 'whether', 'after', 'before', 'until', 'unless'];

  function cfg() { return Store.get().settings.ai; }
  function ready() { return !!(cfg().key && cfg().key.length >= 20); }

  function countWords(text) {
    return (String(text || '').match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
  }

  function sentences(text) {
    return String(text || '').replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /* ---------------- 调用 DeepSeek ---------------- */
  function call(messages, opts) {
    var c = cfg();
    if (!ready()) return Promise.reject(new Error('还没有填写 DeepSeek API Key（设置 → 作文 AI 批改）'));
    var body = {
      model: c.model || 'deepseek-chat',
      messages: messages,
      temperature: 0.2,
      max_tokens: (opts && opts.maxTokens) || 2600,
      stream: false
    };
    if (!(opts && opts.noJson)) body.response_format = { type: 'json_object' };
    var base = (c.base || 'https://api.deepseek.com').replace(/\/+$/, '');
    return fetch(base + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + c.key },
      body: JSON.stringify(body)
    }).catch(function (e) {
      throw new Error('网络请求失败：' + e.message);
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.ok) {
          if (!j.choices || !j.choices[0]) throw new Error('返回内容为空');
          return j;
        }
        var msg = (j.error && j.error.message) || ('HTTP ' + r.status);
        if (r.status === 400 && /response_format/i.test(msg) && body.response_format) {
          /* 个别模型不支持 JSON 模式，自动去掉后重试一次 */
          delete body.response_format;
          return fetch(base + '/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + c.key },
            body: JSON.stringify(body)
          }).then(function (r2) { return r2.json(); }).then(function (j2) {
            if (!j2.choices || !j2.choices[0]) throw new Error((j2.error && j2.error.message) || '重试仍失败');
            return j2;
          });
        }
        if (r.status === 401) msg = 'API Key 无效或已过期（' + msg + '）';
        if (r.status === 402) msg = '账户余额不足（' + msg + '）';
        if (r.status === 429) msg = '请求太频繁，稍等几秒再试（' + msg + '）';
        throw new Error(msg);
      });
    });
  }

  /* ---------------- 批改提示词 ---------------- */
  var SYSTEM = [
    '你是一位有十年大学英语四级阅卷经验的老师，严格按照《全国大学英语四级考试写作评分标准》（15 分制）批改学生的作文：',
    RUBRIC.map(function (r) { return r[0] + '：' + r[1]; }).join('\n'),
    '',
    '批改要求：',
    '1) 先判断是否切题、字数是否达标（四级要求 120-180 词，明显不足要扣分并在评语里说明）。',
    '2) 逐字逐句找问题：语法、时态、主谓一致、单复数、搭配、中式英语、连接词误用、词汇重复。',
    '3) 指出问题时必须引用学生原文的原句，并给出改写后的正确表达，不要空泛点评。',
    '4) 改写一篇范文（120-180 词），保持学生原有观点和立场，只提升语言表达与结构。',
    '5) 语气像老师一样直接、具体，不要客套。',
    '',
    '只输出一个 JSON 对象，不要任何解释文字、不要 markdown 代码块，字段如下：',
    '{',
    '  "total": 整数(0-15),          // 总分',
    '  "level": "命中评分档位，如 11-13 分档",',
    '  "wordCount": 整数,            // 你统计的词数',
    '  "onTopic": true/false,',
    '  "dimensions": {              // 四个维度，分数合计等于 total',
    '    "content": {"score": 整数, "max": 6, "comment": "内容与切题度评价"},',
    '    "structure": {"score": 整数, "max": 3, "comment": "结构与连贯性评价"},',
    '    "language": {"score": 整数, "max": 4, "comment": "语法与句式评价"},',
    '    "vocabulary": {"score": 整数, "max": 2, "comment": "词汇丰富度与拼写评价"}',
    '  },',
    '  "strengths": ["写得好的地方，2-3 条"],',
    '  "problems": [{"quote": "学生原句", "issue": "问题类型与说明", "fix": "改正后的句子"}],',
    '  "vocabulary": ["建议升级的表达，如 important → vital", "...".],',
    '  "rewrite": "改写后的范文",',
    '  "nextStep": "下一次写作最该改进的一件事，一句话"',
    '}'
  ].join('\n');

  function userPrompt(item, essay) {
    return [
      '作文题目：' + (item.title || ''),
      '题目类型：' + (item.type || ''),
      '写作要求：' + (item.cn || ''),
      '提纲：' + (item.points || []).join(' / '),
      '',
      '学生作文（请批改这一篇）：',
      '"""',
      essay,
      '"""'
    ].join('\n');
  }

  function parseJSON(text) {
    var t = String(text || '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    var start = t.indexOf('{'), end = t.lastIndexOf('}');
    if (start > 0 || end < t.length - 1) t = t.slice(start, end + 1);
    return JSON.parse(t);
  }

  /* ---------------- AI 批改 ---------------- */
  function grade(essay, item) {
    var words = countWords(essay);
    if (words < 40) return Promise.reject(new Error('作文太短（' + words + ' 词），至少写 40 词再批改'));
    return call([
      { role: 'system', content: SYSTEM },
      { role: 'user', content: userPrompt(item, essay) }
    ]).then(function (res) {
      var raw = res.choices[0].message.content;
      var data;
      try { data = parseJSON(raw); }
      catch (e) { throw new Error('AI 返回的内容无法解析，请再试一次'); }
      data.at = new Date().toISOString();
      data.topic = (item && item.id) || '';
      data.title = (item && item.title) || '';
      data.essayWords = words;
      data.model = cfg().model || 'deepseek-chat';
      data.usage = res.usage || {};
      data.source = 'ai';
      Store.addAiGrade({
        at: data.at, topic: data.topic, title: data.title, total: data.total,
        detail: data.dimensions || {}, comment: data.nextStep || ''
      });
      return data;
    });
  }

  /* ---------------- 离线规则检查（无需 Key） ---------------- */
  function ruleCheck(essay, item) {
    var text = String(essay || '');
    var words = countWords(text);
    var sents = sentences(text);
    var paras = text.split(/\n\s*\n|\n(?=\s{2,})/).map(function (p) { return p.trim(); }).filter(Boolean);
    if (paras.length < 2) paras = text.split(/\n+/).map(function (p) { return p.trim(); }).filter(Boolean);
    var lower = text.toLowerCase();

    var conn = CONNECTORS.filter(function (c) { return lower.indexOf(c) >= 0; });
    var sub = SUBORDINATORS.filter(function (c) { return new RegExp('\\b' + c + '\\b').test(lower); });
    var avgLen = sents.length ? Math.round(words / sents.length) : 0;
    var tokens = (text.toLowerCase().match(/[a-z][a-z'-]*/g) || []);
    var freq = {}, repeats = [];
    tokens.forEach(function (t) {
      if (t.length < 5) return;
      freq[t] = (freq[t] || 0) + 1;
    });
    Object.keys(freq).forEach(function (t) { if (freq[t] >= 4) repeats.push(t + '×' + freq[t]); });

    var zhPunct = (text.match(/[，。、；：？！“”（）]/g) || []);
    var problems = [], good = [];
    var score = 11;

    if (words < 110) { problems.push('字数只有 ' + words + ' 词，四级要求 120-180 词，字数不足会直接扣分。'); score -= 3; }
    else if (words < 120) { problems.push('字数 ' + words + ' 词，略低于 120 词下限，建议补一个具体例子。'); score -= 1; }
    else if (words > 200) { problems.push('字数 ' + words + ' 词，超出上限，考试中可能写不完且易出错。'); score -= 1; }
    else good.push('字数 ' + words + ' 词，符合 120-180 词要求。');

    if (paras.length < 3) { problems.push('只有 ' + paras.length + ' 段，建议写成三段：现象/观点 → 论证 → 结论。'); score -= 1; }
    else good.push('共 ' + paras.length + ' 段，段落结构清楚。');

    if (conn.length < 3) { problems.push('连接词只用了 ' + (conn.length ? conn.join(', ') : '0 个') + '，段间和句间衔接不足。'); score -= 1; }
    else good.push('使用了 ' + conn.length + ' 处连接词（' + conn.slice(0, 5).join(', ') + '）。');

    if (sub.length < 2) { problems.push('从句类型偏少（' + (sub.length ? sub.join(', ') : '没有检测到') + '），句式显得单调。'); score -= 1; }
    else good.push('从句使用较丰富：' + sub.slice(0, 5).join(', ') + '。');

    if (avgLen > 0 && avgLen < 9) { problems.push('平均句长仅 ' + avgLen + ' 词，句子偏短，建议用从句或分词结构合并短句。'); score -= 1; }
    if (avgLen > 32) { problems.push('平均句长 ' + avgLen + ' 词，句子过长容易失控，注意是否有逗号粘连。'); score -= 1; }
    if (repeats.length) { problems.push('重复用词较多：' + repeats.slice(0, 6).join('、') + '，试着用同义替换。'); score -= 1; }
    if (zhPunct.length) { problems.push('出现 ' + zhPunct.length + ' 个中文标点（如' + zhPunct.slice(0, 3).join('') + '），考试中必须全部用英文标点。'); score -= 1; }
    if (/[^\n]\s{2,}[^\n]/.test(text)) { problems.push('行内出现连续多个空格，注意排版。'); }
    if (/,\s*(and|but|so|then)\s/i.test(text)) { /* 常见但不算错，忽略 */ }
    if (/\b(i|we)\s+(think|believe)\b/i.test(text) && (text.match(/\b(i|we)\s+(think|believe)\b/gi) || []).length > 2) {
      problems.push('I think / I believe 反复出现，建议换成 In my view、As far as I am concerned。'); score -= 1;
    }
    if (/\b(very|really)\s+\w+/i.test(text)) { problems.push('very / really 属口语化强调，可用 remarkably、extremely 等替换。'); }

    score = Math.max(0, Math.min(15, score));
    var level = score >= 14 ? '14 分档' : score >= 11 ? '11-13 分档' : score >= 8 ? '8-10 分档' : score >= 5 ? '5-7 分档' : '2-4 分档';

    return {
      at: new Date().toISOString(), topic: (item && item.id) || '', title: (item && item.title) || '',
      total: score, level: level, wordCount: words, source: 'rules',
      dimensions: {
        content: { score: null, max: 6, comment: '规则检查无法判断内容是否切题，请对照题目自查。' },
        structure: { score: null, max: 3, comment: paras.length + ' 段，' + (conn.length >= 3 ? '衔接较好' : '衔接偏弱') },
        language: { score: null, max: 4, comment: '平均句长 ' + avgLen + ' 词，从句 ' + sub.length + ' 种' },
        vocabulary: { score: null, max: 2, comment: '检测到重复用词 ' + repeats.length + ' 处' }
      },
      strengths: good, problems: problems.map(function (p) { return { quote: '', issue: p, fix: '' }; }),
      vocabulary: [], rewrite: '',
      nextStep: problems.length ? problems[0] : '继续保持，注意语言准确性。'
    };
  }

  function history(limit) {
    return (Store.get().aiGrades || []).slice(0, limit || 12);
  }

  return { ready: ready, grade: grade, ruleCheck: ruleCheck, history: history,
    rubric: RUBRIC, countWords: countWords, config: cfg, parseJSON: parseJSON, call: call };
})();
