/* 题库解析：把原始文本库转成结构化数据 */
window.Libs = (function () {
  function rows(raw) {
    return String(raw || '').split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
  }
  function cols(line) { return line.split('|'); }

  var vocab = rows(window.CET4_VOCAB_RAW).map(function (l, i) {
    var c = cols(l);
    return { i: i, w: c[0], pos: c[1], zh: c[2], en: c[3], zhEx: c[4] };
  });

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
      vocab: vocab.length, phrases: phrases.length, synonyms: synonyms.length,
      listening: listening.length, reading: reading.length, writing: writing.length,
      translation: translation.length, grammar: grammar.length, skills: skills.length
    };
  }

  return { vocab: vocab, phrases: phrases, synonyms: synonyms, listening: listening,
    reading: reading, writing: writing, translation: translation, grammar: grammar,
    skills: skills, exam: exam, byId: byId, pick: pick, findWord: findWord,
    allVocab: allVocab, search: search, stats: stats };
})();
