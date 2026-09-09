(() => {
 const el=id=>document.getElementById(id), amount=el('invest-amount'), form=el('investment-form');
 const text=(en,bn)=>document.documentElement.lang==='bn'?bn:en;
 const valid=()=>Number.isSafeInteger(Number(amount.value)) && Number(amount.value)>=5000 && Number(amount.value)<=50000000;
 const duration=()=>form.querySelector('[name=duration]:checked').value;
 function render(){
  const ok=valid();
  el('summary-amount').textContent=ok?`৳${Number(amount.value).toLocaleString('en-BD')}`:'—';
  el('summary-duration').textContent=text(`${duration()} months`,`${Number(duration()).toLocaleString('bn-BD')} মাস`);
  el('amount-error').textContent=ok?'':text('Enter a whole amount between ৳5,000 and ৳50,000,000.','৳৫,০০০ থেকে ৳৫,০০,০০,০০০-এর মধ্যে পূর্ণ পরিমাণ লিখুন।');
  amount.setAttribute('aria-invalid',String(!ok));
  document.querySelectorAll('[data-amount]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.amount)===Number(amount.value))));
 }
 document.querySelectorAll('[data-amount]').forEach(b=>b.addEventListener('click',()=>{amount.value=b.dataset.amount;render();}));
 form.addEventListener('input',render);
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!valid()){render();amount.focus();return;}
  const body=`Hello URBOR,\n\nI would like to discuss an investment.\nName: ${el('invest-name').value.trim()}\nEmail: ${el('invest-email').value}\nAmount: BDT ${Number(amount.value)}\nPreferred duration: ${duration()} months\n\nPlease share availability, risks, returns and written terms.`;
  location.href=`mailto:hello@urbor.bd?subject=${encodeURIComponent('URBOR investment inquiry')}&body=${encodeURIComponent(body)}`;
  el('inquiry-status').textContent=text('Email draft requested. Send it from your email app, or contact hello@urbor.bd.','ইমেইল খসড়া খোলার অনুরোধ করা হয়েছে। আপনার ইমেইল অ্যাপ থেকে পাঠান অথবা hello@urbor.bd-এ যোগাযোগ করুন।');
 });
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
