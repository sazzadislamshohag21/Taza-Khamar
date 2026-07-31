/* ==========================================================================
   Taza Khamar — Cart page
   ========================================================================== */

function renderCartCrumb() {
  document.getElementById("crumb").innerHTML = `
    <a href="index.html">${t("breadcrumb.home")}</a><span class="sep">${icon("chevronRight")}</span>
    <span class="current">${t("cart.title")}</span>`;
}

function cartItemRow(line) {
  const p = line.product;
  const color = catColorClass(p.category);
  const unitLabel = line.packageSize || p.unit;
  const lineTotal = linePrice(p, line.packageSize) * line.qty;
  return `
  <div class="cart-item" data-line="${line.lineId}">
    <div class="cart-item__media" style="${mediaBg(color)}">${icon(p.icon)}</div>
    <div>
      <div class="cart-item__name">${productName(p)}</div>
      <div class="cart-item__meta">${p.district} · ${unitLabel}</div>
      <div class="stepper" style="margin-top:.5rem">
        <button class="js-dec" aria-label="Decrease">${icon("minus")}</button>
        <input type="text" value="${line.qty}" readonly />
        <button class="js-inc" aria-label="Increase">${icon("plus")}</button>
      </div>
    </div>
    <div></div>
    <div>
      <div class="cart-item__price">${formatBDT(lineTotal)}</div>
      <button class="cart-item__remove js-remove">${icon("trash")} ${t("cart.remove")}</button>
    </div>
  </div>`;
}

function renderCart() {
  const lines = cartLines();
  const mount = document.getElementById("cartContent");

  if (!lines.length) {
    mount.innerHTML = `
      <div class="empty-state">
        ${icon("cart")}
        <h3 data-i18n="cart.empty">${t("cart.empty")}</h3>
        <p data-i18n="cart.emptylead">${t("cart.emptylead")}</p>
        <a href="shop.html" class="btn btn-primary" data-i18n="cart.browse">${t("cart.browse")}</a>
      </div>`;
    return;
  }

  const { subtotal, delivery, discount, total, promo } = computeTotals();

  mount.innerHTML = `
    <div class="cart-layout">
      <div class="card" style="padding:var(--sp-md)">
        ${lines.map(cartItemRow).join("")}
        <a href="shop.html" class="btn btn-ghost" style="margin-top:var(--sp-sm)">${t("cart.continue")}</a>
      </div>
      <div class="card summary-card">
        <h3 data-i18n="checkout.summary">${t("checkout.summary")}</h3>
        <div class="summary-row"><span data-i18n="cart.subtotal">${t("cart.subtotal")}</span><span>${formatBDT(subtotal)}</span></div>
        <div class="summary-row"><span data-i18n="cart.delivery">${t("cart.delivery")}</span><span>${formatBDT(delivery)}</span></div>
        ${promo ? `<div class="summary-row"><span data-i18n="cart.discount">${t("cart.discount")}</span><span>&minus;${formatBDT(discount)}</span></div>` : ""}
        <div class="promo-row">
          <input type="text" id="promoInput" data-i18n-placeholder="cart.promo" placeholder="${t("cart.promo")}" value="${promo ? promo.code : ""}" />
          <button class="btn btn-outline btn-sm" id="promoApply">${t("cart.apply")}</button>
        </div>
        <div class="summary-row total"><span data-i18n="cart.total">${t("cart.total")}</span><span>${formatBDT(total)}</span></div>
        <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="margin-top:var(--sp-sm)">${t("cart.checkout")}</a>
      </div>
    </div>`;

  wireCartRows();
}

function wireCartRows() {
  document.querySelectorAll(".cart-item").forEach((row) => {
    const lineId = row.dataset.line;
    const line = getCart().find((l) => l.lineId === lineId);
    row.querySelector(".js-inc").addEventListener("click", () => {
      updateCartQty(lineId, line.qty + 1);
      renderCart();
    });
    row.querySelector(".js-dec").addEventListener("click", () => {
      updateCartQty(lineId, line.qty - 1);
      renderCart();
    });
    row.querySelector(".js-remove").addEventListener("click", () => {
      removeFromCart(lineId);
      renderCart();
    });
  });

  const promoBtn = document.getElementById("promoApply");
  if (promoBtn) {
    promoBtn.addEventListener("click", () => {
      const code = document.getElementById("promoInput").value.trim().toUpperCase();
      if (code === "FRESH10") {
        setPromo(code, 0.1);
        showToast(getLang() === "bn" ? "প্রোমো কোড প্রয়োগ হয়েছে!" : "Promo code applied!");
      } else if (code) {
        showToast(getLang() === "bn" ? "অবৈধ প্রোমো কোড" : "Invalid promo code");
      } else {
        clearPromo();
      }
      renderCart();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartCrumb();
  renderCart();
});
document.addEventListener("tk:langchange", () => {
  renderCartCrumb();
  renderCart();
});
