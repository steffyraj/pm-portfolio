const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navItems = Array.from(document.querySelectorAll(".nav-link"));
const copyEmailBtn = document.getElementById("copyEmail");
const sparkleLayer = document.getElementById("sparkleLayer");

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = theme === "dark" ? "🌙" : "☀️";
  const iconEl = themeToggle.querySelector(".toggle-icon");
  if (iconEl) {
    iconEl.textContent = icon;
  }
}

setTheme(storedTheme || "light");

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((item) => {
          item.classList.toggle(
            "active",
            item.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  observer.observe(section);
});

function sparkleBurst(x, y) {
  const count = 12;
  for (let i = 0; i < count; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    const angle = (Math.PI * 2 * i) / count;
    const distance = 30 + Math.random() * 20;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty("--x", `${dx}px`);
    sparkle.style.setProperty("--y", `${dy}px`);
    sparkleLayer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 700);
  }
}

copyEmailBtn.addEventListener("click", (event) => {
  const email = "steffyrajsoni@gmail.com";
  const rect = event.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => sparkleBurst(x, y));
  } else {
    sparkleBurst(x, y);
  }

  copyEmailBtn.textContent = "Copied!";
  setTimeout(() => {
    copyEmailBtn.textContent = "Copy email";
  }, 1200);
});

const konami = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === konami[konamiIndex]) {
    konamiIndex += 1;
    if (konamiIndex === konami.length) {
      const retro =
        root.getAttribute("data-retro") === "on" ? "off" : "on";
      root.setAttribute("data-retro", retro);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

const downloadResume = document.getElementById("downloadResume");
if (downloadResume) {
  downloadResume.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Resume download feature - Upload your PDF to enable!");
  });
}
