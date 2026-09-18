/* 进度存储：localStorage 自动保存 + 导入导出 + 同步码 + 可选云同步 */
window.Store = (function () {
  var KEY = 'cet4.progress.v1';
  var listeners = [];
  var state;

  function defaults() {
    var t = U.todayISO();
    return {
      v: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      planStart: t,
      examDate: U.toISO(t ? U.addDays(U.parseISO(t), 59) : new Date()),
      dailyMinutes: 120,
      targetScore: 500,
      name: '',
      done: {},
      wordStat: {},
      hours: {},
      logs: [],
      mocks: [],
      aiGrades: [],
      notes: {},
      customWords: [],
      dayTimes: {},
      answers: {},
      settings: {
        theme: 'auto', ttsRate: 0.95, voiceName: '',
        ai: { key: '', model: 'deepseek-chat', base: 'https://api.deepseek.com' },
        cloud: {
          provider: 'off', owner: 'zbk-Bk', repo: 'cet4-progress', path: 'progress.json',
          url: '', key: '', token: '', auto: false, lastSyncAt: '', lastError: ''
        }
      }
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      var s = JSON.parse(raw);
      var d = defaults();
      for (var k in d) if (!(k in s)) s[k] = d[k];
      s.settings = s.settings || d.settings;
      s.settings.cloud = Object.assign({}, d.settings.cloud, s.settings.cloud || {});
      s.settings.ai = Object.assign({}, d.settings.ai, s.settings.ai || {});
      return s;
    } catch (e) {
      console.warn('读取本地进度失败', e);
      return defaults();
    }
  }

  function persist() {
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      U.toast('本地存储写入失败，请导出备份以防丢失');
    }
  }

  function get() { return state; }

  function save(opts) {
    persist();
    if (!(opts && opts.silent)) emit();
    if (!(opts && opts.noCloud)) scheduleCloud();
  }

  function emit() { listeners.forEach(function (f) { try { f(state); } catch (e) {} }); }
  function subscribe(f) { listeners.push(f); }

  /* ---------- 任务与练习记录 ---------- */
  function isDone(day, idx) { return !!(state.done[day + '-' + idx]); }
  function toggleTask(day, idx, minutes) {
    var k = day + '-' + idx;
    if (state.done[k]) delete state.done[k];
    else {
      state.done[k] = { at: new Date().toISOString(), min: minutes || 0 };
      addHours(day, minutes || 0);
    }
    save();
  }
  function setTask(day, idx, val, minutes) {
    var k = day + '-' + idx;
    if (val) { state.done[k] = { at: new Date().toISOString(), min: minutes || 0 }; addHours(day, minutes || 0); }
    else delete state.done[k];
    save();
  }
  function addHours(day, minutes) {
    if (!minutes) return;
    var iso = dayISO(day);
    state.hours[iso] = (state.hours[iso] || 0) + minutes;
  }
  function dayISO(dayIdx) {
    var d = U.addDays(U.parseISO(state.planStart), dayIdx - 1);
    return U.toISO(d);
  }
  function doneCountForDay(day, total) {
    var n = 0;
    for (var i = 0; i < total; i++) if (state.done[day + '-' + i]) n++;
    return n;
  }

  /* ---------- 词汇掌握 ---------- */
  function wordLevel(w) { var s = state.wordStat[w]; return s ? s.m : 0; }
  function markWord(w, delta) {
    var s = state.wordStat[w] || { m: 0, n: 0, t: '' };
    s.m = Math.max(0, Math.min(3, s.m + delta));
    s.n++;
    s.t = U.todayISO();
    state.wordStat[w] = s;
    save();
  }
  function masteredWords() {
    return Object.keys(state.wordStat).filter(function (w) { return state.wordStat[w].m >= 3; }).length;
  }

  function log(entry) {
    state.logs.push(Object.assign({ at: new Date().toISOString() }, entry));
    if (state.logs.length > 800) state.logs = state.logs.slice(-800);
    save({ silent: true, noCloud: true });
  }

  function addMock(m) {
    state.mocks.push(Object.assign({ at: new Date().toISOString() }, m));
    save();
  }

  function addAiGrade(g) {
    state.aiGrades.unshift(Object.assign({ at: new Date().toISOString() }, g));
    if (state.aiGrades.length > 100) state.aiGrades = state.aiGrades.slice(0, 100);
    save();
  }

  function setNote(day, text) {
    if (text) state.notes[day] = text; else delete state.notes[day];
    save({ silent: true });
  }

  /* ---------- 连续打卡 ---------- */
  function streak() {
    var days = {};
    Object.keys(state.done).forEach(function (k) {
      var d = +k.split('-')[0];
      days[d] = true;
    });
    var n = 0, i = 1;
    var total = totalDays();
    while (i <= total && days[i]) { n++; i++; }
    return n;
  }

  function totalDays() {
    return Math.max(1, U.diffDays(U.parseISO(state.planStart), U.parseISO(state.examDate)) + 1);
  }

  function todayIndex() {
    var i = U.diffDays(U.parseISO(state.planStart), new Date()) + 1;
    return Math.max(1, Math.min(totalDays(), i));
  }

  function progress() {
    var total = 0, done = 0;
    for (var k in state.done) { if (state.done[k]) done++; }
    total = state._taskTotal || Math.max(done, 1);
    return { done: done, total: total };
  }

  /* ---------- 同步：导出 / 导入 / 同步码 ---------- */
  function compact() {
    var doneKeys = Object.keys(state.done);
    var words = Object.keys(state.wordStat).filter(function (w) { return state.wordStat[w].m > 0; });
    return {
      t: 1,
      p: state.planStart,
      e: state.examDate,
      m: state.dailyMinutes,
      g: state.targetScore,
      n: state.name,
      d: doneKeys,
      w: words.map(function (w) { return w + ':' + state.wordStat[w].m; }),
      h: state.hours,
      l: state.logs.slice(-200).map(function (x) { return [x.at, x.module || '', x.minutes || 0, x.score || 0, x.total || 0]; }),
      k: state.mocks.map(function (x) { return [x.at, x.writing || 0, x.listening || 0, x.reading || 0, x.translation || 0]; }),
      b: state.notes,
      a: state.aiGrades.slice(0, 40).map(function (x) {
        return [x.at, x.topic || '', x.total || 0, x.detail || {}, x.comment || ''];
      }),
      s: state.settings ? { theme: state.settings.theme, ttsRate: state.settings.ttsRate } : {}
    };
  }

  function expand(c) {
    var s = defaults();
    s.planStart = c.p || s.planStart;
    s.examDate = c.e || s.examDate;
    s.dailyMinutes = c.m || s.dailyMinutes;
    s.targetScore = c.g || s.targetScore;
    s.name = c.n || '';
    (c.d || []).forEach(function (k) { s.done[k] = { at: new Date().toISOString(), min: 0 }; });
    (c.w || []).forEach(function (pair) {
      var i = pair.lastIndexOf(':');
      s.wordStat[pair.slice(0, i)] = { m: +pair.slice(i + 1) || 0, n: 1, t: '' };
    });
    s.hours = c.h || {};
    s.logs = (c.l || []).map(function (a) { return { at: a[0], module: a[1], minutes: a[2], score: a[3], total: a[4] }; });
    s.mocks = (c.k || []).map(function (a) { return { at: a[0], writing: a[1], listening: a[2], reading: a[3], translation: a[4] }; });
    s.notes = c.b || {};
    s.aiGrades = (c.a || []).map(function (a) {
      return { at: a[0], topic: a[1], total: a[2], detail: a[3] || {}, comment: a[4] || '' };
    });
    if (c.s && c.s.theme) s.settings.theme = c.s.theme;
    if (c.s && c.s.ttsRate) s.settings.ttsRate = c.s.ttsRate;
    return s;
  }

  function exportJSON() { return JSON.stringify(state, null, 2); }

  function importJSON(text) {
    var obj = JSON.parse(text);
    if (obj.t && obj.d && !obj.planStart) { replace(expand(obj)); return true; }
    if (!obj.planStart) throw new Error('文件格式不正确');
    replace(Object.assign(defaults(), obj));
    return true;
  }

  function makeSyncCode() {
    var payload = JSON.stringify(compact());
    var b64 = btoa(unescape(encodeURIComponent(payload)));
    var sum = 0;
    for (var i = 0; i < b64.length; i++) sum = (sum * 31 + b64.charCodeAt(i)) % 65536;
    return 'CET4-' + sum.toString(16).toUpperCase().padStart(4, '0') + '-' + b64;
  }

  function readSyncCode(code) {
    var s = String(code).trim().replace(/\s+/g, '');
    var m = /^CET4-([0-9A-F]{4})-(.+)$/i.exec(s);
    var b64 = m ? m[2] : s;
    var payload = decodeURIComponent(escape(atob(b64)));
    var obj = JSON.parse(payload);
    if (m) {
      var sum = 0;
      for (var i = 0; i < b64.length; i++) sum = (sum * 31 + b64.charCodeAt(i)) % 65536;
      if (sum.toString(16).toUpperCase().padStart(4, '0') !== m[1].toUpperCase()) throw new Error('校验码不符，同步码可能被截断');
    }
    return obj;
  }

  function applySyncCode(code, mode) {
    var obj = readSyncCode(code);
    if (mode === 'merge') replace(mergeState(state, expand(obj)));
    else replace(expand(obj));
    return true;
  }

  function mergeState(a, b) {
    var out = JSON.parse(JSON.stringify(a));
    Object.keys(b.done).forEach(function (k) { if (!out.done[k]) out.done[k] = b.done[k]; });
    Object.keys(b.wordStat).forEach(function (w) {
      var cur = out.wordStat[w];
      if (!cur || b.wordStat[w].m > cur.m) out.wordStat[w] = b.wordStat[w];
    });
    Object.keys(b.hours).forEach(function (d) { out.hours[d] = Math.max(out.hours[d] || 0, b.hours[d]); });
    var seen = {};
    out.logs.forEach(function (x) { seen[x.at + '|' + x.module] = 1; });
    b.logs.forEach(function (x) { if (!seen[x.at + '|' + x.module]) out.logs.push(x); });
    seen = {};
    out.mocks.forEach(function (x) { seen[x.at] = 1; });
    b.mocks.forEach(function (x) { if (!seen[x.at]) out.mocks.push(x); });
    Object.assign(out.notes, b.notes);
    out.logs.sort(function (x, y) { return x.at < y.at ? -1 : 1; });
    out.mocks.sort(function (x, y) { return x.at < y.at ? -1 : 1; });
    var seenAi = {};
    out.aiGrades.forEach(function (x) { seenAi[x.at + '|' + x.topic] = 1; });
    b.aiGrades.forEach(function (x) { if (!seenAi[x.at + '|' + x.topic]) out.aiGrades.push(x); });
    out.aiGrades.sort(function (x, y) { return x.at < y.at ? 1 : -1; });
    return out;
  }

  function replace(s) {
    var cloud = state ? state.settings.cloud : null;
    state = s;
    if (cloud) state.settings.cloud = Object.assign(state.settings.cloud || {}, cloud);
    persist();
    emit();
  }

  function reset() {
    var cloud = state.settings.cloud;
    state = defaults();
    state.settings.cloud = cloud;
    persist();
    emit();
  }

  /* ---------- 云同步：GitHub 私有仓库 / 自定义 REST ---------- */
  var cloudTimer = null;

  function cloudReady(c) {
    c = c || state.settings.cloud;
    if (!c || c.provider === 'off') return false;
    if (c.provider === 'github') return !!(c.owner && c.repo && c.token);
    return !!c.url;
  }

  function scheduleCloud() {
    var c = state.settings.cloud;
    if (!cloudReady(c) || !c.auto) return;
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(function () { pushCloud(true).catch(function () {}); }, 5000);
  }

  function b64encode(str) { return btoa(unescape(encodeURIComponent(str))); }
  function b64decode(b64) { return decodeURIComponent(escape(atob(String(b64).replace(/\s+/g, '')))); }

  function ghHeaders(token) {
    return {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    };
  }

  function ghFileUrl(c) {
    return 'https://api.github.com/repos/' + encodeURIComponent(c.owner) + '/' +
      encodeURIComponent(c.repo) + '/contents/' + encodeURIComponent(c.path || 'progress.json');
  }

  function fail(e, silent, what) {
    state.settings.cloud.lastError = what + '：' + (e && e.message ? e.message : String(e));
    persist();
    if (!silent) U.toast(state.settings.cloud.lastError);
    throw e;
  }

  function pushCloud(silent) {
    var c = state.settings.cloud;
    if (!cloudReady(c)) return Promise.reject(new Error('未配置云同步'));
    var body = JSON.stringify(compact());
    if (c.provider === 'github') {
      return fetch(ghFileUrl(c), { headers: ghHeaders(c.token) })
        .then(function (r) { return r.status === 404 ? null : r.json(); })
        .then(function (remote) {
          var payload = {
            message: 'sync: ' + new Date().toLocaleString('zh-CN'),
            content: b64encode(body)
          };
          if (remote && remote.sha) payload.sha = remote.sha;
          return fetch(ghFileUrl(c), { method: 'PUT', headers: ghHeaders(c.token), body: JSON.stringify(payload) });
        })
        .then(function (r) {
          if (!r.ok) return r.json().then(function (j) { throw new Error('HTTP ' + r.status + ' ' + (j.message || '')); });
          return r.json();
        })
        .then(function () {
          c.lastSyncAt = new Date().toISOString();
          c.lastError = '';
          persist();
          if (!silent) U.toast('已同步到云端仓库');
          return true;
        })
        .catch(function (e) { return fail(e, silent, '上传失败'); });
    }
    return fetch(c.url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: body })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return true; })
      .then(function () {
        c.lastSyncAt = new Date().toISOString();
        c.lastError = '';
        persist();
        if (!silent) U.toast('已上传到云端');
        return true;
      })
      .catch(function (e) { return fail(e, silent, '上传失败'); });
  }

  function pullCloud(silent) {
    var c = state.settings.cloud;
    if (!cloudReady(c)) return Promise.reject(new Error('未配置云同步'));
    var getter;
    if (c.provider === 'github') {
      getter = fetch(ghFileUrl(c), { headers: ghHeaders(c.token) }).then(function (r) {
        if (r.status === 404) return null;
        if (!r.ok) return r.json().then(function (j) { throw new Error('HTTP ' + r.status + ' ' + (j.message || '')); });
        return r.json().then(function (j) { return JSON.parse(b64decode(j.content)); });
      });
    } else {
      getter = fetch(c.url, { headers: { 'Accept': 'application/json' } }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function (data) { return (data && data.record) ? data.record : data; });
    }
    return getter.then(function (remote) {
      if (!remote || !remote.d) {
        c.lastSyncAt = new Date().toISOString();
        persist();
        if (!silent) U.toast('云端还没有数据，已把本机进度留作基准');
        return pushCloud(true);
      }
      var before = state.updatedAt;
      replace(mergeState(state, expand(remote)));
      c.lastSyncAt = new Date().toISOString();
      c.lastError = '';
      persist(); emit();
      if (!silent) U.toast('已从云端合并');
      if (before !== state.updatedAt && c.auto) return pushCloud(true);
      return true;
    }).catch(function (e) { return fail(e, silent, '拉取失败'); });
  }

  /* 完整同步：先拉取合并，再把合并结果推回去 */
  function syncNow(silent) {
    return pullCloud(true).then(function () { return pushCloud(silent); })
      .catch(function (e) { return pullCloud(silent); });
  }

  function testCloud(conf) {
    var c = conf || state.settings.cloud;
    if (!cloudReady(c)) return Promise.resolve({ ok: false, msg: '请先填写仓库、令牌或接口地址' });
    if (c.provider === 'github') {
      return fetch('https://api.github.com/repos/' + encodeURIComponent(c.owner) + '/' + encodeURIComponent(c.repo), {
        headers: ghHeaders(c.token)
      }).then(function (r) {
        if (r.status === 404) return { ok: false, msg: '找不到仓库 ' + c.owner + '/' + c.repo + '（检查名字，或把令牌权限给到该仓库）' };
        if (r.status === 401) return { ok: false, msg: '令牌无效或已过期' };
        if (!r.ok) return { ok: false, msg: 'HTTP ' + r.status };
        return r.json().then(function (j) {
          var canWrite = j.permissions && j.permissions.push;
          var priv = j.private ? '私有' : '公开';
          if (!canWrite) return { ok: false, msg: '仓库是' + priv + '的，但令牌没有写入权限（需要 Contents: Read and write）' };
          return { ok: true, msg: '连接正常：' + j.full_name + '（' + priv + '仓库，可读写）' };
        });
      }).catch(function (e) { return { ok: false, msg: '网络错误：' + e.message }; });
    }
    return fetch(c.url, { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return { ok: r.ok || r.status === 404, msg: r.ok ? '接口可访问' : 'HTTP ' + r.status }; })
      .catch(function (e) { return { ok: false, msg: '网络错误：' + e.message }; });
  }

  function syncStatus() {
    var c = state.settings.cloud;
    if (!cloudReady(c)) return '未开启';
    var last = c.lastSyncAt ? new Date(c.lastSyncAt).toLocaleString('zh-CN') : '尚未同步';
    return (c.auto ? '自动同步已开启 · ' : '手动同步 · ') + '上次 ' + last + (c.lastError ? '（' + c.lastError + '）' : '');
  }

  state = load();
  return { get: get, save: save, subscribe: subscribe, reset: reset, replace: replace,
    isDone: isDone, toggleTask: toggleTask, setTask: setTask, doneCountForDay: doneCountForDay,
    dayISO: dayISO, wordLevel: wordLevel, markWord: markWord, masteredWords: masteredWords,
    log: log, addMock: addMock, addAiGrade: addAiGrade, setNote: setNote, streak: streak, totalDays: totalDays,
    todayIndex: todayIndex, exportJSON: exportJSON, importJSON: importJSON,
    makeSyncCode: makeSyncCode, applySyncCode: applySyncCode, mergeState: mergeState,
    pushCloud: pushCloud, pullCloud: pullCloud, syncNow: syncNow, testCloud: testCloud,
    cloudReady: cloudReady, syncStatus: syncStatus };
})();
