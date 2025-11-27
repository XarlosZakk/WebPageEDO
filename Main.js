// Smooth scroll behavior with offset for sticky header+nav
(function () {
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

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = getOffset();
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset - 8; // small gap
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
        // if none matched, choose the last section above viewport
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
  // initialize
  onScroll();
})();

// Intersection Observer para animaciones al scroll
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

// Animaciones de entrada para títulos con animate.css
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

// Menú móvil: toggle en dispositivos pequeños
(function () {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const toggle = nav.querySelector(".nav-toggle");
  const list = nav.querySelector("ul");
  if (!toggle || !list) return;
  function close() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  list.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) close();
  });
})();

/* Carousel script: controla rotación automática, indicadores y swipe básico */

(function () {
  const slides = document.querySelectorAll(".hero-carousel .slide");
  const indicators = document.querySelectorAll(".hero-carousel .indicator");
  if (!slides.length) return;
  let idx = 0;
  let interval = null;

  function show(i) {
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    indicators.forEach((b, k) => b.classList.toggle("active", k === i));
    idx = i;
  }

  function next() {
    show((idx + 1) % slides.length);
  }

  indicators.forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      show(i);
      restart();
    })
  );

  function start() {
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

  // simple swipe detection on hero-carousel
  const carousel = document.querySelector(".hero-carousel");
  let startX = 0,
    down = false;
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
      else show((idx - 1 + slides.length) % slides.length);
    }
    restart();
  });
  carousel.addEventListener("pointercancel", () => {
    down = false;
    restart();
  });

  // start
  show(0);
  start();
})();
