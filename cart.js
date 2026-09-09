(async () => {
  const key='urbor-catalog-basket', el=id=>document.getElementById(id);
  const text=(en,bn)=>document.documentElement.lang==='bn'?bn:en;
  const money=n=>`৳ ${n.toLocaleString('en-BD',{maximumFractionDigits:2})}`;
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let products=new Map(), items={};
  function read() {
    try { const data=JSON.parse(localStorage.getItem(key)||'{}');items=Object.fromEntries(Object.entries(data&&typeof data==='object'?data:{}).filter(([id,n])=>products.has(id)&&Number.isSafeInteger(n)&&n>0)); }
    catch {items={};el('cart-status').textContent=text('Your saved basket could not be read.','সংরক্ষিত ঝুড়ি পড়া যায়নি।');}
  }
  function save() {
    try {localStorage.setItem(key,JSON.stringify(items));return true;}
    catch {el('cart-status').textContent=text('Changes could not be saved in this browser.','এই ব্রাউজারে পরিবর্তন সংরক্ষণ হয়নি।');return false;}
  }
  function render() {
    let count=0, cents=0, savings=0;
    el('cart-items').innerHTML=Object.entries(items).map(([id,n])=>{
      const p=products.get(id);count+=n;cents+=Math.round(p.price*100)*n;savings+=Math.max(0,Math.round((p.mrp-p.price)*100))*n;
      const name=text(p.name,p.nameBn||p.name), safe=escape(id), image=/^https:\/\//.test(p.image)?p.image:'content-assets/brand/logo-urbor.png';
      return `<article class="cart-item" data-id="${safe}"><a href="product.html?id=${encodeURIComponent(id)}"><img src="${escape(image)}" alt="${escape(name)}" loading="lazy"></a><div><h3><a href="product.html?id=${encodeURIComponent(id)}">${escape(name)}</a></h3><p>${escape(p.size)} · ${money(p.price)} ${text('each','প্রতিটি')}</p><div class="cart-item-controls"><div class="cart-quantity"><button type="button" data-action="minus" aria-label="${escape(text('Decrease quantity of ','পরিমাণ কমান ')+name)}" ${n===1?'disabled':''}>−</button><input type="number" min="1" max="999" value="${n}" data-quantity="${safe}" aria-label="${escape(text('Quantity for ','পরিমাণ ')+name)}"><button type="button" data-action="plus" aria-label="${escape(text('Increase quantity of ','পরিমাণ বাড়ান ')+name)}" ${n>=999?'disabled':''}>+</button></div><button type="button" class="cart-remove" data-action="remove">${text('Remove','সরান')}</button></div></div><strong class="cart-item-price">${money(Math.round(p.price*100)*n/100)}<small>${text('line total','মোট')}</small></strong></article>`;
    }).join('');
    el('cart-count').textContent=text(`${count} items`,`${count}টি পণ্য`);
    el('cart-subtotal').textContent=el('cart-total').textContent=money(cents/100);
    el('cart-savings').textContent=money(savings/100);el('cart-savings-row').hidden=savings===0;
    el('cart-layout').hidden=count===0;el('cart-empty').hidden=count!==0;
    document.querySelectorAll('.cart-item img').forEach(img=>img.onerror=()=>{img.onerror=null;img.src='content-assets/brand/logo-urbor.png';});
  }
  function update(id,n,action) {
    if(n===0)delete items[id];else items[id]=Math.min(999,Math.max(1,Math.floor(n)||1));
    const saved=save();render();
    if(saved)el('cart-status').textContent=text('Basket updated.','ঝুড়ি আপডেট হয়েছে।');
    const card=Array.from(document.querySelectorAll('.cart-item')).find(card=>card.dataset.id===id);
    if(card) (action?card.querySelector(`[data-action="${action}"]`):card.querySelector('input'))?.focus();
    else (document.querySelector('.cart-remove')||el('cart-empty').querySelector('a'))?.focus();
  }
  el('cart-items').addEventListener('click',e=>{
    const b=e.target.closest('[data-action]');if(!b||b.disabled)return;
    const id=b.closest('[data-id]').dataset.id;
    update(id,b.dataset.action==='remove'?0:items[id]+(b.dataset.action==='plus'?1:-1),b.dataset.action);
  });
  el('cart-items').addEventListener('change',e=>{if(e.target.matches('[data-quantity]'))update(e.target.dataset.quantity,Number(e.target.value));});
  try {
    const data=await globalThis.loadUrborCatalog();products=new Map(data.products.map(p=>[p.id,p]));read();render();el('cart-status').textContent='';
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    window.addEventListener('storage',e=>{if(e.key===key){read();render();}});
    window.addEventListener('pageshow',()=>{read();render();});
  }catch {el('cart-status').innerHTML='Your basket could not load. <a href="cart.html">Try again</a>';}
})();
