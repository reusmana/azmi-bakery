/* ============================================
   UMKM ROTI - Main Script
   ============================================ */

// Product data
const products = [
  { name: 'Sourdough Artisan', price: 'Rp 45.000', category: 'roti', badge: 'Best Seller', image: 'assets/images/product-sourdough.png', desc: 'Roti sourdough dengan fermentasi alami 24 jam, tekstur renyah di luar dan lembut di dalam.' },
  { name: 'Croissant Butter', price: 'Rp 28.000', category: 'pastry', badge: 'Favorit', image: 'assets/images/product-croissant.png', desc: 'Croissant berlapis-lapis dengan butter premium Perancis, renyah dan lembut.' },
  { name: 'French Baguette', price: 'Rp 35.000', category: 'roti', badge: '', image: 'assets/images/product-baguette.png', desc: 'Baguette klasik Perancis dengan kulit renyah dan interior yang lembut berongga.' },
  { name: 'Cinnamon Roll', price: 'Rp 32.000', category: 'spesial', badge: 'New', image: 'assets/images/product-cinnamon-roll.png', desc: 'Gulungan kayu manis dengan cream cheese glaze yang meleleh sempurna.' },
  { name: 'Roti Tawar Premium', price: 'Rp 25.000', category: 'roti', badge: '', image: 'assets/images/product-roti-tawar.png', desc: 'Roti tawar lembut dan fluffy, sempurna untuk sarapan keluarga sehari-hari.' },
  { name: 'Sourdough Gandum', price: 'Rp 48.000', category: 'spesial', badge: 'Healthy', image: 'assets/images/product-sourdough.png', desc: 'Sourdough whole wheat dengan serat tinggi, pilihan sehat tanpa mengurangi rasa.' },
];

// Render product cards
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card animate-scale-in delay-${(i % 3 + 1) * 100}" style="transition-delay:${i * 0.1}s">
      <div class="product-image relative h-56">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="p-6">
        <h3 class="font-bold text-lg mb-1">${p.name}</h3>
        <p class="text-gray-400 text-sm mb-4 leading-relaxed">${p.desc}</p>
        <div class="flex items-center justify-between">
          <span class="text-gold-400 font-bold text-lg">${p.price}</span>
          <a href="https://wa.me/6281234567890?text=${encodeURIComponent('Halo, saya ingin memesan ' + p.name)}" target="_blank"
             class="btn-primary px-5 py-2 rounded-full text-xs inline-flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">shopping_bag</span> Pesan
          </a>
        </div>
      </div>
    </div>
  `).join('');
  // Trigger animations after render
  requestAnimationFrame(() => {
    grid.querySelectorAll('.animate-scale-in').forEach(el => el.classList.add('visible'));
  });
}

// Category tab filtering
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.category);
  });
});

// Initial render
renderProducts();

// ============================================
// Swiper testimonial carousel
// ============================================
const testimonialSwiper = new Swiper('.testimonialSwiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// ============================================
// Header scroll effect
// ============================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================
// Mobile menu
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileMenuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-nav').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============================================
// Scroll-triggered animations (IntersectionObserver)
// ============================================
const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animateElements.forEach(el => observer.observe(el));

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});
