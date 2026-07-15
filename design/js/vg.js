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
