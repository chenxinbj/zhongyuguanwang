const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

document.querySelectorAll(".js-toast").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.message || "操作已收到。");
  });
});

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    message.textContent = form.dataset.success;
    showToast(form.dataset.success);
    form.reset();
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

// Metrics counting animation
function animateCount(el, target, suffix, duration) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const metricsData = [
  { target: 300000, suffix: "+" },
  { target: 10, suffix: "+" },
  { target: 200, suffix: "+" },
  { target: 1500, suffix: "万+" },
];

const metricsSection = document.querySelector(".metrics");
let metricsAnimated = false;

const metricsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !metricsAnimated) {
      metricsAnimated = true;
      const articles = metricsSection.querySelectorAll("article strong");
      articles.forEach((el, i) => {
        const { target, suffix } = metricsData[i];
        animateCount(el, target, suffix, 1800);
      });
      metricsObserver.unobserve(metricsSection);
    }
  },
  { threshold: 0.3 },
);

if (metricsSection) {
  metricsObserver.observe(metricsSection);
}

// Mobile menu toggle
const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
