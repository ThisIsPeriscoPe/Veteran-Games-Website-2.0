/* VG prototype interactions. Production equivalents are theme native:
   accordion = Elementor Accordion, tabs = TRX tabs / post filters. */

/* PROTOTYPE ONLY cache killer: stamps every local asset with the load time so
   the browser always fetches the latest file. Remove for production. */
(function () {
  var stamp = 'cb=' + Date.now();
  document.querySelectorAll('img[src^="../assets/"], video[poster^="../assets/"]').forEach(function (el) {
    if (el.poster) el.poster += (el.poster.indexOf('?') > -1 ? '&' : '?') + stamp;
    if (el.src && el.src.indexOf('/assets/') > -1) el.src += (el.src.indexOf('?') > -1 ? '&' : '?') + stamp;
  });
})();
/* PROTOTYPE ONLY gallery: builds the masonry grid, the event + team filters and the
   lightbox from assets/img/gallery/<event>-web/manifest.js.
   Production: TRX Addons / Elementor Gallery widget reading WordPress media categories,
   with the theme's own lightbox and load more. None of this ships. */
(function () {
  var host = document.getElementById('gallery');
  if (!host || !window.VG_GALLERY) return;
  var base = host.dataset.base, STEP = 60, shown = STEP;
  var f = { e: 'all', t: 'all' };
  var grid = host.querySelector('.gal'),
      count = host.querySelector('.gal-count'),
      moreWrap = host.querySelector('.gal-more'),
      more = moreWrap.querySelector('button');

  function matches(r) {
    return (f.e === 'all' || r.e === f.e) && (f.t === 'all' || (r.t || []).indexOf(f.t) > -1);
  }
  function render() {
    var list = window.VG_GALLERY.filter(matches);
    grid.innerHTML = list.slice(0, shown).map(function (r, i) {
      return '<a class="gi" href="' + base + '/large/' + r.s + '.jpg" data-i="' + i + '">' +
             '<img loading="lazy" width="' + r.w + '" height="' + r.h + '" alt="" src="' + base + '/thumb/' + r.s + '.jpg"></a>';
    }).join('');
    if (!list.length) grid.innerHTML = '<p class="gal-empty">No photos in this selection.</p>';
    count.textContent = 'Showing ' + Math.min(shown, list.length) + ' of ' + list.length + ' photos';
    moreWrap.style.display = list.length > shown ? '' : 'none';
    host._list = list;
  }
  host.querySelectorAll('.gal-row .tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.gal-row'), key = row.dataset.key;
      row.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('on'); });
      btn.classList.add('on');
      f[key] = btn.dataset.val;
      shown = STEP; render();
      host.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  more.addEventListener('click', function () { shown += STEP; render(); });

  /* lightbox */
  var box = document.createElement('div');
  box.className = 'lbx';
  box.innerHTML = '<button class="lbx-close" aria-label="Close">✕</button>' +
                  '<button class="lbx-prev" aria-label="Previous">‹</button>' +
                  '<img alt=""><button class="lbx-next" aria-label="Next">›</button>' +
                  '<p class="lbx-cap"></p>';
  document.body.appendChild(box);
  var bimg = box.querySelector('img'), bcap = box.querySelector('.lbx-cap'), at = 0;
  function show(i) {
    var list = host._list; if (!list.length) return;
    at = (i + list.length) % list.length;
    var r = list[at];
    bimg.src = base + '/large/' + r.s + '.jpg';
    bcap.textContent = r.e + (r.t && r.t.length ? ' · ' + r.t.join(', ') : '') + '  ·  ' + (at + 1) + ' / ' + list.length;
    box.classList.add('on');
  }
  grid.addEventListener('click', function (e) {
    var a = e.target.closest('.gi'); if (!a) return;
    e.preventDefault(); show(+a.dataset.i);
  });
  box.addEventListener('click', function (e) {
    if (e.target.closest('.lbx-next')) return show(at + 1);
    if (e.target.closest('.lbx-prev')) return show(at - 1);
    if (e.target === box || e.target.closest('.lbx-close')) box.classList.remove('on');
  });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('on')) return;
    if (e.key === 'Escape') box.classList.remove('on');
    if (e.key === 'ArrowRight') show(at + 1);
    if (e.key === 'ArrowLeft') show(at - 1);
  });
  render();
})();

document.addEventListener('click', function (e) {
  var q = e.target.closest('.acc-q');
  if (q) q.parentElement.classList.toggle('open');

  var t = e.target.closest('.tab');
  if (t && t.dataset.filter !== undefined) {
    var scope = t.closest('section') || document;
    scope.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('on'); });
    t.classList.add('on');
    scope.querySelectorAll('[data-cat]').forEach(function (card) {
      card.style.display = (t.dataset.filter === 'all' || card.dataset.cat === t.dataset.filter) ? '' : 'none';
    });
  }
});
