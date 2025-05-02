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

document.addEventListener("DOMContentLoaded", function() {
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;
});