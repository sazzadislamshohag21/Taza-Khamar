/* ==========================================================================
   Taza Khamar — Product detail page
   ========================================================================== */

const pdState = { qty: 1, packageIndex: null };

function getProductId() {
  return new URLSearchParams(window.location.search).get("id") || PRODUCTS[0].id;
}

function renderBreadcrumb(p) {
  const cat = CATEGORIES.find((c) => c.id === p.category);
  document.getElementById("pdBreadcrumb").innerHTML = `
    <a href="index.html">${t("breadcrumb.home")}</a><span class="sep">${icon("chevronRight")}</span>
    <a href="shop.html">${t("nav.shop")}</a><span class="sep">${icon("chevronRight")}</span>
    <a href="shop.html?cat=${cat.id}">${getLang() === "bn" ? cat.nameBn : cat.name}</a><span class="sep">${icon("chevronRight")}</span>
    <span class="current">${productName(p)}</span>`;
}

function renderProductDetail(p) {
  const color = catColorClass(p.category);
  const pkgOptions = PACKAGE_OPTIONS[p.unit];
  const farmer = FARMERS.find((f) => f.id === p.farmerId);

  const mainStyle = p.photo ? `background-image:url('${p.photo}?auto=format&fit=crop&w=800&q=75');background-size:cover;background-position:center` : mediaBg(color);
  document.getElementById("productDetail").innerHTML = `
    <div class="pd-gallery">
      <div class="pd-gallery__main" style="${mainStyle}">${p.photo ? "" : icon(p.icon)}</div>
      <div class="pd-gallery__thumbs">
        ${[1, 2, 3].map((i) => `<button class="${i === 1 ? "active" : ""}" style="${mainStyle}">${p.photo ? "" : icon(p.icon)}</button>`).join("")}
      </div>
    </div>
    <div class="pd-info">
      ${p.popular ? `<span class="badge badge-accent">${getLang() === "bn" ? "জনপ্রিয়" : "Popular"}</span>` : ""}
      <h1 class="pd-info__title">${productName(p)}</h1>
      <div style="color:var(--color-text-faint);font-size:var(--fs-sm)">${productSubName(p)}</div>
      <div style="display:flex;align-items:center;gap:.6rem;margin-top:.5rem">
        ${starRow(p.rating)}
        <span style="font-size:var(--fs-xs);color:var(--color-text-faint)">${p.rating} (${p.reviews} reviews)</span>
      </div>
      <div class="pd-info__price" id="pdPrice"></div>

      <div class="pd-farmer-strip">
        <span class="avatar" style="background:${avatarColor(farmer.name)}">${farmer.name.charAt(0)}</span>
        <div>
          <div style="font-size:var(--fs-xs);color:var(--color-text-faint)">${t("pd.farmerlabel")}</div>
          <strong>${farmer.name}</strong> · <span style="font-size:var(--fs-xs);color:var(--color-text-faint)">${p.district}</span>
        </div>
      </div>

      ${pkgOptions ? `
      <div class="pd-options">
        <h4>${t("pd.package")}</h4>
        <div class="pd-options__group" id="pdPackageGroup">
          ${pkgOptions.map((o, i) => `<button data-i="${i}" class="${i === 1 ? "active" : ""}">${o.label}</button>`).join("")}
        </div>
      </div>` : ""}

      <div class="pd-options">
        <h4>${t("pd.quantity")}</h4>
        <div class="stepper" style="margin-top:.4rem">
          <button id="pdQtyMinus" aria-label="Decrease">${icon("minus")}</button>
          <input type="text" id="pdQtyValue" value="1" readonly />
          <button id="pdQtyPlus" aria-label="Increase">${icon("plus")}</button>
        </div>
      </div>

      <div class="pd-add-row">
        <button class="btn btn-primary btn-lg" id="pdAddToCart">${icon("cart")} ${t("pd.addtocart")}</button>
        <button class="btn btn-outline btn-lg" id="pdBuyNow">${t("pd.buynow")}</button>
      </div>

      <ul class="pd-trust-list">
        <li>${icon("shield")} ${t("pd.trust1")}</li>
        <li>${icon("truck")} ${t("pd.trust2")}</li>
        <li>${icon("heart")} ${t("pd.trust3")}</li>
      </ul>
    </div>`;

  pdState.qty = 1;
  pdState.packageIndex = pkgOptions ? 1 : null;
  updatePdPrice(p);
  wirePdControls(p);
}

