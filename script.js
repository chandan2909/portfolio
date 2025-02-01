function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.addEventListener('click', (event) => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu.contains(event.target) && !icon.contains(event.target) && menu.classList.contains("open")) {
    menu.classList.remove("open");
    icon.classList.remove("open");
    icon.setAttribute("aria-expanded", "false");
  }
});

// Theme switching functionality
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const label = themeToggle.querySelector('label');
    if (label) {
      label.textContent = newTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }
  }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const label = themeToggle.querySelector('label');
    if (label) {
      label.textContent = savedTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }
    themeToggle.addEventListener('click', toggleTheme);
  }
});
