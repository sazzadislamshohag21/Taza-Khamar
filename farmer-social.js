(() => {
 const button=document.getElementById('save-farmer'),status=document.getElementById('save-status');
 const farmerId=document.getElementById('profile-main').dataset.farmerId;
 const key=farmerId==='farmer-mitali-mango-house'?'urbor-saved-mitali-profile':`urbor-saved-${farmerId}`;let saved=false;
 try{saved=localStorage.getItem(key)==='true';}catch{}
 const text=(en,bn)=>document.documentElement.lang==='bn'?bn:en;
 function render(){button.setAttribute('aria-pressed',String(saved));button.textContent=saved?text('✓ Saved','✓ সংরক্ষিত'):text('Save profile','পরিচয় সংরক্ষণ');}
 button.addEventListener('click',()=>{
  const next=!saved;
  try{localStorage.setItem(key,String(next));saved=next;status.textContent=saved?text('Profile saved in this browser.','এই ব্রাউজারে পরিচয় সংরক্ষিত হয়েছে।'):text('Profile removed from saved items.','সংরক্ষিত তালিকা থেকে পরিচয় সরানো হয়েছে।');}
  catch{status.textContent=text('This browser could not save the profile.','এই ব্রাউজারে পরিচয় সংরক্ষণ করা যায়নি।');}
  render();
 });new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
 const links=[...document.querySelectorAll('.social-nav a')];
 function activeLink(){
  let active=links[0];
  let distance=Infinity;
  for(const link of links){const section=document.querySelector(link.hash);const top=section.getBoundingClientRect().top;const score=Math.abs(top-180);if(score<distance){distance=score;active=link;}}
  links.forEach(link=>{if(link===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
 }
 let scheduled=false;
 window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{activeLink();scheduled=false;});}},{passive:true});
 activeLink();
})();