function currentUnitPrice(p) {
  const pkgOptions = PACKAGE_OPTIONS[p.unit];
  if (pkgOptions && pdState.packageIndex != null) return p.price * pkgOptions[pdState.packageIndex].mult;
  return p.price;
}

function updatePdPrice(p) {
  const pkgOptions = PACKAGE_OPTIONS[p.unit];
  const unitLabel = pkgOptions ? pkgOptions[pdState.packageIndex].label : p.unit;
  const price = currentUnitPrice(p);
  document.getElementById("pdPrice").innerHTML = `
    <strong>${formatBDT(price)}</strong>
    ${p.oldPrice ? `<del>${formatBDT(p.oldPrice)}</del>` : ""}
    <span style="color:var(--color-text-faint);font-size:var(--fs-sm)">/ ${unitLabel}</span>`;
}

function wirePdControls(p) {
  const pkgGroup = document.getElementById("pdPackageGroup");
  if (pkgGroup) {
    pkgGroup.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      pkgGroup.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      pdState.packageIndex = Number(btn.dataset.i);
      updatePdPrice(p);
    });
  }
  const qtyValue = document.getElementById("pdQtyValue");
  document.getElementById("pdQtyMinus").addEventListener("click", () => {
    pdState.qty = Math.max(1, pdState.qty - 1);
    qtyValue.value = pdState.qty;
  });
  document.getElementById("pdQtyPlus").addEventListener("click", () => {
    pdState.qty = pdState.qty + 1;
    qtyValue.value = pdState.qty;
  });
  const pkgLabel = () => {
    const pkgOptions = PACKAGE_OPTIONS[p.unit];
    return pkgOptions ? pkgOptions[pdState.packageIndex].label : null;
  };
  document.getElementById("pdAddToCart").addEventListener("click", () => {
    addToCart(p.id, pdState.qty, pkgLabel());
  });
  document.getElementById("pdBuyNow").addEventListener("click", () => {
    addToCart(p.id, pdState.qty, pkgLabel());
    window.location.href = "cart.html";
  });
}

function renderPdTabs(p) {
  const farmer = FARMERS.find((f) => f.id === p.farmerId);
  document.getElementById("tabDescription").innerHTML = `<p>${productDesc(p)}</p>`;
  document.getElementById("tabFarmer").innerHTML = `
    <p>${getLang() === "bn" ? farmer.quoteBn : farmer.quote}</p>
    <p style="margin-top:.6rem">${farmer.name} ${getLang() === "bn" ? "থেকে" : "has been farming in"} ${farmer.district} ${getLang() === "bn" ? "জেলায় কৃষিকাজ করছেন" : `for ${farmer.years} years`}, ${getLang() === "bn" ? "" : "specialising in"} ${getLang() === "bn" ? farmer.specialtyBn : farmer.specialty}.</p>
    <a href="farmers.html" class="btn btn-outline btn-sm" style="margin-top:.8rem;display:inline-flex">${t("farmers.viewAll")}</a>`;
  document.getElementById("tabReviews").innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1rem">
      ${TESTIMONIALS.slice(0, 3).map((tm) => `
        <div style="border-bottom:1px solid var(--color-border);padding-bottom:1rem">
          ${starRow(tm.rating)}
          <p style="margin-top:.4rem">${tm.quote}</p>
          <strong style="font-size:var(--fs-sm)">${tm.name}</strong>
        </div>`).join("")}
    </div>`;
}

function wireTabs() {
  document.querySelectorAll(".pd-tabs__nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pd-tabs__nav button").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".pd-tabs__panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`.pd-tabs__panel[data-panel="${btn.dataset.tab}"]`).classList.add("active");
    });
  });
}

function renderRelated(p) {
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("relatedGrid").innerHTML = related.map(renderProductCard).join("");
  wireCardActions();
}

function initProduct() {
  const p = findProduct(getProductId());
  if (!p) {
    document.getElementById("main").innerHTML = `<div class="container empty-state"><p>Product not found.</p><a href="shop.html" class="btn btn-primary">${t("cart.browse")}</a></div>`;
    return;
  }
  renderBreadcrumb(p);
  renderProductDetail(p);
  renderPdTabs(p);
  wireTabs();
  renderRelated(p);
  document.title = `${p.name} — Taza Khamar`;
}

document.addEventListener("DOMContentLoaded", initProduct);
document.addEventListener("tk:langchange", initProduct);
