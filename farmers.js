(() => {
  const buttons = [...document.querySelectorAll('[data-region]')];
  const cards = [...document.querySelectorAll('[data-farmer-region]')];
  const status = document.getElementById('network-status');
  buttons.forEach((button) => button.addEventListener('click', () => {
    const region = button.dataset.region;
    buttons.forEach((item) => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    let visible = 0;
    cards.forEach((card) => { const show = region === 'all' || card.dataset.farmerRegion === region; card.hidden = !show; if (show) visible += 1; });
    status.textContent = document.documentElement.lang === 'bn' ? `${visible} জন উৎপাদক দেখানো হচ্ছে` : `Showing ${visible} food producers`;
  }));
})();
