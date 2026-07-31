/* ==========================================================================
   Taza Khamar — Contact page
   ========================================================================== */

const FAQS = [
  {
    q: { en: "What areas do you currently deliver to?", bn: "আপনারা বর্তমানে কোন কোন এলাকায় ডেলিভারি দেন?" },
    a: { en: "We currently deliver across Dhaka, Chattogram, Sylhet, Khulna, Rajshahi and Comilla, with more cities being added regularly.", bn: "আমরা বর্তমানে ঢাকা, চট্টগ্রাম, সিলেট, খুলনা, রাজশাহী ও কুমিল্লায় ডেলিভারি দিই, এবং নিয়মিত নতুন শহর যুক্ত করছি।" },
  },
  {
    q: { en: "How do I know the meat is halal?", bn: "মাংস হালাল কিনা কীভাবে জানব?" },
    a: { en: "All our meat and poultry partner farms follow strict halal slaughtering and hygiene practices, verified by our sourcing team during on-site visits.", bn: "আমাদের সব মাংস ও পোল্ট্রি অংশীদার খামার কঠোর হালাল জবাই ও স্বাস্থ্যবিধি মেনে চলে, যা আমাদের টিম সরাসরি পরিদর্শন করে যাচাই করে।" },
  },
  {
    q: { en: "What payment methods are supported?", bn: "কোন কোন পেমেন্ট পদ্ধতি সমর্থিত?" },
    a: { en: "You can pay via bKash, Nagad, Rocket, or simply choose Cash on Delivery.", bn: "আপনি বিকাশ, নগদ, রকেট অথবা ক্যাশ অন ডেলিভারির মাধ্যমে পেমেন্ট করতে পারেন।" },
  },
  {
    q: { en: "What if my order isn't fresh?", bn: "অর্ডার তাজা না হলে কী হবে?" },
    a: { en: "We offer a freshness guarantee — if you're not satisfied, contact us within 24 hours for a replacement or full refund.", bn: "আমরা তাজা থাকার নিশ্চয়তা দিই — সন্তুষ্ট না হলে ২৪ ঘণ্টার মধ্যে যোগাযোগ করুন, আমরা পরিবর্তন বা সম্পূর্ণ টাকা ফেরত দেব।" },
  },
];

function renderFaq() {
  document.getElementById("faqAccordion").innerHTML = FAQS.map(
    (f, i) => `
    <div class="accordion-item ${i === 0 ? "open" : ""}">
      <button class="accordion-trigger">${getLang() === "bn" ? f.q.bn : f.q.en} ${icon("chevronDown")}</button>
      <div class="accordion-panel" style="${i === 0 ? "max-height:200px" : ""}"><p>${getLang() === "bn" ? f.a.bn : f.a.en}</p></div>
    </div>`
  ).join("");
  wireAccordions();
}

function renderContactInfo() {
  const items = [
    { icon: "phone", label: t("contact.phone"), value: "+880 1700-000000", sub: t("contact.hours") },
    { icon: "mail", label: t("contact.emailus"), value: "hello@tazakhamar.com.bd", sub: "" },
    { icon: "pin", label: t("contact.visit"), value: "House 24, Road 7, Dhanmondi, Dhaka 1205", sub: "" },
  ];
  document.getElementById("contactInfoCards").innerHTML = items
    .map(
      (i) => `
    <div class="card contact-info-card" style="padding:var(--sp-md);margin-bottom:var(--sp-sm)">
      <span class="icon-tile">${icon(i.icon)}</span>
      <div>
        <div style="font-size:var(--fs-xs);color:var(--color-text-faint)">${i.label}</div>
        <strong>${i.value}</strong>
        ${i.sub ? `<div style="font-size:var(--fs-xs);color:var(--color-text-faint)">${i.sub}</div>` : ""}
      </div>
    </div>`
    )
    .join("");
}

function initContact() {
  renderFaq();
  renderContactInfo();
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast(getLang() === "bn" ? "বার্তা পাঠানো হয়েছে!" : "Message sent!");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", initContact);
document.addEventListener("tk:langchange", () => {
  renderFaq();
  renderContactInfo();
});
