const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navItems = Array.from(document.querySelectorAll(".nav-link"));
const copyEmailBtn = document.getElementById("copyEmail");
const confettiLayer = document.getElementById("confetti");

const contactForm = document.getElementById("contactForm");
const thankYou = document.getElementById("thankYou");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const sections = navItems.map((item) =>
  document.querySelector(item.getAttribute("href"))
);

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = theme === "dark" ? "🌙" : "☀️";
  const iconEl = themeToggle.querySelector(".toggle-icon");
  if (iconEl) {
    iconEl.textContent = icon;
  }
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

function updateActiveNav() {
  const scrollPos = window.scrollY + 140;
  let activeIndex = 0;

  sections.forEach((section, index) => {
    if (section && section.offsetTop <= scrollPos) {
      activeIndex = index;
    }
  });

  navItems.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let valid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = "Please enter your name.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = "Please enter a message.";
    valid = false;
  } else {
    messageError.textContent = "";
  }

  if (valid) {
    thankYou.textContent = "Thanks for reaching out! I will reply soon.";
    contactForm.reset();
  } else {
    thankYou.textContent = "";
  }
});

function sparkleBurst(x, y) {
  const count = 14;
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
    confettiLayer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 700);
  }
}

copyEmailBtn.addEventListener("click", (event) => {
  const email = "steffyrajsoni@gmail.com";
  const rect = event.target.getBoundingClientRect();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      sparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  } else {
    sparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
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
      const retro = root.getAttribute("data-retro") === "on" ? "off" : "on";
      root.setAttribute("data-retro", retro);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
