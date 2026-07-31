/* ==========================================================================
   Taza Khamar — Checkout flow
   ========================================================================== */

const checkoutState = { step: 1, date: 0, slot: 1, payment: "cod" };

function renderCheckoutCrumb() {
  document.getElementById("crumb").innerHTML = `
    <a href="index.html">${t("breadcrumb.home")}</a><span class="sep">${icon("chevronRight")}</span>
    <a href="cart.html">${t("cart.title")}</a><span class="sep">${icon("chevronRight")}</span>
    <span class="current">${t("checkout.title")}</span>`;
}

function renderSteps() {
  const steps = [
    { n: 1, key: "checkout.step1" },
    { n: 2, key: "checkout.step2" },
    { n: 3, key: "checkout.step3" },
  ];
  document.getElementById("checkoutSteps").innerHTML = steps
    .map((s) => {
      const cls = s.n === checkoutState.step ? "active" : s.n < checkoutState.step ? "done" : "";
      return `<div class="checkout-steps__item ${cls}"><span class="dot">${s.n < checkoutState.step ? icon("check") : s.n}</span><span>${t(s.key)}</span></div>`;
    })
    .join("");
}

function showStep(n) {
  checkoutState.step = n;
  document.querySelectorAll(".checkout-panel").forEach((p) => {
    p.style.display = Number(p.dataset.step) === n ? "block" : "none";
  });
  renderSteps();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCityOptions() {
  const sel = document.getElementById("fCity");
  sel.innerHTML = LOCATIONS.map((l) => `<option value="${l}" ${l === getLocation() ? "selected" : ""}>${l}</option>`).join("");
}

function renderDateOptions() {
  const sel = document.getElementById("fDate");
  const opts = [t("checkout.today"), t("checkout.tomorrow"), t("checkout.dayafter")];
  sel.innerHTML = opts.map((label, i) => `<option value="${i}" ${i === checkoutState.date ? "selected" : ""}>${label}</option>`).join("");
  sel.addEventListener("change", () => (checkoutState.date = Number(sel.value)));
}

function renderSlotGrid() {
  const slots = [
    { i: 1, label: t("checkout.morning"), sub: "8am–11am" },
    { i: 2, label: t("checkout.afternoon"), sub: "12pm–4pm" },
    { i: 3, label: t("checkout.evening"), sub: "5pm–8pm" },
  ];
  document.getElementById("slotGrid").innerHTML = slots
    .map((s) => `<button class="slot-option ${s.i === checkoutState.slot ? "active" : ""}" data-slot="${s.i}">${s.label}<br/><small>${s.sub}</small></button>`)
    .join("");
  document.querySelectorAll(".slot-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      checkoutState.slot = Number(btn.dataset.slot);
      renderSlotGrid();
    });
  });
}

const PAYMENT_METHODS = [
  { id: "cod", icon: "cash", labelKey: "checkout.cod", subKey: "checkout.codsub", color: "#6b6b58" },
  { id: "bkash", icon: "wallet", labelKey: "checkout.bkash", subKey: "checkout.bkashsub", color: "#E2136E" },
  { id: "nagad", icon: "wallet", labelKey: "checkout.nagad", subKey: "checkout.nagadsub", color: "#F6921E" },
  { id: "rocket", icon: "wallet", labelKey: "checkout.rocket", subKey: "checkout.rocketsub", color: "#8C3494" },
];

function renderPaymentOptions() {
  document.getElementById("paymentOptions").innerHTML = PAYMENT_METHODS.map(
    (m) => `
    <label class="payment-option ${m.id === checkoutState.payment ? "active" : ""}" data-method="${m.id}">
      <input type="radio" name="payment" value="${m.id}" ${m.id === checkoutState.payment ? "checked" : ""} />
      <span class="payment-option__icon" style="background:${m.color}">${icon(m.icon)}</span>
      <span class="payment-option__label"><strong>${t(m.labelKey)}</strong><span>${t(m.subKey)}</span></span>
    </label>`
  ).join("");
  document.querySelectorAll(".payment-option").forEach((label) => {
    label.addEventListener("click", () => {
      checkoutState.payment = label.dataset.method;
      renderPaymentOptions();
    });
  });
}

function renderCheckoutSummary() {
  const lines = cartLines();
  const { subtotal, delivery, discount, total, promo } = computeTotals();
  document.getElementById("checkoutSummary").innerHTML = `
    <h3 data-i18n="checkout.summary">${t("checkout.summary")}</h3>
    <div style="max-height:220px;overflow-y:auto;margin-block:.5rem">
      ${lines
        .map(
          (l) => `
        <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);padding:.4rem 0;border-bottom:1px solid var(--color-border)">
          <span>${productName(l.product)} × ${l.qty}</span>
          <span>${formatBDT(linePrice(l.product, l.packageSize) * l.qty)}</span>
        </div>`
        )
        .join("")}
    </div>
    <div class="summary-row"><span>${t("cart.subtotal")}</span><span>${formatBDT(subtotal)}</span></div>
    <div class="summary-row"><span>${t("cart.delivery")}</span><span>${formatBDT(delivery)}</span></div>
    ${promo ? `<div class="summary-row"><span>${t("cart.discount")}</span><span>&minus;${formatBDT(discount)}</span></div>` : ""}
    <div class="summary-row total"><span>${t("cart.total")}</span><span>${formatBDT(total)}</span></div>`;
}

function placeOrder() {
  const fullname = document.getElementById("fFullname").value.trim();
  const phone = document.getElementById("fPhone").value.trim();
  const address = document.getElementById("fAddress").value.trim();
  if (!fullname || !phone || !address) {
    showStep(1);
    showToast(getLang() === "bn" ? "দয়া করে ঠিকানার তথ্য পূরণ করুন" : "Please complete your address details");
    return;
  }
  const orderId = "TK" + Math.floor(100000 + Math.random() * 900000);
  const { total } = computeTotals();
  const order = {
    id: orderId,
    total,
    payment: checkoutState.payment,
    date: checkoutState.date,
    slot: checkoutState.slot,
    placedAt: Date.now(),
  };
  localStorage.setItem("tk_last_order", JSON.stringify(order));
  clearCart();
  clearPromo();
  window.location.href = `order-confirmation.html?order=${orderId}`;
}

function initCheckout() {
  if (!cartLines().length) {
    window.location.href = "cart.html";
    return;
  }
  renderCheckoutCrumb();
  renderCityOptions();
  renderDateOptions();
  renderSlotGrid();
  renderPaymentOptions();
  renderCheckoutSummary();
  showStep(1);

  document.getElementById("toStep2").addEventListener("click", () => {
    const fullname = document.getElementById("fFullname").value.trim();
    const phone = document.getElementById("fPhone").value.trim();
    const address = document.getElementById("fAddress").value.trim();
    if (!fullname || !phone || !address) {
      showToast(getLang() === "bn" ? "দয়া করে সব তথ্য পূরণ করুন" : "Please fill in all required fields");
      return;
    }
    showStep(2);
  });
  document.getElementById("toStep1Back").addEventListener("click", () => showStep(1));
  document.getElementById("toStep3").addEventListener("click", () => showStep(3));
  document.getElementById("toStep2Back").addEventListener("click", () => showStep(2));
  document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
}

document.addEventListener("DOMContentLoaded", initCheckout);
document.addEventListener("tk:langchange", () => {
  renderCheckoutCrumb();
  renderDateOptions();
  renderSlotGrid();
  renderPaymentOptions();
  renderCheckoutSummary();
  renderSteps();
});
