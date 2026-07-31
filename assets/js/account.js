/* ==========================================================================
   Taza Khamar — Account page
   ========================================================================== */

let accountTab = "overview";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("tk_user")) || { name: "Guest User" };
  } catch {
    return { name: "Guest User" };
  }
}

function getDemoOrders() {
  const orders = [];
  let last = null;
  try { last = JSON.parse(localStorage.getItem("tk_last_order")); } catch {}
  if (last) orders.push({ id: last.id, total: last.total, status: "transit", items: "Fresh Hilsa Fish + more" });
  orders.push(
    { id: "TK118204", total: 1240, status: "delivered", items: "Deshi Chicken, Potato, Farm Fresh Eggs" },
    { id: "TK104932", total: 3560, status: "delivered", items: "Premium Beef, Cow Milk" }
  );
  return orders;
}

function renderAccountNav() {
  const items = [
    { id: "overview", icon: "user", key: "account.overview" },
    { id: "orders", icon: "box", key: "account.orders" },
    { id: "addresses", icon: "pin", key: "account.addresses" },
    { id: "wishlist", icon: "heart", key: "account.wishlist" },
    { id: "settings", icon: "filter", key: "account.settings" },
  ];
  document.getElementById("accountNav").innerHTML =
    items.map((i) => `<a href="#" class="${i.id === accountTab ? "active" : ""}" data-tab="${i.id}">${icon(i.icon)} ${t(i.key)}</a>`).join("") +
    `<a href="#" id="logoutLink">${icon("close")} ${t("account.logout")}</a>`;

  document.querySelectorAll("#accountNav a[data-tab]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      accountTab = a.dataset.tab;
      renderAccountNav();
      renderAccountContent();
    });
  });
  document.getElementById("logoutLink").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("tk_user");
    window.location.href = "login.html";
  });
}

function renderOverview() {
  const user = getUser();
  const orders = getDemoOrders();
  return `
    <div class="card" style="padding:var(--sp-lg)">
      <h3>${t("account.welcome")}, ${user.name}</h3>
      <p style="margin-top:.4rem">${orders.length} orders · ${getLocation()}</p>
    </div>
    <div class="grid grid-3" style="margin-top:var(--sp-md)">
      <div class="card why-card"><span class="icon-tile">${icon("box")}</span><div><h4>${orders.length}</h4><p>Total Orders</p></div></div>
      <div class="card why-card"><span class="icon-tile accent">${icon("heart")}</span><div><h4>3</h4><p>Wishlist Items</p></div></div>
      <div class="card why-card"><span class="icon-tile secondary">${icon("pin")}</span><div><h4>1</h4><p>Saved Address</p></div></div>
    </div>`;
}

function renderOrders() {
  const orders = getDemoOrders();
  return `
    <div class="card">
      ${orders
        .map(
          (o) => `
        <div class="order-row">
          <div>
            <strong>${o.id}</strong>
            <div style="font-size:var(--fs-xs);color:var(--color-text-faint)">${o.items}</div>
          </div>
          <span class="order-status ${o.status}">${o.status === "delivered" ? t("status.delivered") : t("status.transit")}</span>
          <strong>${formatBDT(o.total)}</strong>
        </div>`
        )
        .join("")}
    </div>`;
}

function renderPlaceholder(title) {
  return `<div class="empty-state"><span>${icon("box")}</span><p>${title} — coming soon.</p></div>`;
}

function renderAccountContent() {
  const mount = document.getElementById("accountContent");
  if (accountTab === "overview") mount.innerHTML = renderOverview();
  else if (accountTab === "orders") mount.innerHTML = renderOrders();
  else if (accountTab === "addresses") mount.innerHTML = renderPlaceholder(t("account.addresses"));
  else if (accountTab === "wishlist") mount.innerHTML = renderPlaceholder(t("account.wishlist"));
  else mount.innerHTML = renderPlaceholder(t("account.settings"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderAccountNav();
  renderAccountContent();
});
document.addEventListener("tk:langchange", () => {
  renderAccountNav();
  renderAccountContent();
});
