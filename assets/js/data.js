/* ==========================================================================
   Taza Khamar — Static demo data (products, farmers, guides, locations)
   ========================================================================== */

const CATEGORIES = [
  { id: "fish", name: "Fish", nameBn: "মাছ", icon: "fish", color: "primary", photo: "https://images.unsplash.com/photo-1756364088129-d8040160220c" },
  { id: "meat", name: "Meat", nameBn: "মাংস", icon: "drumstick", color: "secondary", photo: "https://images.unsplash.com/photo-1695088224287-bb10a886fce4" },
  { id: "poultry", name: "Poultry & Eggs", nameBn: "মুরগি ও ডিম", icon: "egg", color: "accent", photo: "https://images.unsplash.com/photo-1570802685082-2224bd954723" },
  { id: "vegetables", name: "Vegetables", nameBn: "সবজি", icon: "carrot", color: "primary", photo: "https://images.unsplash.com/photo-1757627550652-30788bfce978" },
  { id: "fruits", name: "Fruits", nameBn: "ফল", icon: "apple", color: "secondary", photo: "https://images.unsplash.com/photo-1757281096712-d0c9fb17d608" },
  { id: "dairy", name: "Dairy", nameBn: "দুগ্ধজাত", icon: "milk", color: "accent", photo: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { id: "honey", name: "Honey", nameBn: "মধু", icon: "honey", color: "primary", photo: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" },
];

const HERO_PHOTO = "https://images.unsplash.com/photo-1731826000529-11e4abc92e78";

const LOCATIONS = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Comilla"];

const PACKAGE_OPTIONS = {
  kg: [{ label: "500g", mult: 0.5 }, { label: "1kg", mult: 1 }, { label: "2kg", mult: 2 }],
  litre: [{ label: "500ml", mult: 0.5 }, { label: "1L", mult: 1 }, { label: "2L", mult: 2 }],
};

const DIVISIONS = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];

const PRODUCTS = [
  { id: "hilsa", category: "fish", name: "Fresh Hilsa Fish", nameBn: "ইলিশ মাছ", farmer: "Karim Mollah", farmerId: "karim", district: "Chandpur", price: 1450, unit: "kg", oldPrice: 1650, rating: 4.8, reviews: 212, icon: "fish", popular: true, photo: "https://images.unsplash.com/photo-1500732941508-38ffe21600d5", desc: "Wild-caught river Hilsa, iced within hours of catch for peak freshness and flavour.", descBn: "নদী থেকে ধরা তাজা ইলিশ, ধরার কয়েক ঘণ্টার মধ্যেই বরফজাত করা হয়।" },
  { id: "rui", category: "fish", name: "Rui Fish", nameBn: "রুই মাছ", farmer: "Abdur Rahim", farmerId: "rahim", district: "Mymensingh", price: 380, unit: "kg", rating: 4.6, reviews: 98, icon: "fish", photo: "https://images.unsplash.com/photo-1565269403467-4c86f05a4d65", desc: "Farm-raised Rui from clean pond water, cut to order.", descBn: "পরিষ্কার পুকুরের পানিতে চাষ করা রুই মাছ, অর্ডার অনুযায়ী কাটা হয়।" },
  { id: "katla", category: "fish", name: "Katla Fish", nameBn: "কাতলা মাছ", farmer: "Abdur Rahim", farmerId: "rahim", district: "Mymensingh", price: 350, unit: "kg", rating: 4.5, reviews: 76, icon: "fish", photo: "https://images.unsplash.com/photo-1521120795805-a189ab807138", desc: "Firm, meaty Katla — a household favourite for curry.", descBn: "ঘন মাংসল কাতলা মাছ, তরকারির জন্য জনপ্রিয়।" },
  { id: "prawn", category: "fish", name: "Golda Prawn", nameBn: "গলদা চিংড়ি", farmer: "Fatema Begum", farmerId: "fatema", district: "Khulna", price: 980, unit: "kg", rating: 4.9, reviews: 154, icon: "fish", popular: true, photo: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47", desc: "Premium river prawn from the Sundarban delta ghers.", descBn: "সুন্দরবন উপকূলের ঘের থেকে প্রিমিয়াম গলদা চিংড়ি।" },
  { id: "pangas", category: "fish", name: "Pangas Fish", nameBn: "পাঙাশ মাছ", farmer: "Fatema Begum", farmerId: "fatema", district: "Khulna", price: 220, unit: "kg", rating: 4.3, reviews: 61, icon: "fish", photo: "https://images.unsplash.com/photo-1759419048034-e82d12086df1", desc: "Boneless-friendly, budget-friendly everyday fish.", descBn: "সহজে রান্না করা যায় এমন সাশ্রয়ী মূল্যের মাছ।" },
  { id: "koi", category: "fish", name: "Koi Fish", nameBn: "কই মাছ", farmer: "Karim Mollah", farmerId: "karim", district: "Chandpur", price: 420, unit: "kg", rating: 4.4, reviews: 42, icon: "fish", photo: "https://images.unsplash.com/photo-1762036997158-50fa6e41ecbd", desc: "Live-tank Koi, delivered same-day for maximum freshness.", descBn: "জীবন্ত কই মাছ, সর্বোচ্চ সতেজতার জন্য একই দিনে ডেলিভারি।" },

  { id: "beef", category: "meat", name: "Premium Beef", nameBn: "গরুর মাংস", farmer: "Jasim Uddin", farmerId: "jasim", district: "Pabna", price: 780, unit: "kg", oldPrice: 850, rating: 4.7, reviews: 301, icon: "drumstick", popular: true, halal: true, photo: "https://images.unsplash.com/photo-1690983321402-35ff91692b56", desc: "Grass-fed beef from grazing herds, hand-cut and vacuum-packed.", descBn: "মাঠে চরে বেড়ানো গরুর তাজা মাংস, হাতে কাটা এবং প্যাকেটজাত।" },
  { id: "mutton", category: "meat", name: "Khashi (Mutton)", nameBn: "খাসির মাংস", farmer: "Jasim Uddin", farmerId: "jasim", district: "Pabna", price: 1100, unit: "kg", rating: 4.8, reviews: 168, icon: "drumstick", halal: true, photo: "https://images.unsplash.com/photo-1687704488504-2d5018a64a24", desc: "Tender khashi from free-range goats, aged for better flavour.", descBn: "উন্মুক্ত পরিবেশে পালিত খাসির নরম মাংস।" },
  { id: "buffalo", category: "meat", name: "Buffalo Meat", nameBn: "মহিষের মাংস", farmer: "Rafiqul Islam", farmerId: "rafiqul", district: "Bogura", price: 650, unit: "kg", rating: 4.4, reviews: 53, icon: "drumstick", halal: true, photo: "https://images.unsplash.com/photo-1523715201095-8bc5927fa2bf", desc: "Lean buffalo meat, a great everyday alternative to beef.", descBn: "কম চর্বিযুক্ত মহিষের মাংস, প্রতিদিনের জন্য উপযোগী।" },

  { id: "deshi-chicken", category: "poultry", name: "Deshi Chicken", nameBn: "দেশি মুরগি", farmer: "Nasrin Akter", farmerId: "nasrin", district: "Gazipur", price: 520, unit: "kg", rating: 4.9, reviews: 245, icon: "drumstick", popular: true, halal: true, photo: "https://images.unsplash.com/photo-1682991136736-a2b44623eeba", desc: "Free-range deshi chicken, raised without antibiotics or hormones.", descBn: "অ্যান্টিবায়োটিক ছাড়াই লালিত দেশি মুরগি।" },
  { id: "broiler-chicken", category: "poultry", name: "Broiler Chicken", nameBn: "ব্রয়লার মুরগি", farmer: "Nasrin Akter", farmerId: "nasrin", district: "Gazipur", price: 210, unit: "kg", rating: 4.2, reviews: 132, icon: "drumstick", halal: true, photo: "https://images.unsplash.com/photo-1587593810167-a84920ea0781", desc: "Freshly processed broiler chicken, cleaned and cut to preference.", descBn: "সদ্য প্রক্রিয়াজাত ব্রয়লার মুরগি, পছন্দমতো কাটা।" },
  { id: "duck", category: "poultry", name: "Farm Duck", nameBn: "হাঁস", farmer: "Nasrin Akter", farmerId: "nasrin", district: "Gazipur", price: 480, unit: "kg", rating: 4.6, reviews: 39, icon: "drumstick", halal: true, photo: "https://images.unsplash.com/photo-1586276633990-fb6092e2de01", desc: "Pond-raised duck, rich flavour, popular for winter bhuna.", descBn: "পুকুর পাড়ে পালিত হাঁস, শীতের ভুনার জন্য জনপ্রিয়।" },
  { id: "hen-egg", category: "poultry", name: "Farm Fresh Eggs (12pc)", nameBn: "মুরগির ডিম (১২টি)", farmer: "Nasrin Akter", farmerId: "nasrin", district: "Gazipur", price: 150, unit: "dozen", rating: 4.7, reviews: 289, icon: "egg", popular: true, photo: "https://images.unsplash.com/photo-1576522488962-332e43c2ca12", desc: "Free-range hen eggs collected daily.", descBn: "প্রতিদিন সংগ্রহ করা মুক্তচারী মুরগির ডিম।" },
  { id: "duck-egg", category: "poultry", name: "Duck Eggs (12pc)", nameBn: "হাঁসের ডিম (১২টি)", farmer: "Nasrin Akter", farmerId: "nasrin", district: "Gazipur", price: 190, unit: "dozen", rating: 4.5, reviews: 71, icon: "egg", photo: "https://images.unsplash.com/photo-1617440168937-c6497eaa8db5", desc: "Rich, creamy duck eggs great for bakes and curries.", descBn: "বেকিং ও তরকারির জন্য উপযুক্ত সমৃদ্ধ হাঁসের ডিম।" },

  { id: "tomato", category: "vegetables", name: "Tomato", nameBn: "টমেটো", farmer: "Rafiqul Islam", farmerId: "rafiqul", district: "Bogura", price: 55, unit: "kg", rating: 4.3, reviews: 87, icon: "carrot", photo: "https://images.unsplash.com/photo-1591771999855-b21c9b0081d2", desc: "Vine-ripened tomatoes picked the same morning.", descBn: "সকালেই তোলা পাকা টমেটো।" },
  { id: "potato", category: "vegetables", name: "Potato", nameBn: "আলু", farmer: "Rafiqul Islam", farmerId: "rafiqul", district: "Bogura", price: 32, unit: "kg", rating: 4.5, reviews: 143, icon: "carrot", popular: true, photo: "https://images.unsplash.com/photo-1675501344642-92d35d90fe51", desc: "Fresh-dug potatoes from Bogura's fertile fields.", descBn: "বগুড়ার উর্বর জমি থেকে সদ্য তোলা আলু।" },
  { id: "eggplant", category: "vegetables", name: "Eggplant (Begun)", nameBn: "বেগুন", farmer: "Rafiqul Islam", farmerId: "rafiqul", district: "Bogura", price: 60, unit: "kg", rating: 4.2, reviews: 44, icon: "carrot", photo: "https://images.unsplash.com/photo-1690487966073-f2ba29a7eb7c", desc: "Glossy, firm eggplants perfect for bhorta or fry.", descBn: "ভর্তা বা ভাজির জন্য উপযুক্ত টাটকা বেগুন।" },
  { id: "pumpkin", category: "vegetables", name: "Sweet Pumpkin", nameBn: "মিষ্টি কুমড়া", farmer: "Hasina Khatun", farmerId: "hasina", district: "Rangpur", price: 40, unit: "kg", rating: 4.4, reviews: 33, icon: "carrot", photo: "https://images.unsplash.com/photo-1571788749315-9586ff764f6a", desc: "Naturally sweet pumpkin, great for bhaji and soups.", descBn: "প্রাকৃতিকভাবে মিষ্টি কুমড়া, ভাজি ও স্যুপের জন্য দারুণ।" },
  { id: "spinach", category: "vegetables", name: "Spinach (Palong Shak)", nameBn: "পালং শাক", farmer: "Hasina Khatun", farmerId: "hasina", district: "Rangpur", price: 25, unit: "bunch", rating: 4.6, reviews: 58, icon: "leaf", photo: "https://images.unsplash.com/photo-1576045057995-568f588f82fb", desc: "Tender leafy spinach, harvested fresh every morning.", descBn: "প্রতিদিন সকালে তোলা কচি পালং শাক।" },

  { id: "mango", category: "fruits", name: "Himsagar Mango", nameBn: "হিমসাগর আম", farmer: "Salma Khatun", farmerId: "salma", district: "Chapainawabganj", price: 130, unit: "kg", rating: 4.9, reviews: 402, icon: "apple", popular: true, photo: "https://images.unsplash.com/photo-1757281096712-d0c9fb17d608", desc: "Sweet, fibreless Himsagar mango from Rajshahi's orchards.", descBn: "রাজশাহীর বাগান থেকে মিষ্টি আঁশহীন হিমসাগর আম।" },
  { id: "jackfruit", category: "fruits", name: "Jackfruit (Kathal)", nameBn: "কাঁঠাল", farmer: "Salma Khatun", farmerId: "salma", district: "Chapainawabganj", price: 350, unit: "piece", rating: 4.3, reviews: 29, icon: "apple", photo: "https://images.unsplash.com/photo-1569692150405-6fe2ef19d16e", desc: "The national fruit — sweet, ripe, and hand-picked.", descBn: "জাতীয় ফল — মিষ্টি, পাকা ও হাতে তোলা।" },
  { id: "lychee", category: "fruits", name: "Lychee (Litchi)", nameBn: "লিচু", farmer: "Salma Khatun", farmerId: "salma", district: "Chapainawabganj", price: 420, unit: "100pc", rating: 4.7, reviews: 88, icon: "apple", photo: "https://images.unsplash.com/photo-1569294860071-b2ac12ee73b7", desc: "Juicy Dinajpur-variety lychee, in season.", descBn: "রসালো দিনাজপুরি জাতের লিচু, মৌসুমি।" },
  { id: "banana", category: "fruits", name: "Sagor Banana", nameBn: "সাগর কলা", farmer: "Hasina Khatun", farmerId: "hasina", district: "Rangpur", price: 60, unit: "dozen", rating: 4.5, reviews: 66, icon: "apple", photo: "https://images.unsplash.com/photo-1662150681339-867e940ea30d", desc: "Naturally ripened banana, no carbide used.", descBn: "প্রাকৃতিকভাবে পাকানো কলা, কোনো কার্বাইড ব্যবহার হয় না।" },

  { id: "milk", category: "dairy", name: "Fresh Cow Milk", nameBn: "গরুর দুধ", farmer: "Jasim Uddin", farmerId: "jasim", district: "Pabna", price: 90, unit: "litre", rating: 4.8, reviews: 176, icon: "milk", popular: true, photo: "https://images.unsplash.com/photo-1550583724-b2692b85b150", desc: "Unadulterated, pasteurised cow milk delivered chilled.", descBn: "ভেজালমুক্ত, পাস্তুরিত ঠান্ডা দুধ ডেলিভারি করা হয়।" },
  { id: "yogurt", category: "dairy", name: "Traditional Doi", nameBn: "টক দই", farmer: "Jasim Uddin", farmerId: "jasim", district: "Pabna", price: 140, unit: "kg", rating: 4.9, reviews: 112, icon: "milk", photo: "https://images.unsplash.com/photo-1501959915551-4e8d30928317", desc: "Pabna-style clay-pot yogurt, thick and tangy.", descBn: "পাবনার মাটির পাত্রে তৈরি ঘন টক দই।" },

  { id: "sundarban-honey", category: "honey", name: "Sundarban Wild Honey", nameBn: "সুন্দরবনের মধু", farmer: "Fatema Begum", farmerId: "fatema", district: "Khulna", price: 850, unit: "500g", rating: 4.9, reviews: 231, icon: "honey", popular: true, photo: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62", desc: "Raw wild honey harvested sustainably from the Sundarbans.", descBn: "সুন্দরবন থেকে টেকসইভাবে সংগৃহীত খাঁটি মধু।" },
  { id: "litchi-honey", category: "honey", name: "Litchi Flower Honey", nameBn: "লিচু ফুলের মধু", farmer: "Salma Khatun", farmerId: "salma", district: "Chapainawabganj", price: 780, unit: "500g", rating: 4.7, reviews: 94, icon: "honey", photo: "https://images.unsplash.com/photo-1568657704598-602700bd9694", desc: "Delicately floral honey from lychee orchard apiaries.", descBn: "লিচু বাগানের মৌচাক থেকে সংগৃহীত সুগন্ধি মধু।" },
];

const FARMERS = [
  { id: "karim", name: "Karim Mollah", district: "Chandpur", division: "Chattogram", specialty: "Hilsa & river fish", specialtyBn: "ইলিশ ও নদীর মাছ", years: 18, quote: "Every Hilsa reaches you within a day of leaving the Padma.", quoteBn: "পদ্মা থেকে ওঠার একদিনের মধ্যেই ইলিশ আপনার হাতে পৌঁছায়।", icon: "fish", photo: "https://images.unsplash.com/photo-1558289282-647de9fdf608" },
  { id: "rahim", name: "Abdur Rahim", district: "Mymensingh", division: "Mymensingh", specialty: "Pond-raised fish", specialtyBn: "পুকুরের মাছ চাষ", years: 22, quote: "Clean water and patience make the best Rui and Katla.", quoteBn: "পরিষ্কার পানি আর ধৈর্যেই সেরা রুই-কাতলা হয়।", icon: "fish", photo: "https://images.unsplash.com/photo-1755921739124-3519f4045cba" },
  { id: "fatema", name: "Fatema Begum", district: "Khulna", division: "Khulna", specialty: "Prawn & wild honey", specialtyBn: "চিংড়ি ও মধু", years: 14, quote: "The Sundarbans give generously, if you respect its balance.", quoteBn: "সুন্দরবনের ভারসাম্য রক্ষা করলে সে উদারভাবেই দেয়।", icon: "honey", photo: "https://images.unsplash.com/photo-1707811179851-c1f93698ad46" },
  { id: "jasim", name: "Jasim Uddin", district: "Pabna", division: "Rajshahi", specialty: "Dairy & beef", specialtyBn: "দুগ্ধ ও গরুর মাংস", years: 25, quote: "Happy cattle, honest milk — that's the whole secret.", quoteBn: "সুখী গরু, সৎ দুধ — এটাই আসল রহস্য।", icon: "milk", photo: "https://images.unsplash.com/photo-1581976684536-eb40b61ee175" },
  { id: "rafiqul", name: "Rafiqul Islam", district: "Bogura", division: "Rajshahi", specialty: "Vegetables", specialtyBn: "শাকসবজি", years: 16, quote: "We harvest at dawn so it's on your plate by evening.", quoteBn: "ভোরে তোলা সবজি সন্ধ্যায় আপনার থালায়।", icon: "carrot", photo: "https://images.unsplash.com/photo-1761839257946-4616bcfafec7" },
  { id: "nasrin", name: "Nasrin Akter", district: "Gazipur", division: "Dhaka", specialty: "Poultry & eggs", specialtyBn: "মুরগি ও ডিম", years: 11, quote: "Free-range isn't a label for us — it's how we've always farmed.", quoteBn: "মুক্তচারী শুধু একটি লেবেল নয়, এটাই আমাদের চাষের রীতি।", icon: "egg", photo: "https://images.unsplash.com/photo-1496326864168-be8e45080478" },
  { id: "salma", name: "Salma Khatun", district: "Chapainawabganj", division: "Rajshahi", specialty: "Mango & lychee", specialtyBn: "আম ও লিচু", years: 20, quote: "A Himsagar picked too early never tastes the same.", quoteBn: "আগেভাগে তোলা হিমসাগরের স্বাদ কখনো একরকম হয় না।", icon: "apple", photo: "https://images.unsplash.com/photo-1521097384973-2fbcdc69f31a" },
  { id: "hasina", name: "Hasina Khatun", district: "Rangpur", division: "Rangpur", specialty: "Seasonal vegetables & fruit", specialtyBn: "মৌসুমি সবজি ও ফল", years: 9, quote: "Small farms, honest prices — that's fair for everyone.", quoteBn: "ছোট খামার, সৎ দাম — এতে সবার লাভ।", icon: "leaf", photo: "https://images.unsplash.com/photo-1518567283970-1be575199348" },
];

const GUIDES = [
  { id: "hilsa-storage", title: "How to Keep Hilsa Fish Fresh for Longer", titleBn: "ইলিশ মাছ কীভাবে বেশিদিন তাজা রাখবেন", category: "Fish", minutes: 4, icon: "fish", excerpt: "Simple icing and wrapping techniques that keep river-fresh Hilsa tasting its best for days.", body: [
    "Hilsa is best enjoyed within 24 hours of purchase, but a few simple habits can extend that window without losing flavour.",
    "Keep it cold, not frozen, if you plan to cook within two days: wrap tightly in food-safe paper, then a layer of plastic, and store at the coldest part of your fridge.",
    "For longer storage, clean and portion the fish first, then freeze in airtight bags with as little trapped air as possible — this prevents freezer burn and preserves the oil content that gives Hilsa its signature taste.",
    "Always thaw slowly in the refrigerator, never at room temperature, to keep texture intact."
  ] },
  { id: "beef-cuts", title: "A Beginner's Guide to Beef Cuts in Bangladesh", titleBn: "গরুর মাংসের কাট চেনার সহজ গাইড", category: "Meat", minutes: 6, icon: "drumstick", excerpt: "From bhuna to bone-in curry — which cut to ask your butcher for, and why.", body: [
    "Bangladeshi kitchens use cuts differently than Western recipes assume — here's a practical map.",
    "For slow-cooked bhuna, look for cuts with some marbling and connective tissue; they soften beautifully over low heat.",
    "For quick pan-fries or kebabs, leaner, boneless cuts work best since they cook fast and stay tender.",
    "Bone-in pieces are ideal for shorbas and everyday curries, adding richness to the broth as they simmer."
  ] },
  { id: "veg-calendar", title: "Seasonal Vegetable Calendar: What to Eat When", titleBn: "মৌসুমি সবজির ক্যালেন্ডার", category: "Vegetables", minutes: 5, icon: "carrot", excerpt: "Eating with the seasons means better flavour, better prices, and fresher produce.", body: [
    "Winter (Nov–Feb) brings the widest variety: cauliflower, cabbage, tomato, and fresh peas are all at their peak.",
    "Summer (Mar–Jun) is best for pumpkin, okra, eggplant, and leafy greens that thrive in the heat.",
    "Monsoon (Jul–Oct) favours water-tolerant crops like kangkong and certain gourds.",
    "Buying what's in season usually means it travelled less distance from the farm — fresher, and often cheaper."
  ] },
  { id: "deshi-vs-broiler", title: "Deshi vs Broiler Chicken: What's the Difference?", titleBn: "দেশি বনাম ব্রয়লার মুরগি: পার্থক্য কী", category: "Poultry", minutes: 4, icon: "drumstick", excerpt: "Texture, cooking time, and price — how to choose the right bird for your recipe.", body: [
    "Deshi chicken is free-range and slower-growing, giving it firmer texture and deeper flavour — ideal for slow bhuna.",
    "Broiler chicken is milder and cooks faster, making it a practical everyday choice for curries and fries.",
    "Deshi typically costs more due to longer rearing time and more space per bird.",
    "Both are equally nutritious; the choice mostly comes down to recipe and texture preference."
  ] },
  { id: "sundarban-honey", title: "How Sundarban Honey Is Harvested Sustainably", titleBn: "সুন্দরবনের মধু যেভাবে টেকসইভাবে সংগ্রহ করা হয়", category: "Honey", minutes: 5, icon: "honey", excerpt: "Meet the Mawalis — traditional honey collectors — and the careful process behind every jar.", body: [
    "Mawalis are traditional honey hunters who enter the Sundarbans during set seasons under strict permits.",
    "They take only a portion of each hive, always leaving enough for the bee colony to recover and rebuild.",
    "The honey is raw and unprocessed, retaining natural enzymes and a distinct mangrove-blossom flavour.",
    "Buying directly from these collectors supports both their livelihood and the forest's long-term health."
  ] },
  { id: "mango-storage", title: "5 Tips to Store Mangoes and Keep Them Ripe Longer", titleBn: "আম সংরক্ষণের ৫টি সহজ উপায়", category: "Fruits", minutes: 3, icon: "apple", excerpt: "Get more days out of your Himsagar and Langra without losing sweetness.", body: [
    "Store unripe mangoes at room temperature, away from direct sunlight, until they give slightly to gentle pressure.",
    "Once ripe, refrigerate to slow further ripening — they'll keep well for several extra days.",
    "Keep mangoes away from onions and garlic in storage; they absorb odours easily.",
    "For longer storage, peel, slice, and freeze — perfect for shakes and desserts later in the year."
  ] },
];

const TESTIMONIALS = [
  { name: "Nusrat Jahan", city: "Dhanmondi, Dhaka", quote: "The Hilsa tasted like the one my grandmother used to buy from the riverside market. Genuinely fresh.", rating: 5 },
  { name: "Tanvir Ahmed", city: "Bashundhara, Dhaka", quote: "I love that I can see exactly which farmer raised my chicken. Delivery is always on time.", rating: 5 },
  { name: "Farhana Islam", city: "GEC, Chattogram", quote: "Prices are fair and the vegetables last much longer than what I used to get from the local bazar.", rating: 4 },
  { name: "Shahriar Kabir", city: "Uttara, Dhaka", quote: "Cash on delivery made it an easy first try. Now it's part of our weekly routine.", rating: 5 },
];
