/* ==========================================================================
   Taza Khamar — Home page rendering
   ========================================================================== */

const WHY_ITEMS = [
  { icon: "wallet", cls: "", tk: "f1" },
  { icon: "shield", cls: "secondary", tk: "f2" },
  { icon: "truck", cls: "accent", tk: "f3" },
  { icon: "checkCircle", cls: "", tk: "f4" },
  { icon: "cash", cls: "accent", tk: "f5" },
  { icon: "heart", cls: "secondary", tk: "f6" },
];

function renderTrustBar() {
  const items = [
    { icon: "shield", key: "trust.fresh" },
    { icon: "checkCircle", key: "trust.halal" },
    { icon: "cash", key: "trust.cod" },
    { icon: "truck", key: "trust.coldchain" },
    { icon: "heart", key: "trust.support" },
  ];
  document.getElementById("trustBar").innerHTML = items
    .map((i) => `<span class="trust-bar__item">${icon(i.icon)}<span data-i18n="${i.key}">${t(i.key)}</span></span>`)
    .join("");
}

function renderWhyGrid() {
  document.getElementById("whyGrid").innerHTML = WHY_ITEMS.map(
    (w) => `
    <div class="card why-card">
      <span class="icon-tile ${w.cls}">${icon(w.icon)}</span>
      <div><h4 data-i18n="why.${w.tk}t">${t("why." + w.tk + "t")}</h4><p data-i18n="why.${w.tk}d">${t("why." + w.tk + "d")}</p></div>
    </div>`
  ).join("");
}

function renderHeroLocation() {
  const select = document.getElementById("heroLocation");
  select.innerHTML = LOCATIONS.map((l) => `<option value="${l}" ${l === getLocation() ? "selected" : ""}>${l}</option>`).join("");
  document.getElementById("heroLocIcon").innerHTML = icon("pin");
  select.addEventListener("change", () => setLocation(select.value));
  document.getElementById("heroShopBtn").addEventListener("click", () => (window.location.href = "shop.html"));
}

function renderStoreBadges() {
  document.getElementById("storeBadges").innerHTML = `
    <span class="store-badge">${icon("play")}<span><span>GET IT ON</span><strong>Google Play</strong></span></span>
    <span class="store-badge">${icon("apple2")}<span><span>Download on the</span><strong>App Store</strong></span></span>`;
  document.getElementById("appArt").innerHTML = icon("box");
}

function renderHeroArt() {
  const mount = document.getElementById("heroArt");
  mount.style.backgroundImage = `url('${HERO_PHOTO}?auto=format&fit=crop&w=1000&q=75')`;
}

function renderHome() {
  renderTrustBar();
  renderHeroLocation();
  renderHeroArt();
  renderWhyGrid();
  renderStoreBadges();

  document.getElementById("categoryGrid").innerHTML = CATEGORIES.map(renderCategoryTile).join("");

  const featured = PRODUCTS.filter((p) => p.popular).slice(0, 8);
  document.getElementById("featuredGrid").innerHTML = featured.map(renderProductCard).join("");

  document.getElementById("farmersGrid").innerHTML = FARMERS.slice(0, 4).map(renderFarmerCard).join("");

  document.getElementById("testimonialGrid").innerHTML = TESTIMONIALS.map(renderTestimonial).join("");

  wireCardActions();

  const ctaForm = document.getElementById("ctaForm");
  if (ctaForm) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast(getLang() === "bn" ? "ধন্যবাদ! আপনি যোগ দিয়েছেন।" : "Thanks! You're on the list.");
      ctaForm.reset();
    });
  }
}

document.addEventListener("DOMContentLoaded", renderHome);
document.addEventListener("tk:langchange", renderHome);
