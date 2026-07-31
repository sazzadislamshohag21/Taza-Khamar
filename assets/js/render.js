/* ==========================================================================
   Taza Khamar — Shared card renderers (used across multiple pages)
   ========================================================================== */

function productName(p) {
  return getLang() === "bn" ? p.nameBn : p.name;
}
function productSubName(p) {
  return getLang() === "bn" ? p.name : p.nameBn;
}
function productDesc(p) {
  return getLang() === "bn" ? p.descBn : p.desc;
}

function renderProductCard(p) {
  const color = catColorClass(p.category);
  const mediaStyle = p.photo
    ? `background-image:url('${p.photo}?auto=format&fit=crop&w=500&q=70')`
    : mediaBg(color);
  return `
  <article class="card product-card">
    <a href="product.html?id=${p.id}" class="product-card__media" style="${mediaStyle}">
      ${p.photo ? "" : icon(p.icon)}
    </a>
    <button class="product-card__wishlist js-wishlist" data-id="${p.id}" aria-label="Save">${icon("heart")}</button>
    <div class="product-card__body">
      <span class="product-card__farmer">${icon("pin")} ${p.district}</span>
      <a href="product.html?id=${p.id}">
        <div class="product-card__title">${productName(p)}</div>
        <div class="product-card__title-bn">${productSubName(p)}</div>
      </a>
      <div class="product-card__meta">
        <div class="product-card__price">${formatBDT(p.price)} <small>/${p.unit}</small></div>
        <button class="product-card__add js-add-cart" data-id="${p.id}" aria-label="Add to cart">${icon("plus")}</button>
      </div>
    </div>
  </article>`;
}

function renderCategoryTile(c) {
  return `
  <a href="shop.html?cat=${c.id}" class="card category-tile">
    <span class="category-tile__media" style="background-image:url('${c.photo}?auto=format&fit=crop&w=400&q=70')">
      <span class="category-tile__icon" style="${mediaBg(c.color)}">${icon(c.icon)}</span>
    </span>
    <span class="category-tile__body">
      <span class="category-tile__name">${getLang() === "bn" ? c.nameBn : c.name}</span><br/>
      <span class="category-tile__name-bn">${getLang() === "bn" ? c.name : c.nameBn}</span>
    </span>
  </a>`;
}

function renderFarmerCard(f) {
  const color = catColorClass(PRODUCTS.find((p) => p.farmerId === f.id)?.category || "fish");
  const mediaStyle = f.photo
    ? `background-image:url('${f.photo}?auto=format&fit=crop&w=500&q=70')`
    : mediaBg(color);
  return `
  <a href="farmer-detail.html?id=${f.id}" class="card farmer-card">
    <div class="farmer-card__media" style="${mediaStyle}">
      ${f.photo ? "" : icon(f.icon)}
      ${f.photo ? `<span class="farmer-card__logo" style="${mediaBg(color)}">${icon(f.icon)}</span>` : ""}
    </div>
    <div class="farmer-card__body">
      <div class="farmer-card__loc">${icon("pin")} ${f.district}, ${f.division}</div>
      <h4>${f.name}</h4>
      <span class="badge">${getLang() === "bn" ? f.specialtyBn : f.specialty}</span>
      <p class="farmer-card__quote">&ldquo;${getLang() === "bn" ? f.quoteBn : f.quote}&rdquo;</p>
      <p style="margin-top:.5rem;font-size:var(--fs-xs);color:var(--color-text-faint)">${f.years} ${t("farmers.years")}</p>
    </div>
  </a>`;
}

function renderTestimonial(tm) {
  return `
  <article class="card testimonial-card">
    ${starRow(tm.rating)}
    <p class="testimonial-card__quote">&ldquo;${tm.quote}&rdquo;</p>
    <div class="testimonial-card__person">
      <span class="avatar" style="background:${avatarColor(tm.name)}">${tm.name.charAt(0)}</span>
      <div>
        <strong style="display:block;font-size:var(--fs-sm)">${tm.name}</strong>
        <span style="font-size:var(--fs-xs);color:var(--color-text-faint)">${tm.city}</span>
      </div>
    </div>
  </article>`;
}

function renderGuideCard(g) {
  const color = catColorClass(PRODUCTS.find((p) => p.icon === g.icon)?.category || "fish");
  return `
  <article class="card guide-card">
    <a href="guide-detail.html?id=${g.id}" class="guide-card__media" style="${mediaBg(color)}">${icon(g.icon)}</a>
    <div class="guide-card__body">
      <div class="guide-card__meta">${g.category} · ${g.minutes} ${t("guides.readtime")}</div>
      <h4><a href="guide-detail.html?id=${g.id}">${getLang() === "bn" ? g.titleBn : g.title}</a></h4>
      <p style="font-size:var(--fs-sm);margin-top:.4rem">${g.excerpt}</p>
      <a href="guide-detail.html?id=${g.id}" class="btn-ghost btn-sm" style="padding-left:0;margin-top:.5rem;display:inline-flex">${t("guides.readmore")} ${icon("arrowRight")}</a>
    </div>
  </article>`;
}

function wireCardActions(root = document) {
  root.querySelectorAll(".js-add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(btn.dataset.id, 1);
    });
  });
  root.querySelectorAll(".js-wishlist").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.innerHTML = icon("heartFilled");
      btn.style.color = "var(--color-secondary)";
    });
  });
}
