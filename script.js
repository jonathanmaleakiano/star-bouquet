/* ==========================================================================
   STAR BOUQUET - INTERACTIVE CATALOG & WHATSAPP ORDER SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ================= CONFIGURATION ================= */
  const WHATSAPP_NUMBER = '6285973989379';

  /* ================= PRODUCT CATALOG DATA =================
     Ganti atau lengkapi file foto asli dari @starbouquet._ di folder assets/products/
  */
  const products = [
    {
      id: 'paket-pink',
      name: 'Star Bouquet Paket Pink',
      category: 'Pink Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Rangkaian snack bouquet bernuansa pink manis dengan kertas cellophane premium, pita hias cantik, dan pilihan snack favorit.',
      image: 'assets/products/paket-pink.jpg'
    },
    {
      id: 'paket-ungu',
      name: 'Star Bouquet Paket Ungu',
      category: 'Purple Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Buket snack bertema dreamy lavender dan ungu lembut yang menghadirkan kesan romantis, ceria, dan elegan.',
      image: 'assets/products/paket-ungu.jpg'
    },
    {
      id: 'paket-biru',
      name: 'Star Bouquet Paket Biru',
      category: 'Blue Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Buket bernuansa biru menawan yang cocok sebagai hadiah ulang tahun, apresiasi, maupun kejutan manis untuk orang terdekat.',
      image: 'assets/products/paket-biru.jpg'
    },
    {
      id: 'beng-beng-bouquet',
      name: 'Beng-Beng Bouquet',
      category: 'Snack Brand Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Rangkaian spesial berisi cokelat wafer Beng-Beng favorit yang disusun rapi dengan wrapping estetik dan pita dekoratif.',
      image: 'assets/products/beng-beng-bouquet.jpg'
    },
    {
      id: 'better-bouquet',
      name: 'Better Bouquet',
      category: 'Snack Brand Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Buket camilan Better berlapis cokelat lembut yang dirangkai manis dan kokoh untuk momen perayaan yang berkesan.',
      image: 'assets/products/better-bouquet.jpg'
    },
    {
      id: 'slai-olai-bouquet',
      name: 'Slai O\'lai Bouquet',
      category: 'Snack Brand Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Kombinasi ceria biskuit Slai O\'lai dengan balutan cellophane pastel dan hiasan pita yang manis dipandang.',
      image: 'assets/products/slai-olai-bouquet.jpg'
    },
    {
      id: 'graduation-bouquet',
      name: 'Graduation Bouquet',
      category: 'Graduation Bouquet',
      price: 'Mulai Rp50.000',
      description:
        'Buket spesial untuk merayakan hari wisuda dan kelulusan dengan tampilan premium yang siap diabadikan di setiap foto.',
      image: 'assets/products/graduation-bouquet.jpg'
    },
    {
      id: 'custom-bouquet',
      name: 'Custom Snack Bouquet',
      category: 'Custom Bouquet',
      price: 'Harga menyesuaikan request',
      description:
        'Bebas tentukan pilihan snack, warna wrapping, tema acara, serta ukuran buket sesuai keinginan dan anggaran Anda.',
      image: 'assets/products/custom-bouquet.jpg'
    }
  ];

  /* ================= GRACEFUL SVG FALLBACK FOR ASSETS =================
     Menjaga agar website tetap bersih sebelum file logo/foto asli ditempatkan di assets/
  */
  function createSvgPlaceholder(type, labelText) {
    if (type === 'logo') {
      const svgLogo = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#F8DCE9"/>
              <stop offset="100%" stop-color="#D9B5D6"/>
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#g)" stroke="#A34475" stroke-width="4"/>
          <path d="M60 22l9.5 22.5L94 47l-18.5 16 5.5 24L60 74.5 39 87l5.5-24L26 47l24.5-2.5z" fill="#F5CB83" stroke="#A34475" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="60" cy="58" r="7" fill="#A34475"/>
        </svg>`;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgLogo)}`;
    }

    const safeLabel = (labelText || 'Star Bouquet').replace(/[<>&"]/g, '');
    const svgProduct = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 660">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F8DCE9"/>
            <stop offset="55%" stop-color="#FFF9FC"/>
            <stop offset="100%" stop-color="#D9B5D6"/>
          </linearGradient>
        </defs>
        <rect width="600" height="660" fill="url(#bg)"/>
        <circle cx="300" cy="270" r="118" fill="#FFF9FC" stroke="#C46B98" stroke-width="3" stroke-dasharray="8 8"/>
        <path d="M300 198l17 42 45 4-34 30 10 44-38-23-38 23 10-44-34-30 45-4z" fill="#F5CB83" stroke="#A34475" stroke-width="3" stroke-linejoin="round"/>
        <text x="300" y="445" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#49283D">${safeLabel}</text>
        <text x="300" y="485" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#98758B">Foto asli dari IG @starbouquet._</text>
        <text x="300" y="514" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#A34475">Masukkan file ke folder assets/products/</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgProduct)}`;
  }

  function applyImageFallback(imgElement, type = 'product', label = 'Star Bouquet') {
    if (!imgElement) return;
    imgElement.addEventListener(
      'error',
      () => {
        if (imgElement.dataset.fallbackApplied === 'true') return;
        imgElement.dataset.fallbackApplied = 'true';
        imgElement.src = createSvgPlaceholder(type, label);
      },
      { once: true }
    );
  }

  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const type = img.dataset.fallback || 'product';
    const label = img.dataset.label || img.alt || 'Star Bouquet';
    applyImageFallback(img, type, label);
  });

  /* ================= WHATSAPP LINK GENERATOR ================= */
  function buildWhatsAppUrl(product = null) {
    let message = '';

    if (product) {
      message =
        `Halo Star Bouquet! Saya tertarik untuk memesan:\n\n` +
        `Nama Produk: ${product.name}\n` +
        `Kategori: ${product.category}\n` +
        `Harga: ${product.price}\n\n` +
        `Saya ingin mengetahui detail pemesanan dan pilihan custom.\n\n` +
        `Terima kasih!`;
    } else {
      message =
        `Halo Star Bouquet! Saya tertarik untuk memesan snack bouquet.\n\n` +
        `Saya ingin berkonsultasi mengenai pilihan produk, desain custom, dan jadwal pengerjaan.\n\n` +
        `Terima kasih!`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // Bind all general WhatsApp buttons
  document.querySelectorAll('[data-wa-general="true"]').forEach((btn) => {
    btn.setAttribute('href', buildWhatsAppUrl(null));
  });

  /* ================= NAVBAR & MOBILE MENU ================= */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScrollUI() {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 30);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('show', scrollY > 450);
    }
  }

  window.addEventListener('scroll', handleScrollUI, { passive: true });
  handleScrollUI();

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================= ACTIVE NAVIGATION INDICATOR ================= */
  const trackedSections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && trackedSections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const targetHref = link.getAttribute('href');
              link.classList.toggle('active', targetHref === `#${currentId}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    trackedSections.forEach((sec) => navObserver.observe(sec));
  }

  /* ================= PRODUCTS RENDER, FILTER & SEARCH ================= */
  const productsGrid = document.getElementById('productsGrid');
  const productsEmpty = document.getElementById('productsEmpty');
  const productSearch = document.getElementById('productSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  let activeCategory = 'All';
  let searchQuery = '';

  function renderProducts() {
    if (!productsGrid) return;

    const filtered = products.filter((item) => {
      const matchCategory = activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });

    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
      if (productsEmpty) productsEmpty.classList.remove('hidden');
      return;
    }

    if (productsEmpty) productsEmpty.classList.add('hidden');

    filtered.forEach((product) => {
      const card = document.createElement('article');
      card.className = 'product-card';

      const waUrl = buildWhatsAppUrl(product);

      card.innerHTML = `
        <div class="product-thumb">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-badge">${product.category}</span>
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <p class="product-price">${product.price}</p>
          <div class="product-actions">
            <button type="button" class="btn btn-outline quick-view-btn" data-id="${product.id}">
              Quick View
            </button>
            <a href="${waUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Order Now
            </a>
          </div>
        </div>
      `;

      const img = card.querySelector('img');
      applyImageFallback(img, 'product', product.name);

      const quickViewBtn = card.querySelector('.quick-view-btn');
      quickViewBtn.addEventListener('click', () => openQuickView(product));

      productsGrid.appendChild(card);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'All';
      renderProducts();
    });
  });

  if (productSearch) {
    productSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      activeCategory = 'All';
      searchQuery = '';
      if (productSearch) productSearch.value = '';
      filterButtons.forEach((b) => b.classList.toggle('active', b.dataset.category === 'All'));
      renderProducts();
    });
  }

  renderProducts();

  /* ================= QUICK VIEW MODAL ================= */
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewBtn = document.getElementById('closeQuickView');
  const modalProductImg = document.getElementById('modalProductImg');
  const modalProductCategory = document.getElementById('modalProductCategory');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalProductDesc = document.getElementById('modalProductDesc');
  const modalOrderBtn = document.getElementById('modalOrderBtn');

  function openQuickView(product) {
    if (!quickViewModal) return;
    modalProductImg.dataset.fallbackApplied = 'false';
    modalProductImg.src = product.image;
    modalProductImg.alt = product.name;
    applyImageFallback(modalProductImg, 'product', product.name);

    modalProductCategory.textContent = product.category;
    modalProductName.textContent = product.name;
    modalProductPrice.textContent = product.price;
    modalProductDesc.textContent = product.description;
    modalOrderBtn.setAttribute('href', buildWhatsAppUrl(product));

    quickViewModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (!quickViewModal) return;
    quickViewModal.hidden = true;
    document.body.style.overflow = '';
  }

  if (closeQuickViewBtn) {
    closeQuickViewBtn.addEventListener('click', closeQuickView);
  }

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  /* ================= GALLERY LIGHTBOX ================= */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  const closeLightboxBtn = document.getElementById('closeLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function openLightbox(imgSrc, altText, captionText) {
    if (!lightbox) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText;
    lightboxCaption.textContent = captionText || altText;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      openLightbox(img.src, img.alt, item.dataset.caption);
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  closeQuickView();
  closeLightbox();

  // Close modal / lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quickViewModal && !quickViewModal.hidden) closeQuickView();
      if (lightbox && !lightbox.hidden) closeLightbox();
    }
  });

  /* ================= TESTIMONIAL CAROUSEL ================= */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevTestimonialBtn = document.getElementById('prevTestimonial');
  const nextTestimonialBtn = document.getElementById('nextTestimonial');
  const testimonialDotsWrap = document.getElementById('testimonialDots');
  const testimonialSlides = testimonialTrack ? testimonialTrack.querySelectorAll('.testimonial-card') : [];

  let currentSlide = 0;

  function updateCarousel() {
    if (!testimonialTrack || testimonialSlides.length === 0) return;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    if (testimonialDotsWrap) {
      testimonialDotsWrap.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }
  }

  if (testimonialDotsWrap && testimonialSlides.length > 0) {
    testimonialSlides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot${idx === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Tampilkan testimoni ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentSlide = idx;
        updateCarousel();
      });
      testimonialDotsWrap.appendChild(dot);
    });
  }

  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      updateCarousel();
    });
  }

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      updateCarousel();
    });
  }

  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');
    if (!questionBtn || !answerEl) return;

    questionBtn.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('open');

      // Close other items for clean single-open accordion experience
      faqItems.forEach((other) => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question');
        const otherAns = other.querySelector('.faq-answer');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isCurrentlyOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerEl.style.maxHeight = `${answerEl.scrollHeight}px`;
      }
    });
  });

  /* ================= SCROLL REVEAL ANIMATION ================= */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
});