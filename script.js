const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const mountainDialog = document.querySelector("#mountain-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogLocation = document.querySelector("#dialog-location");
const dialogDescription = document.querySelector("#dialog-description");
const destinationMap = document.querySelector("#destination-map");
const mapLocationStatus = document.querySelector("#map-location-status");

const mountainDetails = {
  k2: {
    title: "K2",
    location: "Karakoram Range · Pakistan / China · 8,611 m",
    description: "K2 is the world's second-highest mountain and is renowned for its steep, technically demanding routes. The surrounding Karakoram is a remarkable landscape of glaciers, high passes, and remote valleys."
  },
  everest: {
    title: "Mount Everest",
    location: "Himalaya · Nepal / Tibet · 8,849 m",
    description: "Earth's highest mountain stands at the heart of the Himalaya. The trails of the Khumbu region offer trekkers a close look at immense peaks, Sherpa culture, and high-altitude life."
  },
  nanga: {
    title: "Nanga Parbat",
    location: "Himalaya · Pakistan · 8,126 m",
    description: "Rising above the Indus River, Nanga Parbat is known for its enormous Rupal Face and striking scale. The surrounding region rewards visitors with dramatic scenery and quieter mountain routes."
  },
  rakaposhi: {
    title: "Rakaposhi",
    location: "Karakoram Range · Pakistan · 7,788 m",
    description: "Rakaposhi's long, snowy ridge dominates the view from Pakistan's Hunza Valley. Its dramatic rise from the valley floor makes it one of the most memorable sights in the region."
  },
  broad: {
    title: "Broad Peak",
    location: "Karakoram Range · Pakistan / China · 8,051 m",
    description: "Named for its unusually wide summit ridge, Broad Peak stands close to K2 and the Baltoro Glacier. Its remote setting reveals the immense scale of the central Karakoram."
  },
  matterhorn: {
    title: "Matterhorn",
    location: "Pennine Alps · Switzerland / Italy · 4,478 m",
    description: "The Matterhorn's distinctive pyramid shape rises above Zermatt and is one of the Alps' most recognizable profiles. Nearby walking trails offer spectacular views without requiring a summit climb."
  }
};

function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navMenu.classList.toggle("is-open", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
  });
}

navMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (mountainDialog) {
  document.querySelectorAll(".mountain-details").forEach((button) => {
    button.addEventListener("click", () => {
      const details = mountainDetails[button.dataset.mountain];
      if (!details) return;
      dialogTitle.textContent = details.title;
      dialogLocation.textContent = details.location;
      dialogDescription.textContent = details.description;
      mountainDialog.showModal();
    });
  });

  mountainDialog.querySelector(".dialog-close")?.addEventListener("click", () => mountainDialog.close());

  mountainDialog.addEventListener("click", (event) => {
    if (event.target === mountainDialog) mountainDialog.close();
  });

  mountainDialog.querySelector(".dialog-cta")?.addEventListener("click", () => mountainDialog.close());
}

if (destinationMap) {
  document.querySelectorAll(".map-region-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { mapQuery, mapZoom, mapLabel } = button.dataset;
      destinationMap.src = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${mapZoom}&output=embed`;
      destinationMap.title = `Interactive map centered on ${mapLabel}`;
      mapLocationStatus.textContent = `Showing ${mapLabel}.`;
      document.querySelectorAll(".map-region-button").forEach((regionButton) => {
        const isActive = regionButton === button;
        regionButton.classList.toggle("is-active", isActive);
        regionButton.setAttribute("aria-pressed", String(isActive));
      });
    });
  });
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  formStatus.textContent = "Thanks for reaching out. Your note is ready, but this demo does not send it to a server.";
  contactForm.reset();
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}