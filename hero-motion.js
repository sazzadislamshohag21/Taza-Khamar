(() => {
 const hero=document.querySelector('.hero-classic'),button=document.getElementById('hero-motion-toggle');
 if(!hero||!button)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let userPaused=false,visible=true;
 try { userPaused=localStorage.getItem('urbor-hero-motion-paused')==='true'; } catch {}
 let paused=preference.matches||userPaused;
 function render(){
  hero.classList.toggle('is-motion-paused',paused||!visible||document.hidden);button.setAttribute('aria-pressed',String(paused));
  const bn=document.documentElement.lang==='bn';button.textContent=paused?(bn?'অ্যানিমেশন চালু করুন':'Play motion'):(bn?'অ্যানিমেশন থামান':'Pause motion');
  button.hidden=preference.matches;
 }
 button.addEventListener('click',()=>{userPaused=!userPaused;paused=preference.matches||userPaused;try { localStorage.setItem('urbor-hero-motion-paused',String(userPaused)); } catch {}render();});
 preference.addEventListener('change',()=>{paused=preference.matches||userPaused;render();});
 document.addEventListener('visibilitychange',render);
 if('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;render();}).observe(hero);
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
