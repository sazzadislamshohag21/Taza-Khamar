(() => {
 const picks={
  'farmer-rahman-family-farm':['5937','6842','5936','6228'],
  'farmer-mitali-mango-house':[],
  'farmer-padma-catch':['13686','8717','52411','39436'],
  'farmer-nahars-garden':['6302'],
  'farmer-mayas-homestead':['5609','8474','4248','3158'],
  'farmer-madhupur-dairy':['2111','13596','21504','22337']
 };
 const id=document.getElementById('profile-main').dataset.farmerId;
 const grid=document.getElementById('profile-products'),status=document.getElementById('profile-products-status'),retry=document.getElementById('profile-products-retry');
 const text=(en,bn)=>document.documentElement.lang==='bn'?bn:en;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let products=[],phase='loading';
 function render(){
  status.textContent=phase==='loading'?text('Loading products…','পণ্য লোড হচ্ছে…'):phase==='error'?text('Products could not load. Please try again.','পণ্য লোড হয়নি। আবার চেষ্টা করুন।'):products.length?'':text('No matching products are currently listed in this catalog. Ask URBOR about availability.','এই তালিকায় এখন মিলে যাওয়া পণ্য নেই। প্রাপ্যতা সম্পর্কে উর্বরকে জিজ্ঞেস করুন।');
  grid.innerHTML=products.map(p=>{
   const name=text(p.name,p.nameBn||p.name),image=/^https:\/\//.test(p.image)?p.image:'content-assets/brand/logo-urbor.png';
   return `<a class="profile-product" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${esc(image)}" alt="${esc(name)}" loading="lazy"><div><h3>${esc(name)}</h3><p>${esc(p.size)}</p><strong>৳${p.price.toLocaleString('en-BD')}</strong><span class="profile-product-action">${text('View product','পণ্য দেখুন')} ↗</span></div></a>`;
  }).join('');
  grid.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.src='content-assets/brand/logo-urbor.png';},{once:true}));
  retry.hidden=phase!=='error';grid.setAttribute('aria-busy',String(phase==='loading'));
 }
 async function load(){phase='loading';render();try{
  const catalog=await globalThis.loadUrborCatalog();
  if(!Array.isArray(catalog.products))throw Error('Invalid catalog');
  products=(picks[id]||[]).map(id=>catalog.products.find(p=>p.id===id)).filter(p=>p&&!p.blocked);
  phase='ready';
 }catch{phase='error';}render();}
 retry.addEventListener('click',load);
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});load();
})();
