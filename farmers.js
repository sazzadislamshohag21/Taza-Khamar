(() => {
  const buttons = [...document.querySelectorAll('[data-region]')];
  const cards = [...document.querySelectorAll('[data-farmer-region]')];
  const status = document.getElementById('network-status');
  const search = document.getElementById('farmer-search');
  const produce = document.getElementById('farmer-produce');
  const empty = document.getElementById('network-empty');
  if (!search || !produce || !status) return;
  let region = 'all';
  const index = new Map(cards.map(card => [card, [card.textContent, ...[...card.querySelectorAll('[data-bn]')].map(el => el.dataset.bn)].join(' ').normalize('NFKC').toLocaleLowerCase()]));
  function render(animate = false) {
    const query = search.value.trim().normalize('NFKC').toLocaleLowerCase();
    let count = 0;
    buttons.forEach(button => {
      const active = button.dataset.region === region;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      const show = (region === 'all' || card.dataset.farmerRegion === region) && (produce.value === 'all' || card.dataset.farmerProduce === produce.value) && query.split(/\s+/).every(word => index.get(card).includes(word));
      card.hidden = !show;
      if (show) {
        count++;
        if (animate && card.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          card.animate([{ opacity: .35, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
        }
      }
    });
    empty.hidden = count !== 0;
    status.textContent = document.documentElement.lang === 'bn' ? `${cards.length} জনের মধ্যে ${count} জন উৎপাদক দেখানো হচ্ছে` : `${count} of ${cards.length} producers to meet`;
  }
  buttons.forEach(button => button.addEventListener('click', () => { region = button.dataset.region; render(true); }));
  search.addEventListener('input', () => render());
  produce.addEventListener('change', () => render(true));
  document.getElementById('farmer-reset').addEventListener('click', () => { region = 'all'; search.value = ''; produce.value = 'all'; render(true); search.focus(); });
  new MutationObserver(() => render()).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render();
})();
