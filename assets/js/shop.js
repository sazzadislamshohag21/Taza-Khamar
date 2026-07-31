/* ==========================================================================
   Taza Khamar — Shop page: filter, sort, render
   ========================================================================== */

const shopState = {
  categories: new Set(),
  districts: new Set(),
  minPrice: null,
  maxPrice: null,
  minRating: 0,
  sort: "popular",
};

function initShopFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat) shopState.categories.add(cat);
}

function renderFilterUI() {
  document.getElementById("categoryFilters").innerHTML = CATEGORIES.map(
    (c) => `
    <label class="filter-option">
      <input type="checkbox" value="${c.id}" class="js-cat-filter" ${shopState.categories.has(c.id) ? "checked" : ""} />
      ${getLang() === "bn" ? c.nameBn : c.name}
    </label>`
  ).join("");

  const districts = [...new Set(PRODUCTS.map((p) => p.district))].sort();
  document.getElementById("districtFilters").innerHTML = districts
    .map(
      (d) => `
    <label class="filter-option">
      <input type="checkbox" value="${d}" class="js-district-filter" ${shopState.districts.has(d) ? "checked" : ""} />
      ${d}
    </label>`
    )
    .join("");

  document.getElementById("ratingFilters").innerHTML =
    `<label class="filter-option"><input type="radio" name="rating" value="0" class="js-rating-filter" ${shopState.minRating === 0 ? "checked" : ""}/> Any</label>` +
    [4, 3].map(
      (r) => `<label class="filter-option"><input type="radio" name="rating" value="${r}" class="js-rating-filter" ${shopState.minRating === r ? "checked" : ""}/> ${r}+ ${"★".repeat(r)}</label>`
    ).join("");

  document.getElementById("priceMin").value = shopState.minPrice ?? "";
  document.getElementById("priceMax").value = shopState.maxPrice ?? "";
  document.getElementById("sortSelect").value = shopState.sort;
  document.getElementById("crumbSep").innerHTML = icon("chevronRight");
  document.getElementById("emptyIcon").innerHTML = icon("search");
}

function getFilteredProducts() {
  let list = PRODUCTS.slice();
  if (shopState.categories.size) list = list.filter((p) => shopState.categories.has(p.category));
  if (shopState.districts.size) list = list.filter((p) => shopState.districts.has(p.district));
  if (shopState.minPrice != null) list = list.filter((p) => p.price >= shopState.minPrice);
  if (shopState.maxPrice != null) list = list.filter((p) => p.price <= shopState.maxPrice);
  if (shopState.minRating) list = list.filter((p) => p.rating >= shopState.minRating);

  switch (shopState.sort) {
    case "priceLow": list.sort((a, b) => a.price - b.price); break;
    case "priceHigh": list.sort((a, b) => b.price - a.price); break;
    case "rating": list.sort((a, b) => b.rating - a.rating); break;
    default: list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviews - a.reviews);
  }
  return list;
}

function renderShopGrid() {
  const list = getFilteredProducts();
  const grid = document.getElementById("shopGrid");
  const empty = document.getElementById("emptyState");
  document.getElementById("resultsCount").textContent = `${list.length} ${t("shop.results")}`;
  if (!list.length) {
    grid.innerHTML = "";
    empty.style.display = "flex";
  } else {
    empty.style.display = "none";
    grid.innerHTML = list.map(renderProductCard).join("");
  }
  wireCardActions();
}

function wireShopEvents() {
  document.getElementById("categoryFilters").addEventListener("change", (e) => {
    if (!e.target.classList.contains("js-cat-filter")) return;
    e.target.checked ? shopState.categories.add(e.target.value) : shopState.categories.delete(e.target.value);
    renderShopGrid();
  });
  document.getElementById("districtFilters").addEventListener("change", (e) => {
    if (!e.target.classList.contains("js-district-filter")) return;
    e.target.checked ? shopState.districts.add(e.target.value) : shopState.districts.delete(e.target.value);
    renderShopGrid();
  });
  document.getElementById("ratingFilters").addEventListener("change", (e) => {
    if (!e.target.classList.contains("js-rating-filter")) return;
    shopState.minRating = Number(e.target.value);
    renderShopGrid();
  });
  document.getElementById("priceMin").addEventListener("input", (e) => {
    shopState.minPrice = e.target.value ? Number(e.target.value) : null;
    renderShopGrid();
  });
  document.getElementById("priceMax").addEventListener("input", (e) => {
    shopState.maxPrice = e.target.value ? Number(e.target.value) : null;
    renderShopGrid();
  });
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    shopState.sort = e.target.value;
    renderShopGrid();
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    shopState.categories.clear();
    shopState.districts.clear();
    shopState.minPrice = null;
    shopState.maxPrice = null;
    shopState.minRating = 0;
    shopState.sort = "popular";
    renderFilterUI();
    renderShopGrid();
  });
  document.getElementById("mobileFilterToggle").addEventListener("click", () => {
    document.getElementById("filtersPanel").classList.toggle("open");
  });
}

function initShop() {
  initShopFromQuery();
  renderFilterUI();
  renderShopGrid();
  wireShopEvents();
}

document.addEventListener("DOMContentLoaded", initShop);
document.addEventListener("tk:langchange", () => {
  renderFilterUI();
  renderShopGrid();
});
