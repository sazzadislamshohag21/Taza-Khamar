(async () => {
  const el=id=>document.getElementById(id);
  const bn=()=>document.documentElement.lang==='bn';
  const text=(en,bangla)=>bn()?bangla:en;
  const money=n=>`৳ ${n.toLocaleString('en-BD')}`;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let product, catalog;
  const quantity=()=>Math.min(99,Math.max(1,Math.floor(Number(el('product-quantity').value)||1)));
  const safeImage=p=>/^https:\/\//.test(p.image)?p.image:'content-assets/brand/logo-urbor.png';
  function render() {
    const name=bn()?product.nameBn:product.name;
    document.title=`${name} — URBOR`;
    for(const id of ['product-title','crumb-name'])el(id).textContent=name;
    el('product-category').textContent=product.source;
    el('product-size').textContent=product.size;
    el('product-price').textContent=money(product.price);
    el('product-mrp').textContent=product.mrp>product.price?money(product.mrp):'';
    el('product-saving').textContent=product.mrp>product.price?text('Save ','সাশ্রয় ')+money(product.mrp-product.price):'';
    el('product-image').src=safeImage(product);el('product-image').alt=name;
    el('product-description').textContent=product.description||text('No description is available for this item.','এই পণ্যের বিবরণ পাওয়া যায়নি।');
    el('fact-size').textContent=product.size;el('fact-category').textContent=product.source;
    el('product-add').disabled=product.blocked;
    if(product.blocked)el('product-add').textContent=text('Currently unavailable','বর্তমানে অনুপলব্ধ');
    const related=catalog.products.filter(p=>p.id!==product.id && p.categoryIds.some(id=>product.categoryIds.includes(id)&&![2,238,1479,1471].includes(id))).slice(0,4);
    el('product-related-grid').innerHTML=related.map(p=>`<a class="related-card" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${esc(safeImage(p))}" alt="${esc(bn()?p.nameBn:p.name)}" loading="lazy"><h3>${esc(bn()?p.nameBn:p.name)}</h3><p>${esc(p.size)}</p><strong>${money(p.price)}</strong></a>`).join('');
    document.querySelectorAll('#product-loaded img').forEach(img=>{img.onerror=()=>{img.onerror=null;img.src='content-assets/brand/logo-urbor.png';};});
  }
  try {
    catalog=await globalThis.loadUrborCatalog();
    const id=new URLSearchParams(location.search).get('id')||'6302';product=catalog.products.find(p=>p.id===id);
    if(!product){el('product-status').innerHTML='Product not found. <a href="shop.html">Return to the shop ↗</a>';return;}
    render();el('product-loaded').hidden=false;el('product-status').hidden=true;
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    el('quantity-minus').onclick=()=>el('product-quantity').value=Math.max(1,quantity()-1);
    el('quantity-plus').onclick=()=>el('product-quantity').value=Math.min(99,quantity()+1);
    el('product-quantity').onchange=()=>el('product-quantity').value=quantity();
    el('product-buy').onsubmit=e=>{
      e.preventDefault();if(product.blocked)return;
      try {
        let items=JSON.parse(localStorage.getItem('urbor-catalog-basket')||'{}');if(!items||typeof items!=='object'||Array.isArray(items))items={};
        items[product.id]=Math.max(0,Math.floor(Number(items[product.id])||0))+quantity();
        localStorage.setItem('urbor-catalog-basket',JSON.stringify(items));
        el('product-added').textContent=text(`${quantity()} added to your basket.`,`${quantity()}টি আপনার ঝুড়িতে যোগ হয়েছে।`);
      }catch{el('product-added').textContent=text('Your basket could not be saved. Please enable browser storage.','ঝুড়ি সংরক্ষণ হয়নি। ব্রাউজার স্টোরেজ চালু করুন।');}
    };
  }catch{el('product-status').innerHTML='Unable to load this product. <a href="product.html'+esc(location.search)+'">Try again ↗</a>';}
})();
