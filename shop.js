(() => {
  const products = [];
  const aliases = { vegetables: [12], fruits: [11], fish: [1235, 1238], meat: [23], dairy: [58], eggs: [61], rice: [80], honey: [77], pantry: [104, 100] };
  function filterProducts(category, collection = products) {
    if (category === 'all') return collection;
    return collection.filter(p => p.category === category || (p.categoryIds || []).some(id => (aliases[category] || [Number(category)]).includes(id)));
  }
  function searchProducts(query, collection = products) {
    const words = String(query || '').trim().toLowerCase().split(/\s+/);
    return collection.filter(p => words.every(word => `${p.name} ${p.nameBn || ''} ${p.source || ''} ${p.size || ''} ${p.category || ''}`.toLowerCase().includes(word)));
  }
  function sortProducts(sort, collection = products) {
    const result = [...collection];
    if (sort === 'price-low') result.sort((a,b) => a.price-b.price);
    if (sort === 'price-high') result.sort((a,b) => b.price-a.price);
    if (sort === 'name') result.sort((a,b) => a.name.localeCompare(b.name));
    return result;
  }
  function calculateBasket(items = {}, collection = products) {
    const lookup = new Map(collection.map(p => [p.id,p]));
    return Object.entries(items).reduce((sum,[id,n]) => {
      const p = lookup.get(id), quantity = Math.max(0, Math.floor(Number(n) || 0));
      if (p && quantity) { sum.count += quantity; sum.total += Math.round(p.price * 100) * quantity / 100; }
      return sum;
    }, {count:0,total:0});
  }
  globalThis.SazzadShop = {products,filterProducts,searchProducts,sortProducts,calculateBasket};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function initShop() {
    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;
    const el = id => document.getElementById(id);
    const bn = () => document.documentElement.lang === 'bn';
    const text = (en, bangla) => bn() ? bangla : en;
    const money = value => `৳ ${value.toLocaleString('en-BD')}`;
    const state = {category:'all',query:'',sort:'just-in',page:1,items:{}};
    const pageSize = 24;
    let categories = [], ready = false;
    try { const stored = JSON.parse(localStorage.getItem('urbor-catalog-basket') || '{}'); if (stored && typeof stored === 'object' && !Array.isArray(stored)) state.items = stored; } catch {}
    function renderBasket() {
      const sum = calculateBasket(state.items);
      document.querySelectorAll('[data-shop-basket-count]').forEach(e => e.textContent = sum.count);
      document.querySelectorAll('[data-shop-basket-total]').forEach(e => e.textContent = money(sum.total));
      el('shop-basket-lines').innerHTML = Object.entries(state.items).flatMap(([id,n]) => {
        const p = products.find(p => p.id === id); if (!p || n <= 0) return [];
        return [`<div class="shop-basket-line"><span>${n} × ${escape(bn()?p.nameBn:p.name)}<button class="catalog-remove" data-remove="${escape(id)}" aria-label="${escape(text('Remove ','সরান ') + p.name)}">${text('Remove','সরান')}</button></span><strong>${money(p.price*n)}</strong></div>`];
      }).join('') || `<p class="shop-basket-empty">${text('Your basket is waiting for something good.','আপনার ঝুড়ি এখনও খালি।')}</p>`;
      try { localStorage.setItem('urbor-catalog-basket',JSON.stringify(state.items)); } catch {}
    }
    function renderCategories() {
      el('catalog-category').innerHTML = `<option value="all">${text('All products','সব পণ্য')}</option>` + categories.filter(c => products.some(p => p.categoryIds.includes(Number(c.id)))).map(c => `<option value="${escape(c.id)}">${escape(bn()?c.nameBn:c.name)}</option>`).join('');
      el('catalog-category').value = aliases[state.category] ? 'all' : state.category;
      const departments = ['2','81','1240','1553','209','30','3','229','1574','1648','1484','1417'];
      const counts = new Map(categories.map(c => [c.id, products.filter(p => p.categoryIds.includes(Number(c.id))).length]));
      function branch(parent, seen = new Set()) {
        if (seen.has(parent)) return '';
        const visited = new Set([...seen,parent]);
        return categories.filter(c => c.parent === parent).map(c => {
          const children = branch(c.id, visited);
          const button = `<button type="button" data-catalog-category="${c.id}" aria-pressed="${state.category===c.id}">${escape(bn()?c.nameBn:c.name)} <small>${counts.get(c.id)}</small></button>`;
          return children ? `<details><summary>${escape(bn()?c.nameBn:c.name)}</summary>${button}<div class="catalog-subcategories">${children}</div></details>` : button;
        }).join('');
      }
      el('catalog-departments').innerHTML = departments.map(id => {
        const c = categories.find(c => c.id===id);
        return `<details class="catalog-department"><summary><span>${escape(bn()?c.nameBn:c.name)}</span><small>${counts.get(id)}</small></summary><button type="button" data-catalog-category="${id}" aria-pressed="${state.category===id}">${text('Shop all','সব দেখুন')} ${escape(bn()?c.nameBn:c.name)}</button><div class="catalog-subcategories">${branch(id)}</div></details>`;
      }).join('');
    }
    function renderProducts() {
      if (!ready) return;
      const matches = sortProducts(state.sort,searchProducts(state.query,filterProducts(state.category)));
      const pages = Math.max(1,Math.ceil(matches.length/pageSize));
      state.page = Math.min(state.page,pages);
      const start = (state.page-1)*pageSize;
      grid.innerHTML = matches.slice(start,start+pageSize).map(p => {
        const name = bn()?p.nameBn:p.name;
        const image = /^https:\/\//.test(p.image) ? p.image : 'content-assets/brand/logo-urbor.png';
        return `<article class="product-card shop-product-card" data-product-id="${escape(p.id)}"><a href="product.html?id=${encodeURIComponent(p.id)}" class="product-media product-media--catalog media" style="display:block"><img src="${escape(image)}" alt="${escape(name)}" loading="lazy" decoding="async"></a><div class="product-info"><p class="product-source">${escape(p.source)}</p><h3><a href="product.html?id=${encodeURIComponent(p.id)}">${escape(name)}</a></h3><p class="catalog-size">${escape(p.size)}</p><div class="product-bottom"><strong>${money(p.price)} ${p.mrp>p.price?`<del>${money(p.mrp)}</del>`:''}</strong><button class="shop-add" type="button" data-product-id="${escape(p.id)}" aria-label="${escape(text('Add ','যোগ করুন ')+name)}" ${p.blocked?'disabled':''}>${p.blocked?text('Unavailable','অনুপলব্ধ'):text('+ add','+ যোগ')}</button></div><details class="catalog-details"><summary>${text('Product details','পণ্যের বিবরণ')}</summary><p>${escape(p.description || text('No description available.','বিবরণ পাওয়া যায়নি।'))}</p></details></div></article>`;
      }).join('');
      grid.querySelectorAll('img').forEach(img => img.addEventListener('error', () => { img.src='content-assets/brand/logo-urbor.png'; }, {once:true}));
      el('shop-empty-state').hidden = matches.length > 0;
      el('shop-results-status').textContent = text(`${matches.length.toLocaleString()} products · Showing ${matches.length?start+1:0}–${Math.min(start+pageSize,matches.length)}`,`${matches.length}টি পণ্য · ${matches.length?start+1:0}–${Math.min(start+pageSize,matches.length)} দেখানো হচ্ছে`);
      el('catalog-page').textContent = text(`Page ${state.page} of ${pages}`,`পৃষ্ঠা ${state.page} / ${pages}`);
      el('catalog-prev').disabled = state.page === 1;
      el('catalog-next').disabled = state.page === pages;
      el('catalog-prev').textContent = text('← Previous','← আগের');
      el('catalog-next').textContent = text('Next →','পরের →');
      renderBasket();
    }
    function setCategory(value) {
      state.category=value; state.page=1;
      document.querySelectorAll('[data-shop-filter], [data-shop-category]').forEach(button => {
        const active = (button.dataset.shopFilter || button.dataset.shopCategory) === value;
        button.classList.toggle('is-active',active); button.setAttribute('aria-pressed',String(active));
      });
      el('catalog-category').value=aliases[value]?'all':value;
      document.querySelectorAll('[data-catalog-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.catalogCategory===value)));
      renderProducts();
    }
    document.querySelectorAll('[data-shop-filter], [data-shop-category]').forEach(b => b.addEventListener('click',()=>setCategory(b.dataset.shopFilter || b.dataset.shopCategory)));
    el('catalog-category').addEventListener('change',e=>setCategory(e.target.value));
    el('catalog-departments').addEventListener('click',e=>{
      const button=e.target.closest('[data-catalog-category]');
      if(button){setCategory(button.dataset.catalogCategory);el('shop-results-status').scrollIntoView({block:'start'});}
    });
    el('shop-search').addEventListener('input',e=>{state.query=e.target.value;state.page=1;renderProducts();});
    el('shop-sort').addEventListener('change',e=>{state.sort=e.target.value;state.page=1;renderProducts();});
    ['prev','next'].forEach(direction=>el(`catalog-${direction}`).addEventListener('click',()=>{
      state.page += direction==='next'?1:-1;renderProducts();el('shop-results-status').scrollIntoView({block:'start'});
    }));
    grid.addEventListener('click',e=>{
      const b=e.target.closest('.shop-add');if(!b || b.disabled)return;
      const id=b.dataset.productId;const p=products.find(p=>p.id===id);if(!p || p.blocked)return;
      state.items[id]=(Number(state.items[id])||0)+1;
      b.textContent=text('added','যোগ হয়েছে');el('shop-basket-status').textContent=text('Added to your basket.','আপনার ঝুড়িতে যোগ হয়েছে।');renderBasket();
    });
    el('shop-basket-lines').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){delete state.items[b.dataset.remove];renderBasket();}});
    document.querySelectorAll('[data-shop-review-basket]').forEach(b=>b.addEventListener('click',()=>{location.href='cart.html';}));
    el('shop-location-form')?.addEventListener('submit',e=>{e.preventDefault();el('shop-location-status').textContent=text('Showing the Dhaka catalog.','ঢাকার পণ্য দেখানো হচ্ছে।');});
    new MutationObserver(()=>{if(ready){renderCategories();renderProducts();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    async function load() {
      el('catalog-retry').hidden=true;grid.setAttribute('aria-busy','true');
      el('shop-results-status').textContent=text('Loading products…','পণ্য লোড হচ্ছে…');
      try {
        const data=await globalThis.loadUrborCatalog();if(!Array.isArray(data.products)||!data.products.length)throw Error('Empty catalog');
        products.splice(0,products.length,...data.products);categories=data.categories;
        state.items=Object.fromEntries(Object.entries(state.items).filter(([id,n])=>products.some(p=>p.id===id)&&Number.isSafeInteger(n)&&n>0));
        ready=true;renderCategories();renderProducts();
      } catch {el('shop-results-status').textContent=text('Products could not load. Please try again.','পণ্য লোড হয়নি। আবার চেষ্টা করুন।');el('catalog-retry').hidden=false;}
      finally {grid.setAttribute('aria-busy','false');}
    }
    el('catalog-retry').addEventListener('click',load);
    await load();
  }
  if(typeof document!=='undefined') {
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initShop);else initShop();
  }
})();
