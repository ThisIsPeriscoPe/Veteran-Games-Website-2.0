/* VG prototype interactions. Production equivalents are theme native:
   accordion = Elementor Accordion, tabs = TRX tabs / post filters. */
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
