// ===========================
// PHOTO GLITCH SETUP
// ===========================
(function() {
  const img = document.querySelector('.hero-photo');
  if (!img) return;
  function applyVar() {
    document.documentElement.style.setProperty('--photo-bg', 'url("' + img.src + '")');
  }
  if (img.complete) applyVar();
  else img.addEventListener('load', applyVar);
})();

// ===========================
// PARTICLES CONFIG
// ===========================
particlesJS("particles-js", {
  particles: {
    number: {
      value: 90,
      density: { enable: true, value_area: 900 }
    },
    color: { value: "#00f5ff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.45,
      random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2.5,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f5ff",
      opacity: 0.25,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// ===========================
// AOS INIT
// ===========================
AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 60
});

// ===========================
// NAV SCROLL EFFECT
// ===========================
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    nav.style.background = "rgba(5, 10, 6, 0.97)";
    nav.style.borderBottomColor = "rgba(0, 245, 255, 0.25)";
  } else {
    nav.style.background = "rgba(5, 10, 6, 0.85)";
    nav.style.borderBottomColor = "rgba(0, 245, 255, 0.12)";
  }
});

// ===========================
// COUNTER ANIMATION (hero stats)
// ===========================
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out quad
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll(".hero-stat-num");
let countersStarted = false;

function startCountersIfVisible() {
  if (countersStarted) return;
  const firstCounter = counterEls[0];
  const rect = firstCounter.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    counterEls.forEach(el => animateCounter(el));
  }
}

window.addEventListener("scroll", startCountersIfVisible, { passive: true });
// also check on load
window.addEventListener("load", startCountersIfVisible);

// ===========================
// CARD TILT EFFECT (features)
// ===========================
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "transform 0.1s";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.4s";
  });
});

// ===========================
// TYPING CURSOR IN FOOTER
// ===========================
const footerMono = document.querySelector(".footer-mono");
if (footerMono) {
  const baseText = "SYS://ONLINE";
  let visible = true;
  setInterval(() => {
    visible = !visible;
    footerMono.textContent = visible ? baseText + "█" : baseText;
  }, 600);
}

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===========================
// STAT CARDS — RIPPLE ON HOVER
// ===========================
document.querySelectorAll(".stat-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    const ring = card.querySelector(".stat-ring");
    ring.style.animation = "none";
    void ring.offsetWidth; // reflow
    ring.style.animation = "rippleOut 0.6s ease-out forwards";
  });
});

// Add ripple keyframes dynamically
const style = document.createElement("style");
style.textContent = `
@keyframes rippleOut {
  0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
}
`;
document.head.appendChild(style);

// ===========================
// EVOLUTION CARDS — SEQUENTIAL GLOW
// ===========================
const evoCards = document.querySelectorAll(".evolution-card");
let evoIndex = 0;

function cycleEvoGlow() {
  evoCards.forEach((c, i) => {
    if (i === evoIndex) {
      c.style.boxShadow = "0 0 20px rgba(0,245,255,0.4), 0 0 50px rgba(0,245,255,0.15)";
      c.style.borderColor = "rgba(0,245,255,0.6)";
    } else {
      c.style.boxShadow = "";
      c.style.borderColor = "";
    }
  });
  evoIndex = (evoIndex + 1) % evoCards.length;
}

setInterval(cycleEvoGlow, 1400);