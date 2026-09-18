/* 题库解析：把原始文本库转成结构化数据 */
window.Libs = (function () {
  function rows(raw) {
    return String(raw || '').split('\n').map(function (l) { return l.trim(); })
      .filter(function (l) { return /^[A-Za-z][A-Za-z'\- ]*\|/.test(l); });
  }
  function cols(line) { return line.split('|'); }

  /* 核心词表（每词都有例句）与全量词表（含高频词例句）合并：
     全量词表决定顺序（按首字母交叉排列，便于每天摊到不同字母），
     同一个词若核心表里有更完整的例句，则用核心表的版本。 */
  function toWord(l, i) {
    var c = cols(l);
    return { i: i, w: c[0], pos: c[1] || '', zh: c[2] || '', en: c[3] || '', zhEx: c[4] || '' };
  }

  var core = rows(window.CET4_VOCAB_RAW).map(toWord);
  var coreMap = {};
  core.forEach(function (w) { coreMap[w.w] = w; });

  var full = window.CET4_VOCAB_FULL_RAW ? rows(window.CET4_VOCAB_FULL_RAW).map(toWord) : [];
  var seen = {}, vocab = [];
  full.forEach(function (w) {
    if (seen[w.w]) return;
    seen[w.w] = 1;
    var c = coreMap[w.w];
    if (c) {
      /* 核心表补充例句 */
      if (!w.en && c.en) { w.en = c.en; w.zhEx = c.zhEx; }
    }
    vocab.push(w);
  });
  core.forEach(function (w) {
    if (!seen[w.w]) { seen[w.w] = 1; vocab.push(w); }
  });
  vocab.forEach(function (w, i) { w.i = i; });

  var withExample = vocab.filter(function (w) { return !!w.en; }).length;

  var phrases = rows(window.CET4_PHRASE_RAW).map(function (l) {
    var c = cols(l);
    return { p: c[0], zh: c[1], en: c[2] };
  });

  var synonyms = rows(window.CET4_SYNONYM_RAW).map(function (l) {
    var c = cols(l);
    return { w: c[0], alt: c[1], en: c[2] };
  });

  var listening = window.CET4_LISTENING || [];
  var reading = window.CET4_READING || [];
  var writing = window.CET4_WRITING || [];
  var translation = window.CET4_TRANSLATION || [];
  var grammar = window.CET4_GRAMMAR || [];
  var skills = window.CET4_SKILLS || [];
  var exam = window.CET4_EXAM || {};

  function byId(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function pick(list, n) { return list[((n % list.length) + list.length) % list.length]; }
  function findWord(w) { return vocab.filter(function (x) { return x.w === w; })[0]; }

  function customWords() {
    return Store.get().customWords.map(function (x, i) {
      return { i: 100000 + i, w: x.w, pos: x.pos || '', zh: x.zh || '', en: x.en || '', zhEx: x.zhEx || '' };
    });
  }

  function allVocab() {
    return vocab.concat(customWords());
  }

  function search(q) {
    q = String(q || '').trim().toLowerCase();
    var list = allVocab();
    if (!q) return list;
    return list.filter(function (x) {
      return x.w.toLowerCase().indexOf(q) >= 0 || (x.zh || '').indexOf(q) >= 0;
    });
  }

  function stats() {
    return {
      vocab: vocab.length, core: core.length, withExample: withExample,
      phrases: phrases.length, synonyms: synonyms.length,
      listening: listening.length, reading: reading.length, writing: writing.length,
      translation: translation.length, grammar: grammar.length, skills: skills.length
    };
  }

  return { vocab: vocab, core: core, phrases: phrases, synonyms: synonyms, listening: listening,
    reading: reading, writing: writing, translation: translation, grammar: grammar,
    skills: skills, exam: exam, byId: byId, pick: pick, findWord: findWord,
    allVocab: allVocab, search: search, stats: stats };
})();
