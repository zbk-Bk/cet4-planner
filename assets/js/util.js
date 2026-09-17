/* 通用工具：日期、DOM、TTS 朗读、计时器、提示 */
window.U = (function () {
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function toISO(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function parseISO(s) {
    var p = String(s).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function addDays(d, n) {
    var x = new Date(d.getTime());
    x.setDate(x.getDate() + n);
    return x;
  }

  function diffDays(a, b) {
    var x = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    var y = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((y - x) / 86400000);
  }

  function todayISO() { return toISO(new Date()); }

  var WD = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  function weekday(d) { return WD[d.getDay()]; }

  function fmtCN(iso) {
    var d = parseISO(iso);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function on(root, evt, sel, fn) {
    (root || document).addEventListener(evt, function (e) {
      var t = e.target.closest(sel);
      if (t && (root || document).contains(t)) fn(e, t);
    });
  }

  function shuffle(arr, seed) {
    var a = arr.slice(), s = seed || 1;
    for (var i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      var j = Math.floor((s / 233280) * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- 语音朗读（TTS） ---------- */
  var voices = [];
  function loadVoices(cb) {
    if (!('speechSynthesis' in window)) return cb([]);
    voices = window.speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
    if (!voices.length) {
      window.speechSynthesis.onvoiceschanged = function () {
        voices = window.speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
        cb(voices);
      };
    }
    cb(voices);
  }

  function speak(text, opts) {
    if (!('speechSynthesis' in window)) { toast('当前浏览器不支持语音朗读，请用 Chrome / Edge / Safari 打开'); return null; }
    opts = opts || {};
    try { window.speechSynthesis.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang || 'en-US';
    u.rate = opts.rate || 0.95;
    u.pitch = 1;
    var list = window.speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
    if (opts.voiceName) {
      var m = list.filter(function (v) { return v.name === opts.voiceName; })[0];
      if (m) u.voice = m;
    } else {
      var prefer = list.filter(function (v) { return /US|United States/i.test(v.lang + v.name); });
      if (prefer.length) u.voice = prefer[0];
      else if (list.length) u.voice = list[0];
    }
    if (opts.onend) u.onend = opts.onend;
    window.speechSynthesis.speak(u);
    return u;
  }

  function stopSpeak() {
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  function enVoices() {
    if (!('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
  }

  /* ---------- 计时器 ---------- */
  var timerHandle = null;
  function startTimer(el, seconds, onDone) {
    stopTimer();
    var left = seconds, total = seconds;
    function tick() {
      if (!el || !document.body.contains(el)) { stopTimer(); return; }
      var m = Math.floor(left / 60), s = left % 60;
      el.textContent = pad(m) + ':' + pad(s);
      el.style.setProperty('--p', (100 * (total - left) / total) + '%');
      if (el.dataset) el.setAttribute('data-left', left);
      if (left <= 0) {
        stopTimer();
        el.classList.add('is-over');
        if (onDone) onDone();
        return;
      }
      left--;
    }
    tick();
    timerHandle = setInterval(tick, 1000);
    return { stop: stopTimer };
  }

  function stopTimer() {
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
  }

  /* ---------- 提示 ---------- */
  function toast(msg, ms) {
    var box = document.getElementById('toast');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toast';
      box.className = 'toast';
      document.body.appendChild(box);
    }
    box.textContent = msg;
    box.classList.add('show');
    clearTimeout(box._t);
    box._t = setTimeout(function () { box.classList.remove('show'); }, ms || 2200);
  }

  function confirmDialog(msg, okText, cb) {
    var wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.innerHTML = '<div class="modal small"><div class="modal-body"><p>' + esc(msg) + '</p>' +
      '<div class="row gap end"><button class="btn ghost" data-x>取消</button>' +
      '<button class="btn danger" data-ok>' + esc(okText || '确定') + '</button></div></div></div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) {
      if (e.target === wrap || e.target.hasAttribute('data-x')) wrap.remove();
      if (e.target.hasAttribute('data-ok')) { wrap.remove(); cb(); }
    });
  }

  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || 'application/json;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; });
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.remove();
    return Promise.resolve(ok);
  }

  function bytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(2) + ' MB';
  }

  return { pad: pad, toISO: toISO, parseISO: parseISO, addDays: addDays, diffDays: diffDays,
    todayISO: todayISO, weekday: weekday, fmtCN: fmtCN, esc: esc, qs: qs, qsa: qsa, on: on,
    shuffle: shuffle, speak: speak, stopSpeak: stopSpeak, enVoices: enVoices, loadVoices: loadVoices,
    startTimer: startTimer, stopTimer: stopTimer, toast: toast, confirm: confirmDialog,
    download: download, copy: copy, bytes: bytes };
})();
