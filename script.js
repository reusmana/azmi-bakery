/* ============================================
   UMKM ROTI - Main Script
   ============================================ */

// Product data
const products = [
  {
    name: "Rasa Keju",
    price: "Rp 2.000",
    category: "roti",
    badge: "Best Seller",
    image: "assets/images/breads/1.png",
    desc: "Roti lembut dengan taburan keju gurih yang melimpah. Rasanya enak dan pas dinikmati kapan saja dengan harga terjangkau.",
  },
  {
    name: "Rasa Cokelat",
    price: "Rp 2.000",
    category: "pastry",
    badge: "Favorit",
    image: "assets/images/breads/2.png",
    desc: "Roti lembut dengan isian cokelat manis yang lumer di mulut. Cocok untuk camilan nikmat dengan harga ramah di kantong.",
  },
  {
    name: "Rasa Strawberry",
    price: "Rp 2.000",
    category: "roti",
    badge: "",
    image: "assets/images/breads/3.png",
    desc: "Roti empuk dengan rasa strawberry manis dan segar. Pilihan camilan sederhana yang enak dan terjangkau.",
  },
  {
    name: "Rasa Vanilla",
    price: "Rp 2.000",
    category: "pastry",
    badge: "Baru",
    image: "assets/images/breads/4.png",
    desc: "Roti lembut dengan aroma vanilla yang harum dan rasa manis yang pas. Nikmat dinikmati setiap saat dengan harga hemat.",
  },
];

// Render product cards
function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  grid.innerHTML = filtered
    .map(
      (p, i) => `
    <div class="product-card animate-scale-in delay-${((i % 3) + 1) * 100}" style="transition-delay:${i * 0.1}s">
      <div class="product-image relative h-56">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="p-6">
        <h3 class="font-bold text-lg mb-1">${p.name}</h3>
        <p class="text-gray-400 text-sm mb-4 leading-relaxed">${p.desc}</p>
        <div class="flex items-center justify-between">
          <span class="text-gold-400 font-bold text-lg">${p.price}</span>
          <a href="https://wa.me/6281234567890?text=${encodeURIComponent("Halo, saya ingin memesan " + p.name)}" target="_blank"
             class="btn-primary px-5 py-2 rounded-full text-xs inline-flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">shopping_bag</span> Pesan
          </a>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
  // Trigger animations after render
  requestAnimationFrame(() => {
    grid
      .querySelectorAll(".animate-scale-in")
      .forEach((el) => el.classList.add("visible"));
  });
}

// Category tab filtering
document.querySelectorAll(".category-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".category-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderProducts(tab.dataset.category);
  });
});

// Initial render
renderProducts();

// ============================================
// Swiper testimonial carousel
// ============================================
const testimonialSwiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// ============================================
// Header scroll effect
// ============================================
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// ============================================
// Mobile menu
// ============================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");

mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.add("open"));
mobileMenuClose.addEventListener("click", () =>
  mobileMenu.classList.remove("open"),
);
document.querySelectorAll(".mobile-nav").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ============================================
// Scroll-triggered animations (IntersectionObserver)
// ============================================
const animateElements = document.querySelectorAll(
  ".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);

animateElements.forEach((el) => observer.observe(el));

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 120;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle("active", scrollY >= top && scrollY < top + height);
    }
  });
});
