/* ==========================================================================
   Taza Khamar — App shell: header, footer, nav, location, lang toggle
   ========================================================================== */

function logoMarkSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="18.3" cy="4.7" r="2.1" fill="#F0932B" stroke="white" stroke-width="0.6"/>
  </svg>`;
}

const LOC_KEY = "tk_location";

function getLocation() {
  return localStorage.getItem(LOC_KEY) || "Dhaka";
}
function setLocation(loc) {
  localStorage.setItem(LOC_KEY, loc);
  document.querySelectorAll(".js-current-loc").forEach((el) => (el.textContent = loc));
}

function catColorClass(catId) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  return cat ? cat.color : "primary";
}

function mediaBg(colorClass) {
  const map = {
    primary: "background:var(--color-primary-light); color:var(--color-primary);",
    accent: "background:var(--color-accent-light); color:var(--color-accent-dark);",
    secondary: "background:var(--color-secondary-light); color:var(--color-secondary);",
  };
  return map[colorClass] || map.primary;
}

function starRow(rating) {
  const full = Math.round(rating);
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += `<span style="opacity:${i < full ? 1 : 0.25}">${icon("star")}</span>`;
  }
  return `<span class="stars">${out}</span>`;
}

function avatarColor(name) {
  const colors = ["var(--color-primary)", "var(--color-accent)", "var(--color-secondary)", "var(--color-primary-dark)"];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

/* ---------------- Header ---------------- */

function headerTemplate(active) {
  const navItems = [
    { key: "home", href: "index.html", label: "nav.home" },
    { key: "shop", href: "shop.html", label: "nav.shop" },
    { key: "farmers", href: "farmers.html", label: "nav.farmers" },
    { key: "guides", href: "guides.html", label: "nav.guides" },
    { key: "contact", href: "contact.html", label: "nav.contact" },
  ];
  const navLinks = (cls) =>
    navItems
      .map(
        (n) =>
          `<a href="${n.href}" class="${n.key === active ? "active" : ""}" data-i18n="${n.label}">${t(n.label)}</a>`
      )
      .join("");

  return `
  <div class="topbar">
    <div class="container">
      <div class="topbar__links">
        <span class="topbar__loc"><span>${icon("pin")}</span><span data-i18n="topbar.deliverTo">${t("topbar.deliverTo")}:</span> <strong class="js-current-loc">${getLocation()}</strong></span>
      </div>
      <div class="topbar__links">
        <a href="account.html" data-i18n="topbar.track">${t("topbar.track")}</a>
        <a href="contact.html" data-i18n="topbar.help">${t("topbar.help")}</a>
        <a href="https://wa.me/8801700000000" target="_blank" rel="noopener">${icon("whatsapp")} <span data-i18n="topbar.whatsapp">${t("topbar.whatsapp")}</span></a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo">
        <span class="logo__mark">${logoMarkSVG()}</span>
        <span>Taza Khamar<span class="logo__bn" data-i18n="brand.tag">${t("brand.tag")}</span></span>
      </a>
      <nav class="main-nav">
        <ul class="main-nav__list">${navLinks()}</ul>
      </nav>
      <div class="header-actions">
        <div class="lang-toggle">
          <button data-lang="en" class="${getLang() === "en" ? "active" : ""}">EN</button>
          <button data-lang="bn" class="${getLang() === "bn" ? "active" : ""}">বাং</button>
        </div>
        <a href="login.html" class="btn-icon" aria-label="Account">${icon("user")}</a>
        <a href="cart.html" class="btn-icon cart-btn" aria-label="Cart">${icon("cart")}<span class="cart-count" style="display:none">0</span></a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">${icon("menu")}</button>
      </div>
    </div>
  </header>
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="mobile-drawer__scrim" data-close></div>
    <div class="mobile-drawer__panel">
      <div class="mobile-drawer__head">
        <a href="index.html" class="logo"><span class="logo__mark">${logoMarkSVG()}</span><span>Taza Khamar</span></a>
        <button class="btn-icon" data-close aria-label="Close">${icon("close")}</button>
      </div>
      <ul class="mobile-drawer__list">${navLinks()}</ul>
      <div class="lang-toggle" style="align-self:flex-start">
        <button data-lang="en" class="${getLang() === "en" ? "active" : ""}">EN</button>
        <button data-lang="bn" class="${getLang() === "bn" ? "active" : ""}">বাং</button>
      </div>
      <a href="login.html" class="btn btn-outline btn-block" data-i18n="nav.login">${t("nav.login")}</a>
    </div>
  </div>`;
}

function footerTemplate() {
  return `
  <footer class="site-footer">
  <div class="footer-top">
    <div class="container footer-grid">
      <div class="footer-about">
        <a href="index.html" class="logo" style="color:#fff"><span class="logo__mark">${logoMarkSVG()}</span><span>Taza Khamar</span></a>
        <p data-i18n="footer.about">${t("footer.about")}</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">${icon("facebook")}</a>
          <a href="#" aria-label="Instagram">${icon("instagram")}</a>
          <a href="#" aria-label="LinkedIn">${icon("linkedin")}</a>
        </div>
      </div>
      <div>
        <h4 data-i18n="footer.shop">${t("footer.shop")}</h4>
        <ul>
          <li><a href="shop.html?cat=fish">Fish</a></li>
          <li><a href="shop.html?cat=meat">Meat</a></li>
          <li><a href="shop.html?cat=poultry">Poultry & Eggs</a></li>
          <li><a href="shop.html?cat=vegetables">Vegetables</a></li>
          <li><a href="shop.html?cat=fruits">Fruits</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.company">${t("footer.company")}</h4>
        <ul>
          <li><a href="farmers.html" data-i18n="footer.farmers">${t("footer.farmers")}</a></li>
          <li><a href="guides.html" data-i18n="footer.guides">${t("footer.guides")}</a></li>
          <li><a href="contact.html" data-i18n="footer.contact">${t("footer.contact")}</a></li>
          <li><a href="#" data-i18n="footer.careers">${t("footer.careers")}</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.support">${t("footer.support")}</h4>
        <ul>
          <li><a href="contact.html" data-i18n="footer.faq">${t("footer.faq")}</a></li>
          <li><a href="#" data-i18n="footer.shipping">${t("footer.shipping")}</a></li>
          <li><a href="#" data-i18n="footer.returns">${t("footer.returns")}</a></li>
          <li><a href="#" data-i18n="footer.terms">${t("footer.terms")}</a></li>
          <li><a href="#" data-i18n="footer.privacy">${t("footer.privacy")}</a></li>
        </ul>
        <div class="footer-payments">
          <span>bKash</span><span>Nagad</span><span>Rocket</span><span data-i18n="checkout.cod">${t("checkout.cod")}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; 2026 Taza Khamar. <span data-i18n="footer.rights">${t("footer.rights")}</span></span>
    <span data-i18n="footer.madein">${t("footer.madein")}</span>
  </div>
  </footer>`;
}

function mountShell() {
  const active = document.body.dataset.page || "";
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = headerTemplate(active);
  if (footerMount) footerMount.innerHTML = footerTemplate();

  // WhatsApp float
  const wa = document.createElement("a");
  wa.href = "https://wa.me/8801700000000";
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.className = "whatsapp-float";
  wa.setAttribute("aria-label", "Chat on WhatsApp");
  wa.innerHTML = icon("whatsapp");
  document.body.appendChild(wa);

  wireHeaderEvents();
  updateCartBadge();
  applyI18n();
}

function wireHeaderEvents() {
  const navToggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  if (navToggle && drawer) {
    navToggle.addEventListener("click", () => drawer.classList.add("open"));
    drawer.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", () => drawer.classList.remove("open")));
  }
  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
}

document.addEventListener("tk:langchange", () => {
  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === getLang());
  });
});

function wireAccordions(root = document) {
  root.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      root.querySelectorAll(".accordion-item").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setLocation(getLocation());
  mountShell();
});
