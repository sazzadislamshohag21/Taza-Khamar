/* ==========================================================================
   Taza Khamar — Cart (localStorage-backed)
   ========================================================================== */

const CART_KEY = "tk_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent("tk:cartchange", { detail: { cart } }));
}

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function addToCart(id, qty = 1, packageSize = null) {
  const cart = getCart();
  const lineId = packageSize ? `${id}::${packageSize}` : id;
  const existing = cart.find((l) => l.lineId === lineId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ lineId, id, qty, packageSize });
  }
  saveCart(cart);
  showToast(t("addedtocart"));
}

function updateCartQty(lineId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((l) => l.lineId !== lineId);
  } else {
    const line = cart.find((l) => l.lineId === lineId);
    if (line) line.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(lineId) {
  const cart = getCart().filter((l) => l.lineId !== lineId);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function cartLines() {
  return getCart()
    .map((l) => ({ ...l, product: findProduct(l.id) }))
    .filter((l) => l.product);
}

function cartCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function linePrice(product, packageSize) {
  const opts = PACKAGE_OPTIONS[product.unit];
  if (!opts || !packageSize) return product.price;
  const match = opts.find((o) => o.label === packageSize);
  return match ? product.price * match.mult : product.price;
}

function cartSubtotal() {
  return cartLines().reduce((sum, l) => sum + linePrice(l.product, l.packageSize) * l.qty, 0);
}

function computeDeliveryFee(subtotal) {
  if (subtotal <= 0) return 0;
  return getLocation() === "Dhaka" ? 60 : 120;
}

const PROMO_KEY = "tk_promo";
function getPromo() {
  try {
    return JSON.parse(localStorage.getItem(PROMO_KEY));
  } catch {
    return null;
  }
}
function setPromo(code, pct) {
  localStorage.setItem(PROMO_KEY, JSON.stringify({ code, pct }));
}
function clearPromo() {
  localStorage.removeItem(PROMO_KEY);
}

function computeTotals() {
  const subtotal = cartSubtotal();
  const delivery = computeDeliveryFee(subtotal);
  const promo = getPromo();
  const discount = promo ? Math.round(subtotal * promo.pct) : 0;
  const total = Math.max(0, subtotal + delivery - discount);
  return { subtotal, delivery, discount, total, promo };
}

function formatBDT(n) {
  return "৳" + Math.round(n).toLocaleString("en-US");
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${icon("checkCircle")}<span>${message}</span>`;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function updateCartBadge() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
document.addEventListener("tk:cartchange", updateCartBadge);
