/* ============================================================
   STEM FEST — main.js
   Theme toggle and section switching.
   ============================================================ */

/* ---------- theme ---------- */
(function () {
  var root = document.documentElement;
  var btn  = document.getElementById('themeBtn');
  var meta = document.querySelector('meta[name="theme-color"]');

  function apply(mode) {
    root.setAttribute('data-theme', mode);
    if (meta) { meta.setAttribute('content', mode === 'light' ? '#FFFFFF' : '#16181D'); }
    try { localStorage.setItem('sf-theme', mode); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('sf-theme'); } catch (e) {}

  if (saved === 'light' || saved === 'dark') {
    apply(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    apply('light');
  }

  btn.addEventListener('click', function () {
    apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
})();

/* ---------- section switching ---------- */
(function () {
  var links = document.querySelectorAll('[data-panel]');
  var jumps = document.querySelectorAll('[data-goto]');
  var views = document.querySelectorAll('.view');
  var valid = {};
  views.forEach(function (v) { valid[v.id] = true; });

  function show(id, push) {
    if (!valid[id]) { id = 'home'; }
    links.forEach(function (l) { l.setAttribute('aria-selected', String(l.dataset.panel === id)); });
    views.forEach(function (v) { v.hidden = (v.id !== id); });
    window.scrollTo(0, 0);
    if (id === 'register' && typeof Tally !== 'undefined') { Tally.loadEmbeds(); }
    if (push && window.history && history.replaceState) { history.replaceState(null, '', '#' + id); }
  }

  links.forEach(function (l) { l.addEventListener('click', function () { show(l.dataset.panel, true); }); });
  jumps.forEach(function (j) {
    j.addEventListener('click', function (e) { e.preventDefault(); show(j.dataset.goto, true); });
  });

  var start = (window.location.hash || '').replace('#', '');
  if (start && valid[start]) { show(start, false); }
  window.addEventListener('hashchange', function () {
    var h = (window.location.hash || '').replace('#', '');
    if (h && valid[h]) { show(h, false); }
  });
})();