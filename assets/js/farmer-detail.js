/* ==========================================================================
   Taza Khamar — Farmer profile page
   ========================================================================== */

function getFarmerId() {
  return new URLSearchParams(window.location.search).get("id") || FARMERS[0].id;
}

function farmerBio(f) {
  const specialty = getLang() === "bn" ? f.specialtyBn : f.specialty;
  if (getLang() === "bn") {
    return `${f.name} ${f.district} জেলায় ${f.years} বছর ধরে কৃষিকাজ করছেন, বিশেষজ্ঞতা ${specialty}। প্রতিটি চালান সরাসরি তাঁর কাছ থেকে সংগ্রহ করে যাচাই করা হয়, যাতে আপনি ঠিক জানেন আপনার খাবার কোথা থেকে আসছে।`;
  }
  return `${f.name} has been farming in ${f.district} for ${f.years} years, specialising in ${specialty}. Every batch is sourced directly and verified by our team, so you always know exactly where your food comes from.`;
}

function renderCrumb(f) {
  document.getElementById("crumb").innerHTML = `
    <a href="index.html">${t("breadcrumb.home")}</a><span class="sep">${icon("chevronRight")}</span>
    <a href="farmers.html">${t("nav.farmers")}</a><span class="sep">${icon("chevronRight")}</span>
    <span class="current">${f.name}</span>`;
}

function renderHero(f) {
  const color = catColorClass(PRODUCTS.find((p) => p.farmerId === f.id)?.category || "fish");
  const productCount = PRODUCTS.filter((p) => p.farmerId === f.id).length;

  const cover = document.getElementById("farmerCover");
  if (f.photo) {
    cover.style.backgroundImage = `url('${f.photo}?auto=format&fit=crop&w=1200&q=75')`;
  } else {
    cover.setAttribute("style", cover.getAttribute("style") + ";" + mediaBg(color));
  }

  document.getElementById("farmerHeroCard").innerHTML = `
    <div class="farmer-hero-avatar" style="${f.photo ? `background-image:url('${f.photo}?auto=format&fit=crop&w=200&q=75')` : mediaBg(color)}"></div>
    <div class="farmer-hero-meta">
      <h1 style="font-size:var(--fs-xl)">${f.name}</h1>
      <div class="loc-row">${icon("pin")} ${f.district}, ${f.division}</div>
      <span class="badge" style="margin-top:.5rem;display:inline-flex">${getLang() === "bn" ? f.specialtyBn : f.specialty}</span>
    </div>
    <div class="farmer-hero-stats">
      <div><strong>${f.years}</strong><span>${t("farmer.yearsFarming")}</span></div>
      <div><strong>${productCount}</strong><span>${t("farmer.products")}</span></div>
      <div><strong>${f.division}</strong><span>${t("farmer.division")}</span></div>
    </div>
    <p class="farmer-hero-quote">&ldquo;${getLang() === "bn" ? f.quoteBn : f.quote}&rdquo;</p>
    <p class="farmer-hero-bio">${farmerBio(f)}</p>`;
}

function renderTrust() {
  const items = [
    { icon: "shield", key: "farmer.verified", descKey: "farmer.verifiedDesc", cls: "" },
    { icon: "truck", key: "farmer.directTrade", descKey: "farmer.directTradeDesc", cls: "accent" },
    { icon: "heart", key: "farmer.fairPrice", descKey: "farmer.fairPriceDesc", cls: "secondary" },
  ];
  document.getElementById("farmerTrust").innerHTML = items
    .map(
      (i) => `
    <div class="card why-card">
      <span class="icon-tile ${i.cls}">${icon(i.icon)}</span>
      <div><h4>${t(i.key)}</h4><p>${t(i.descKey)}</p></div>
    </div>`
    )
    .join("");
}

function renderFarmerProducts(f) {
  const products = PRODUCTS.filter((p) => p.farmerId === f.id);
  document.getElementById("farmerProductsTitle").textContent = `${t("farmer.productsFrom")} ${f.name}`;
  const mount = document.getElementById("farmerProducts");
  if (!products.length) {
    mount.innerHTML = `<p style="grid-column:1/-1;color:var(--color-text-faint)">${t("farmer.noProducts")}</p>`;
  } else {
    mount.innerHTML = products.map(renderProductCard).join("");
  }
  wireCardActions();
}

function renderOtherFarmers(f) {
  const others = FARMERS.filter((x) => x.id !== f.id)
    .sort((a, b) => (a.division === f.division ? -1 : 0) - (b.division === f.division ? -1 : 0))
    .slice(0, 4);
  document.getElementById("otherFarmers").innerHTML = others.map(renderFarmerCard).join("");
}

function initFarmerDetail() {
  const f = FARMERS.find((x) => x.id === getFarmerId());
  if (!f) {
    document.getElementById("main").innerHTML = `<div class="container empty-state"><p>Farmer not found.</p><a href="farmers.html" class="btn btn-primary">${t("farmerspage.title")}</a></div>`;
    return;
  }
  renderCrumb(f);
  renderHero(f);
  renderTrust();
  renderFarmerProducts(f);
  renderOtherFarmers(f);
  document.title = `${f.name} — Taza Khamar`;
}

document.addEventListener("DOMContentLoaded", initFarmerDetail);
document.addEventListener("tk:langchange", initFarmerDetail);
