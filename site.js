"use strict";

document.querySelector(".print-button").addEventListener("click", () => window.print());

if ("IntersectionObserver" in window) {
  const navLinks = Array.from(document.querySelectorAll("nav a"));
  const markCurrent = (sectionId) => {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#" + sectionId) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };
  const atPageEnd = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
  const observer = new IntersectionObserver((entries) => {
    if (atPageEnd()) {
      markCurrent("contact");
      return;
    }
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (!visible.length) return;
    markCurrent(visible[0].target.id);
  }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) observer.observe(section);
    link.addEventListener("click", () => markCurrent(link.getAttribute("href").slice(1)));
  });
  window.addEventListener("scroll", () => {
    if (atPageEnd()) markCurrent("contact");
    else if (window.scrollY < 20) markCurrent("profile");
  }, { passive: true });
}
