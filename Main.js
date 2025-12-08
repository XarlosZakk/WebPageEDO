/* ========== SMOOTH SCROLL & SCROLLSPY ========== */
(function () {
  "use strict";

  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const links = Array.from(document.querySelectorAll('a[href^="#"]'));

  function getOffset() {
    const h = header ? header.getBoundingClientRect().height : 0;
    const n = nav ? nav.getBoundingClientRect().height : 0;
    return Math.round(h + n);
  }

  function clearActive() {
    links.forEach((l) => l.classList.remove("active"));
  }

  // Smooth scroll on anchor click
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = getOffset();
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
      window.scrollTo({ top, behavior: "smooth" });
      clearActive();
      this.classList.add("active");
    });
  });

  // Scrollspy: update active link on scroll
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const offset = getOffset() + 12;
      let current = null;

      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          current = s;
          break;
        }
      }

      if (!current) {
        // If none matched, choose the last section above viewport
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].getBoundingClientRect().top <= offset) {
            current = sections[i];
            break;
          }
        }
      }

      if (current) {
        clearActive();
        const selector = `a[href="#${current.id}"]`;
        const link = document.querySelector(selector);
        if (link) link.classList.add("active");
      }

      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Initialize
})();

/* ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ========== */
(function () {
  "use strict";

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((el) => observer.observe(el));
})();

/* ========== TITLE ANIMATIONS WITH ANIMATE.CSS ========== */
(function () {
  "use strict";

  const titleObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.animated === "true") {
          obs.unobserve(el);
          return;
        }
        const anim = el.dataset.anim
          ? `animate__${el.dataset.anim}`
          : "animate__fadeInUp";
        el.classList.add("animate__animated", anim);
        el.classList.add("animate__faster");
        el.style.opacity = "1";
        el.dataset.animated = "true";
        el.addEventListener(
          "animationend",
          () => {
            el.classList.remove("animate__animated", anim, "animate__faster");
            obs.unobserve(el);
          },
          { once: true }
        );
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".title-enter").forEach((el) => {
    el.style.opacity = "0";
    titleObserver.observe(el);
  });
})();

/* ========== MOBILE MENU TOGGLE ========== */
(function () {
  "use strict";

  const nav = document.querySelector("nav");
  if (!nav) return;

  const toggle = nav.querySelector(".nav-toggle");
  const list = nav.querySelector("ul");
  if (!toggle || !list) return;

  function close() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function open() {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      close();
    } else {
      open();
    }
  });

  list.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) close();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && nav.classList.contains("open")) {
      close();
    }
  });
})();

/* ========== HERO CAROUSEL ========== */
(function () {
  "use strict";

  const slides = document.querySelectorAll(".hero-carousel .slide");
  const indicators = document.querySelectorAll(".hero-carousel .indicator");
  if (!slides.length) return;

  let idx = 0;
  let interval = null;

  function show(i) {
    if (i < 0 || i >= slides.length) return;
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    indicators.forEach((b, k) => b.classList.toggle("active", k === i));
    idx = i;
  }

  function next() {
    show((idx + 1) % slides.length);
  }

  function prev() {
    show((idx - 1 + slides.length) % slides.length);
  }

  // Indicator click handlers
  indicators.forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      if (!isNaN(i)) {
        show(i);
        restart();
      }
    });
  });

  function start() {
    if (interval) return;
    interval = setInterval(next, 4500);
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function restart() {
    stop();
    start();
  }

  // Swipe detection for touch devices
  const carousel = document.querySelector(".hero-carousel");
  if (carousel) {
    let startX = 0;
    let down = false;

    carousel.addEventListener("pointerdown", (e) => {
      down = true;
      startX = e.clientX;
      stop();
    });

    carousel.addEventListener("pointerup", (e) => {
      if (!down) return;
      down = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next();
        else prev();
      }
      restart();
    });

    carousel.addEventListener("pointercancel", () => {
      down = false;
      restart();
    });

    // Pause on hover
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
  }

  // Initialize
  show(0);
  start();
})();

/* ========== PARTNER CARDS 3D TILT EFFECT ========== */
(function () {
  "use strict";

  const cards = document.querySelectorAll(".partner-card");
  if (!cards.length) return;

  const max = 12;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.08s ease-out";
    });
  });
})();

/* ========== EVENTS LOADER ========== */
(function () {
  "use strict";

  async function loadEvents() {
    const container = document.getElementById("events-loader");
    if (!container) return;

    try {
      const response = await fetch("events.json");
      if (!response.ok) throw new Error("No se pudo cargar events.json");

      let events = await response.json();

      // Filter out past events
      const now = new Date();
      events = events.filter(event => {
        try {
          const eventDate = new Date(event.date);
          return eventDate >= now;
        } catch (e) {
          // If date parsing fails, show the event
          return true;
        }
      });

      if (!events || events.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; color: #aaa;">No hay eventos próximos en este momento.</p>';
        return;
      }

      // Clear loading message
      container.innerHTML = "";

      // Render each event
      events.forEach((event, index) => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.style.opacity = "0";
        card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;

        card.innerHTML = `
          <div class="event-image">
            <img src="${event.image || './img/edo_logo (1).jpg'}" alt="${event.title}" loading="lazy" decoding="async">
          </div>
          <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <div class="event-date">
              <i class="fa-solid fa-calendar-days"></i>
              ${event.date}
            </div>
            <p class="event-desc">${event.description}</p>
            <a href="${event.link}" class="event-link" target="_blank" rel="noopener">
              <i class="fa-solid fa-circle-info"></i>
              Más Información
            </a>
          </div>
        `;

        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading events:", error);
      container.innerHTML = '<p style="text-align:center; width:100%; color: #ff4d4d;">Error al cargar los eventos. Por favor, intenta más tarde.</p>';
    }
  }

  // Load events when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadEvents);
  } else {
    loadEvents();
  }
})();

/* ========== ADMIN ACCESS MODAL ========== */
(function () {
  "use strict";

  const modal = document.getElementById("admin-modal");
  const btn = document.getElementById("admin-access-btn");
  const span = document.querySelector(".admin-close");
  const loginBtn = document.getElementById("admin-login-btn");
  const passwordInput = document.getElementById("admin-password");
  const errorMsg = document.getElementById("admin-error");

  if (!modal || !btn) return;

  // Open modal
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    passwordInput.value = "";
    errorMsg.textContent = "";
    setTimeout(() => passwordInput.focus(), 100);
  });

  // Close modal
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Login logic
  function attemptLogin() {
    const password = passwordInput.value;
    const correctPassword = "EDO2025";

    if (password === correctPassword) {
      // Redirect to admin panel
      window.location.href = "gestion_eventos.html";
    } else {
      errorMsg.textContent = "❌ Contraseña incorrecta";
      passwordInput.value = "";
      passwordInput.focus();
      
      // Shake animation
      passwordInput.style.animation = "shake 0.5s";
      setTimeout(() => {
        passwordInput.style.animation = "";
      }, 500);
    }
  }

  loginBtn.addEventListener("click", attemptLogin);

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      attemptLogin();
    }
  });

  // Add shake animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(style);
})();
