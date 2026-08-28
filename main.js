/* ============================================================
   STEM FEST — main.js
   Section switching for both the desktop deck and the mobile dock.
   ============================================================ */

(function () {
  var links  = document.querySelectorAll('[data-panel]');
  var jumps  = document.querySelectorAll('[data-goto]');
  var views  = document.querySelectorAll('.view');
  var valid  = {};

  views.forEach(function (v) { valid[v.id] = true; });

  function show(id, push) {
    if (!valid[id]) { id = 'home'; }

    links.forEach(function (l) {
      l.setAttribute('aria-selected', String(l.dataset.panel === id));
    });
    views.forEach(function (v) {
      v.hidden = (v.id !== id);
    });

    window.scrollTo(0, 0);

    // the Tally iframe sits in a hidden section on load, so it needs a nudge
    if (id === 'register' && typeof Tally !== 'undefined') {
      Tally.loadEmbeds();
    }

    if (push && window.history && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  links.forEach(function (l) {
    l.addEventListener('click', function () { show(l.dataset.panel, true); });
  });

  jumps.forEach(function (j) {
    j.addEventListener('click', function (e) {
      e.preventDefault();
      show(j.dataset.goto, true);
    });
  });

  // deep links: stemfest.pages.dev/#events opens straight to Events
  var start = (window.location.hash || '').replace('#', '');
  if (start && valid[start]) { show(start, false); }

  window.addEventListener('hashchange', function () {
    var h = (window.location.hash || '').replace('#', '');
    if (h && valid[h]) { show(h, false); }
  });
})();
