/* =============================================
   JIVAN FOUNDATION - MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== HERO SLIDER =====
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (slides.length > 0) {
    slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');
    startAutoSlide();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
    });

    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    // Touch support
    let touchStartX = 0;
    const sliderEl = document.getElementById('heroSlider');
    if (sliderEl) {
      sliderEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
      sliderEl.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? nextSlide() : prevSlide();
          resetAutoSlide();
        }
      });
    }
  }

  // ===== ANIMATED COUNTERS =====
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ===== INTERSECTION OBSERVER (AOS-like + counters) =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');

        // Trigger counters
        const counters = entry.target.querySelectorAll('.count[data-count]');
        counters.forEach(c => {
          if (!c.dataset.animated) {
            c.dataset.animated = true;
            animateCounter(c);
          }
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
  document.querySelectorAll('#impact').forEach(el => observer.observe(el));

  // Direct counter trigger for impact section
  const impactSection = document.getElementById('impact');
  if (impactSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.count[data-count]').forEach(c => {
          if (!c.dataset.animated) {
            c.dataset.animated = true;
            animateCounter(c);
          }
        });
        counterObserver.unobserve(impactSection);
      }
    }, { threshold: 0.3 });
    counterObserver.observe(impactSection);
  }

  // ===== BACK TO TOP =====
  const backTop = document.getElementById('backToTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#28a745';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#28a745';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        this.reset();
      }, 4000);
      // Show success message
      const msg = document.createElement('div');
      msg.className = 'alert alert-success mt-3';
      msg.innerHTML = '<strong>Thank you!</strong> We will get back to you soon.';
      this.after(msg);
      setTimeout(() => msg.remove(), 5000);
    });
  }

});

// ===== GALLERY PDF VIEWER =====
function loadPDF(filePath, yearLabel, typeLabel) {
  const frame = document.getElementById('pdfViewer');
  const titleEl = document.getElementById('pdfTitle');
  const placeholder = document.getElementById('pdfPlaceholder');

  if (titleEl) titleEl.textContent = yearLabel + ' — ' + typeLabel;

  if (frame) {
    frame.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    frame.src = filePath;
  }

  // Update active states
  document.querySelectorAll('.year-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.type-tab-btn').forEach(b => b.classList.remove('active'));

  const yearBtn = document.querySelector(`.year-tab-btn[data-year="${yearLabel}"]`);
  const typeBtn = document.querySelector(`.type-tab-btn[data-type="${typeLabel}"]`);
  if (yearBtn) yearBtn.classList.add('active');
  if (typeBtn) typeBtn.classList.add('active');
}

// ===== LOAD EVENTS FROM JSON =====
function loadEvents() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  const events = [
    {
      id: 1,
      title: "Health Check-up Camp",
      date: "11 April 2023",
      year: "2023-24",
      description: "Health checkup camp at SST College with 88 participants and 268 beneficiaries, in collaboration with Primary Health Centre, Badlapur.",
      icon: "🏥",
      color: "#1A5BA6"
    },
    {
      id: 2,
      title: "Zhadakhalchi Shala – Education Enrichment",
      date: "14-15 May 2023",
      year: "2023-24",
      description: "Educational enrichment programme for underprivileged children and senior citizens at adopted slum area in Ambernath.",
      icon: "📚",
      color: "#F5A623"
    },
    {
      id: 3,
      title: "Distribution of Clothes – Orphanage",
      date: "20 May 2023",
      year: "2023-24",
      description: "Clothes distribution to Karunalaya Balika Ashram, Kushivali with 16 NSS volunteers.",
      icon: "👕",
      color: "#1B2A6B"
    },
    {
      id: 4,
      title: "Online Webinar – Competitive Exam Prep (MPSC/UPSC/SSC)",
      date: "29-31 May 2023",
      year: "2023-24",
      description: "National level online webinar series on MPSC, UPSC, Railway, Banking & SSC exam preparation in collaboration with Reliable Academy.",
      icon: "💻",
      color: "#1A5BA6"
    },
    {
      id: 5,
      title: "District Level Yoga Workshop",
      date: "15 June 2023",
      year: "2023-24",
      description: "International Yoga Day district-level workshop with 56 participants, led by Dr. Vijay Kukreja.",
      icon: "🧘",
      color: "#F5A623"
    },
    {
      id: 6,
      title: "Tree Plantation Drive",
      date: "26 August 2023",
      year: "2023-24",
      description: "400+ saplings planted at Rahatoli Forest, Badlapur with 69 NSS volunteers in collaboration with Forest Department.",
      icon: "🌳",
      color: "#28a745"
    },
    {
      id: 7,
      title: "Career Guidance Lecture – Competitive Exams",
      date: "5 October 2023",
      year: "2023-24",
      description: "District level career guidance lecture at Achievers College, Kalyan with Shri. Satish Jadhav (Vijeta Academy).",
      icon: "🎯",
      color: "#1B2A6B"
    },
    {
      id: 8,
      title: "Workshop on Competitive Exam",
      date: "7 March 2024",
      year: "2023-24",
      description: "Workshop conducted by Shri. Sandip Patil (Reliable Academy) with 61 participants at SST College.",
      icon: "✍️",
      color: "#1A5BA6"
    },
    {
      id: 9,
      title: "Online District Level Yoga Workshop",
      date: "10 June 2024",
      year: "2024-25",
      description: "Online International Yoga Day workshop with NSS volunteers embracing yoga for holistic well-being.",
      icon: "🧘",
      color: "#F5A623"
    },
    {
      id: 10,
      title: "School Connect Program – Education Reunite",
      date: "16 June 2024",
      year: "2024-25",
      description: "Education Reunite project in collaboration with Naturopathy Institute and NSS Unit, bridging schools and holistic education.",
      icon: "🏫",
      color: "#1A5BA6"
    },
    {
      id: 11,
      title: "District Level Yoga Workshop",
      date: "21 June 2024",
      year: "2024-25",
      description: "103 volunteers participated in yoga workshop led by Dr. Vijay Kukreja at college campus.",
      icon: "🧘",
      color: "#1B2A6B"
    },
    {
      id: 12,
      title: "Tree Plantation Drive – Rahatoli, Badlapur",
      date: "30 July 2024",
      year: "2024-25",
      description: "Over 100 saplings planted at Rahatoli, Badlapur with 50+ NSS volunteers.",
      icon: "🌿",
      color: "#28a745"
    },
    {
      id: 13,
      title: "Workshop on Blind Faith",
      date: "25 August 2024",
      year: "2024-25",
      description: "One-day workshop on rational thinking and combating superstition with 27 NSS volunteers.",
      icon: "🔬",
      color: "#F5A623"
    },
    {
      id: 14,
      title: "Awareness of Government Schemes",
      date: "21 December 2024",
      year: "2024-25",
      description: "NSS camp at Rahatoli village educating rural residents on PMAY, Swachh Bharat, Jan Dhan Yojana and more.",
      icon: "📋",
      color: "#1A5BA6"
    },
    {
      id: 15,
      title: "Sankalp Siddhi – University Level Yoga",
      date: "1 January 2025",
      year: "2024-25",
      description: "University-level yoga celebration at Banquet Hall, Badlapur with 400+ participants inaugurated by MLA Shri. Kisan Kathore.",
      icon: "🌅",
      color: "#1B2A6B"
    },
    {
      id: 16,
      title: "District Level Surya Namaskar Event",
      date: "4 February 2025",
      year: "2024-25",
      description: "52 volunteers at Badlapur and 253 at SST College participated in Surya Namaskar event organized with Yog & Naturopathy Institute.",
      icon: "☀️",
      color: "#F5A623"
    },
    {
      id: 17,
      title: "Guidance on Competitive Exams",
      date: "4 February 2025",
      year: "2024-25",
      description: "District-level guidance session on UPSC, MPSC and other competitive exams by Mr. Sandip Patil (Reliable Academy).",
      icon: "📖",
      color: "#1A5BA6"
    },
    {
      id: 18,
      title: "Special Online Yoga Session – Women's Day",
      date: "15 & 18 March 2025",
      year: "2024-25",
      description: "Special yoga sessions for girls and women on International Women's Day, guided by Dr. Vijay Kukreja.",
      icon: "👩",
      color: "#e91e8c"
    }
  ];

  // Group by year
  const years = {};
  events.forEach(ev => {
    if (!years[ev.year]) years[ev.year] = [];
    years[ev.year].push(ev);
  });

  let html = '';
  Object.keys(years).sort().reverse().forEach(year => {
    html += `
      <div class="events-year-section" data-aos>
        <div class="events-year-header">
          <i class="bi bi-calendar3 me-2"></i> Academic Year ${year}
        </div>
        <div class="row g-3 mt-0" style="background:#f8f9fc; padding:1.5rem; border-radius:0 0 12px 12px; border:1px solid rgba(0,0,0,0.06); border-top:none;">
    `;
    years[year].forEach(ev => {
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="event-card h-100">
            <div class="event-img" style="background:linear-gradient(135deg, ${ev.color}, ${ev.color}cc);">
              <span style="font-size:3.5rem">${ev.icon}</span>
              <span class="event-date-badge">${ev.date}</span>
            </div>
            <div class="event-body">
              <h5>${ev.title}</h5>
              <p class="text-muted small">${ev.description}</p>
            </div>
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
  });

  container.innerHTML = html;

  // Re-observe new elements
  document.querySelectorAll('[data-aos]').forEach(el => {
    if (!el.classList.contains('aos-animate')) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
}

if (document.getElementById('eventsContainer')) {
  loadEvents();
}
