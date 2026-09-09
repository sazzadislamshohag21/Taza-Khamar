(() => {
  const products = [
    { name: "Morning greens bundle", category: "vegetables" },
    { name: "Himsagar mangoes", category: "fruits" },
    { name: "River fish box", category: "fish" },
    { name: "Slow-grown tomatoes", category: "vegetables" },
    { name: "Deshi chicken", category: "meat" },
    { name: "Free-range eggs", category: "eggs" }
  ];

  const finderQuestions = [
    {
      key: "household",
      prompt: { en: "Who's around your table?", bn: "আপনার টেবিলে কারা বসেন?" },
      description: { en: "Tell us a little about home and we'll make the first pick easy.", bn: "বাড়ি সম্পর্কে একটু বলুন, প্রথম পছন্দটি আমরা সহজ করে দেব।" },
      options: [
        { value: "solo", label: { en: "Just me", bn: "শুধু আমি" } },
        { value: "couple", label: { en: "Two hungry people", bn: "দুজন ক্ষুধার্ত মানুষ" } },
        { value: "family", label: { en: "A full family table", bn: "পুরো পরিবারের টেবিল" } }
      ]
    },
    {
      key: "rhythm",
      prompt: { en: "How often should good food arrive?", bn: "কত ঘন ঘন ভালো খাবার আসবে?" },
      description: { en: "Pick the rhythm that makes your kitchen feel happiest.", bn: "আপনার রান্নাঘরকে সবচেয়ে আনন্দিত করে এমন ছন্দ বেছে নিন।" },
      options: [
        { value: "daily", label: { en: "A little every day", bn: "প্রতিদিন একটু" } },
        { value: "weekly", label: { en: "A weekly restock", bn: "সাপ্তাহিক সংগ্রহ" } },
        { value: "occasion", label: { en: "For special tables", bn: "বিশেষ আয়োজনের জন্য" } }
      ]
    },
    {
      key: "taste",
      prompt: { en: "What sounds good right now?", bn: "এই মুহূর্তে কী খেতে ইচ্ছে করছে?" },
      description: { en: "No wrong answer. This is the fun bit.", bn: "ভুল উত্তর নেই। এটাই মজার অংশ।" },
      options: [
        { value: "greens", label: { en: "Bright greens", bn: "টাটকা সবুজ" } },
        { value: "seafood", label: { en: "Something from water", bn: "জল থেকে কিছু" } },
        { value: "all", label: { en: "A bit of everything", bn: "সবকিছু একটু একটু" } }
      ]
    }
  ];

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function filterProducts(category, collection = products) {
    if (category === "all") return collection;
    return collection.filter((product) => product.category === category);
  }

  function getLocationMessage(value) {
    const location = String(value || "").trim();
    return location
      ? `Great news — URBOR delivers to ${location}.`
      : "Enter your area or postcode to see what is fresh near you.";
  }

  function getFinderResult(answers = {}) {
    if (answers.household === "family" && answers.rhythm === "weekly" && answers.taste === "all") {
      return {
        title: "A weekly box for the whole table",
        titleBn: "পুরো পরিবারের জন্য সাপ্তাহিক বাক্স",
        copy: "A bright mix of everyday favourites, family-sized staples and one good surprise to try.",
        copyBn: "প্রতিদিনের পছন্দ, পরিবারের জন্য যথেষ্ট জিনিস আর চেষ্টা করার মতো একটি ভালো চমক।"
      };
    }
    if (answers.taste === "seafood") {
      return {
        title: "A catch worth gathering around",
        titleBn: "একসাথে বসে খাওয়ার মতো মাছ",
        copy: "We'll point you towards the freshest river and sea catches landing near your kitchen.",
        copyBn: "আপনার রান্নাঘরের কাছাকাছি পৌঁছানো সবচেয়ে টাটকা নদী ও সমুদ্রের মাছ দেখাব।"
      };
    }
    if (answers.taste === "greens") {
      return {
        title: "A brighter basket of greens",
        titleBn: "আরও টাটকা সবুজের ঝুড়ি",
        copy: "Start with leafy bundles, sun-ripened tomatoes and the things that make lunch sing.",
        copyBn: "শাকের বান্ডেল, রোদে পাকা টমেটো আর দুপুরের খাবারকে জমিয়ে তোলার জিনিস দিয়ে শুরু করুন।"
      };
    }
    return {
      title: "A box for the good days",
      titleBn: "ভালো দিনের জন্য একটি বাক্স",
      copy: "We'll start you with a thoughtful mix of everyday favourites and something new to try.",
      copyBn: "প্রতিদিনের পছন্দের সঙ্গে নতুন কিছু চেষ্টা করার মতো একটি সুন্দর মিশ্রণ দিয়ে শুরু করব।"
    };
  }

  globalThis.Sazzad = { validateEmail, filterProducts, getLocationMessage, getFinderResult };

  function init() {
    const root = document.documentElement;
    let currentLanguage = "en";
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const brandReplacements = [
      [/Sazzad/g, "URBOR"],
      [/sazzad/g, "urbor"],
      [/সাজ্জাদের/g, "আরবরের"],
      [/সাজ্জাদ/g, "আরবর"]
    ];
    const rebrand = (value) => brandReplacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value || "");
    document.querySelectorAll("[data-en], [data-bn]").forEach((element) => {
      if (element.dataset.en) element.dataset.en = rebrand(element.dataset.en);
      if (element.dataset.bn) element.dataset.bn = rebrand(element.dataset.bn);
    });
    const brandText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (brandText.nextNode()) {
      const parent = brandText.currentNode.parentElement;
      if (!parent?.closest("script, style")) brandText.currentNode.nodeValue = rebrand(brandText.currentNode.nodeValue);
    }
    document.querySelectorAll('a[href="mailto:hello@sazzad.bd"]').forEach((link) => link.href = "mailto:hello@urbor.bd");
    document.querySelectorAll('a[href="index.html#how-it-works"]').forEach((link) => link.href = "how-it-works.html");
    document.querySelectorAll('a[href="index.html#journal"]').forEach((link) => link.href = "journal.html");

    function replaceTextPreservingChildren(element, value) {
      if (!element.children.length) {
        element.textContent = value;
        return;
      }
      const textNode = Array.from(element.childNodes).find((node) => node.nodeType === 3 && node.nodeValue.trim());
      if (textNode) textNode.nodeValue = value;
      else element.insertBefore(document.createTextNode(value), element.firstChild);
    }

    function applyLanguage(language) {
      currentLanguage = language === "bn" ? "bn" : "en";
      root.lang = currentLanguage === "bn" ? "bn" : "en";
      document.querySelectorAll("[data-en][data-bn]").forEach((element) => {
        replaceTextPreservingChildren(element, element.dataset[currentLanguage]);
      });
      document.querySelectorAll("[data-placeholder-en][data-placeholder-bn]").forEach((element) => {
        element.placeholder = element.dataset[`placeholder${currentLanguage === "bn" ? "Bn" : "En"}`];
      });
      const toggle = document.getElementById("language-toggle");
      toggle?.setAttribute("aria-pressed", String(currentLanguage === "bn"));
      if (menuToggle) {
        const isOpen = menuToggle.classList.contains("is-open");
        menuToggle.setAttribute("aria-label", isOpen ? (currentLanguage === "bn" ? "মেনু বন্ধ করুন" : "Close menu") : (currentLanguage === "bn" ? "মেনু খুলুন" : "Open menu"));
      }
      renderFinderStep();
      if (!document.getElementById("finder-result")?.hidden) renderFinderResult();
    }

    document.getElementById("language-toggle")?.addEventListener("click", () => {
      applyLanguage(currentLanguage === "en" ? "bn" : "en");
    });

    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    function closeMobileMenu() {
      menuToggle?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      mobileMenu?.classList.remove("is-open");
      mobileMenu?.setAttribute("aria-hidden", "true");
      if (mobileMenu) mobileMenu.inert = true;
    }
    menuToggle?.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? (currentLanguage === "bn" ? "মেনু বন্ধ করুন" : "Close menu") : (currentLanguage === "bn" ? "মেনু খুলুন" : "Open menu"));
      mobileMenu?.classList.toggle("is-open", isOpen);
      mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
      if (mobileMenu) mobileMenu.inert = !isOpen;
    });
    mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));

    document.getElementById("location-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("location-input");
      const status = document.getElementById("location-status");
      const message = getLocationMessage(input.value);
      status.textContent = currentLanguage === "bn" && input.value.trim()
        ? `দারুণ খবর — সাজ্জাদ ${input.value.trim()} এলাকায় পৌঁছে দেয়।`
        : currentLanguage === "bn"
          ? "আপনার এলাকার তাজা খাবার দেখতে এলাকা বা পোস্টকোড লিখুন।"
          : message;
      status.classList.toggle("is-success", Boolean(input.value.trim()));
      if (!input.value.trim()) input.focus();
    });

    const filterButtons = [...document.querySelectorAll("[data-filter]")];
    const productCards = [...document.querySelectorAll("[data-product-category]")];
    function setFilter(category) {
      filterButtons.forEach((button) => {
        const active = button.dataset.filter === category;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      productCards.forEach((card) => {
        const visible = category === "all" || card.dataset.productCategory === category;
        card.classList.toggle("is-filtered-out", !visible);
        card.setAttribute("aria-hidden", String(!visible));
        if (visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && card.animate) {
          card.animate([{ opacity: .3, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'ease-out' });
        }
      });
    }
    filterButtons.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
    document.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;
        const available = filterProducts(category, products).length > 0;
        setFilter(available ? category : "all");
        document.getElementById("seasonal")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
    });

    let finderStep = 0;
    const finderAnswers = {};
    const finderQuestionState = document.getElementById("finder-question-state");
    const finderResult = document.getElementById("finder-result");
    const finderOptions = document.getElementById("finder-options");
    const finderNext = document.getElementById("finder-next");
    const finderPrevious = document.getElementById("finder-prev");

    function renderFinderStep() {
      if (!finderOptions || finderResult?.hidden === false) return;
      const question = finderQuestions[finderStep];
      const selected = finderAnswers[question.key];
      document.getElementById("finder-step-count").textContent = `0${finderStep + 1} / 03`;
      document.getElementById("finder-question").textContent = question.prompt[currentLanguage];
      document.getElementById("finder-description").textContent = question.description[currentLanguage];
      document.getElementById("finder-progress-bar").style.width = `${((finderStep + 1) / finderQuestions.length) * 100}%`;
      finderOptions.innerHTML = question.options.map((option, index) => `
        <button class="finder-option${selected === option.value ? " is-selected" : ""}" type="button" data-finder-value="${option.value}" aria-pressed="${selected === option.value}">
          <span class="finder-option__number">0${index + 1}</span><span>${option.label[currentLanguage]}</span>
        </button>`).join("");
      finderOptions.querySelectorAll("[data-finder-value]").forEach((option) => option.addEventListener("click", () => {
        finderAnswers[question.key] = option.dataset.finderValue;
        finderOptions.querySelectorAll("[data-finder-value]").forEach((item) => {
          const isSelected = item === option;
          item.classList.toggle("is-selected", isSelected);
          item.setAttribute("aria-pressed", String(isSelected));
        });
        finderNext.disabled = false;
      }));
      finderPrevious.disabled = finderStep === 0;
      finderNext.disabled = !selected;
      document.getElementById("finder-next-label").textContent = finderStep === finderQuestions.length - 1
        ? (currentLanguage === "bn" ? "আমার মিল দেখুন" : "See my match")
        : (currentLanguage === "bn" ? "পরের প্রশ্ন" : "Next question");
    }

    function renderFinderResult() {
      const result = getFinderResult(finderAnswers);
      document.getElementById("finder-result-title").textContent = currentLanguage === "bn" ? result.titleBn : result.title;
      document.getElementById("finder-result-copy").textContent = currentLanguage === "bn" ? result.copyBn : result.copy;
    }

    finderNext?.addEventListener("click", () => {
      if (!finderAnswers[finderQuestions[finderStep].key]) return;
      if (finderStep < finderQuestions.length - 1) {
        finderStep += 1;
        renderFinderStep();
      } else {
        renderFinderResult();
        finderQuestionState.hidden = true;
        finderResult.hidden = false;
        document.getElementById("finder-progress-bar").style.width = "100%";
      }
    });
    finderPrevious?.addEventListener("click", () => {
      if (finderStep > 0) {
        finderStep -= 1;
        renderFinderStep();
      }
    });
    document.getElementById("finder-reset")?.addEventListener("click", () => {
      finderStep = 0;
      Object.keys(finderAnswers).forEach((key) => delete finderAnswers[key]);
      finderQuestionState.hidden = false;
      finderResult.hidden = true;
      renderFinderStep();
    });

    document.getElementById("newsletter-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("newsletter-email");
      const status = document.getElementById("newsletter-status");
      if (!validateEmail(input.value)) {
        status.textContent = currentLanguage === "bn" ? "একটি সঠিক ইমেইল ঠিকানা লিখুন।" : "Pop in a valid email and we'll save you a seat.";
        status.classList.remove("is-success");
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }
      status.textContent = currentLanguage === "bn" ? "হয়ে গেল — শিগগিরই ভালো খবর আসছে।" : "You're in — good news is on its way.";
      status.classList.add("is-success");
      input.setAttribute("aria-invalid", "false");
    });

    document.querySelectorAll("img").forEach((image) => image.addEventListener("error", () => {
      image.hidden = true;
      image.closest(".media")?.classList.add("image-fallback");
    }));
    document.querySelectorAll("video").forEach((video) => video.addEventListener("error", () => video.classList.add("is-unavailable")));

    function revealElements() {
      if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
        return;
      }
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      }, { threshold: .12, rootMargin: "0px 0px -35px" });
      document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    }

    function countUp() {
      document.querySelectorAll("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count);
        if (reduceMotion) {
          element.textContent = target.toLocaleString();
          return;
        }
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 42));
        const tick = () => {
          current = Math.min(target, current + step);
          element.textContent = current.toLocaleString();
          if (current < target) window.requestAnimationFrame(tick);
        };
        tick();
      });
    }

    document.querySelectorAll('.category-rail').forEach(rail => {
      rail.tabIndex = 0;
      rail.setAttribute('aria-label', 'Product categories — scroll to explore');
      const wrap = rail.closest('.category-rail-wrap');
      const nav = wrap.querySelectorAll('[data-rail-step]');
      rail.querySelectorAll('.category-card').forEach((card, index) => card.style.setProperty('--category-index', index));
      const updateRail = () => {
        const max = rail.scrollWidth - rail.clientWidth;
        wrap.style.setProperty('--rail-progress', rail.scrollWidth ? Math.min(1, (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth) : 1);
        nav.forEach(button => {
          button.disabled = Number(button.dataset.railStep) < 0 ? rail.scrollLeft <= 1 : rail.scrollLeft >= max - 1;
        });
      };
      nav.forEach(button => button.addEventListener('click', () => {
        rail.scrollBy({ left: Number(button.dataset.railStep) * rail.clientWidth * .75, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }));
      rail.addEventListener('scroll', updateRail, { passive: true });
      window.addEventListener('resize', updateRail);
      updateRail();
      let drag = null;
      let suppressClick = false;
      rail.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch' || event.button !== 0) return;
        suppressClick = false;
        drag = { id: event.pointerId, x: event.clientX, left: rail.scrollLeft, moved: false };
      });
      rail.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const distance = event.clientX - drag.x;
        if (!drag.moved && Math.abs(distance) < 6) return;
        if (!drag.moved) rail.setPointerCapture(event.pointerId);
        drag.moved = true;
        suppressClick = true;
        rail.classList.add('is-dragging');
        rail.scrollLeft = drag.left - distance;
        event.preventDefault();
      });
      const stop = event => {
        if (!drag || drag.id !== event.pointerId) return;
        if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
        drag = null;
        rail.classList.remove('is-dragging');
      };
      rail.addEventListener('pointerup', stop);
      rail.addEventListener('pointerleave', event => { if (drag && !drag.moved) stop(event); });
      rail.addEventListener('pointercancel', stop);
      rail.addEventListener('lostpointercapture', stop);
      rail.addEventListener('click', event => {
        if (suppressClick && event.detail !== 0) {
          event.preventDefault(); event.stopImmediatePropagation(); suppressClick = false;
        }
      }, true);
      rail.addEventListener('dragstart', event => event.preventDefault());
      rail.addEventListener('wheel', event => {
        if (event.ctrlKey) return;
        const delta = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? rail.clientWidth : 1);
        const canScroll = delta > 0 ? rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 1 : rail.scrollLeft > 0;
        if (canScroll) { event.preventDefault(); rail.scrollLeft += delta; }
      }, { passive: false });
      rail.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'Home') rail.scrollLeft = 0;
        else if (event.key === 'End') rail.scrollLeft = rail.scrollWidth;
        else rail.scrollLeft += event.key === 'ArrowRight' ? 230 : -230;
      });
    });

    revealElements();
    countUp();
    applyLanguage("en");
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();
