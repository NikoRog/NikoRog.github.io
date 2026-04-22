const projects = [
  {
    title: "GodRun",
    description: "Fast jam-built prototype focused on momentum, readability, and a strong core loop.",
    meta: "Global Game Jam",
    site: "https://rogisa.itch.io/godrun-global-game-jam",
    tags: ["Jam", "Prototype"],
    icon: "directions_run"
  },
  {
    title: "Smoke Brake",
    description: "GMTK jam concept built around one clear mechanic and a compact presentation.",
    meta: "GMTK Game Jam",
    site: "https://rogisa.itch.io/smoke-brake-gmtk-game-jam",
    tags: ["Mechanic", "Jam"],
    icon: "smoking_rooms"
  },
  {
    title: "Gamblers Gate",
    description: "A darker game idea with a stronger world hook and more specific tone.",
    meta: "Personal Project",
    site: "https://rogisa.itch.io/gambler-city",
    tags: ["Tone", "World"],
    icon: "poker_chip"
  },
  {
    title: "AZIL_GJ_Blokjed",
    description: "Short-form game jam project designed to land quickly and communicate its idea fast.",
    meta: "Blokjed Jam",
    site: "https://rogisa.itch.io/azil-gj-blokjed",
    tags: ["Jam", "Fast Build"],
    icon: "pet_supplies"
  },
  {
    title: "Indeks Otpora",
    description: "A compact concept project shaped around interaction, message, and clear delivery.",
    meta: "Global Game Jam",
    site: "https://rogisa.itch.io/test1",
    tags: ["Interactive", "Concept"],
    icon: "book"
  }
];

const artLinks = [
  {
    title: "ArtStation",
    href: "https://www.artstation.com/nikolarogulja",
    icon: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M0 18l4-6h4l-4 6H0zm6-8l4-6h4l-4 6H6zm6 0l4 6h4l-4-6h-4z"/>
      </svg>
    `
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/niko.rog/",
    icon: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.75 1.65a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"/>
      </svg>
    `
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@Highflyer_Project",
    icon: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.7V8.3L16 12l-6.4 3.7Z"/>
      </svg>
    `
  }
];

const artImages = [
  "assets/images/01 .png",
  "assets/images/03 fortr creatrive 2.png",
  "assets/images/04 saint jerome close.jpg",
  "assets/images/05 driver_1.jpg",
  "assets/images/06 drvoArt_2.jpg",
  "assets/images/07 wolfGray.png",
  "assets/images/igrica.png",
  "assets/images/locked in v3.jpg",
  "assets/images/snakeRingCol_2.png"
];

const artLinksContainer = document.getElementById("art-links");
const artGalleryList = document.getElementById("art-gallery-list");
const artPrev = document.getElementById("art-prev");
const artNext = document.getElementById("art-next");
const projectList = document.getElementById("project-list");
const projectDetailHost = document.getElementById("project-detail-host");
const shelfPrev = document.getElementById("shelf-prev");
const shelfNext = document.getElementById("shelf-next");
const topbar = document.getElementById("topbar");
const topbarShell = document.getElementById("topbar-shell");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

let activeProjectIndex = null;

function renderArtLinks() {
  artLinksContainer.innerHTML = artLinks.map((item) => `
    <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="art-link-card${item.title === "ArtStation" ? " has-text status-pill" : ""}" aria-label="${item.title}" title="${item.title}">
      ${item.icon}
      <span>${item.title}</span>
    </a>
  `).join("");
}

function renderProjects() {
  projectList.innerHTML = "";
  projectDetailHost.innerHTML = "";

  projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `project-card${activeProjectIndex === index ? " active" : ""}`;
    button.innerHTML = `
      <span class="project-card-icon material-symbols-outlined" aria-hidden="true">${project.icon}</span>
      <span class="project-card-title">${project.title}</span>
    `;

    button.addEventListener("click", () => {
      activeProjectIndex = activeProjectIndex === index ? null : index;
      renderProjects();
    });

    projectList.appendChild(button);
  });

  if (activeProjectIndex !== null) {
    const project = projects[activeProjectIndex];
    const detail = document.createElement("div");
    detail.className = "project-detail";
    detail.innerHTML = `
      <h3>${project.title}</h3>
      <div class="project-body">
        <p>${project.description}</p>
        <div class="feature-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${project.site}" target="_blank" rel="noopener noreferrer" class="project-link">open project &#8599;</a>
        </div>
      </div>
    `;
    projectDetailHost.appendChild(detail);
  }
}

function renderArtGallery() {
  if (!artGalleryList) {
    return;
  }

  const sortedImages = [...artImages].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  artGalleryList.innerHTML = sortedImages.map((src) => `
    <button class="art-thumb" type="button" data-image="${src}" aria-label="Open artwork fullscreen">
      <img src="${src}" alt="">
    </button>
  `).join("");

  artGalleryList.querySelectorAll(".art-thumb").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button.dataset.image));
  });
}

function scrollShelf(direction) {
  const amount = Math.min(340, projectList.clientWidth * 0.85);
  projectList.scrollBy({ left: amount * direction, behavior: "smooth" });
}

function updateTopbar() {
  topbar.classList.toggle("is-scrolled", window.scrollY > 36);
}

function setupMobileHeaderJump() {
  if (!topbarShell) {
    return;
  }

  topbarShell.addEventListener("click", (event) => {
    if (window.innerWidth > 767) {
      return;
    }

    event.preventDefault();
    window.location.hash = "contact";
  });
}

function scrollArtGallery(direction) {
  if (!artGalleryList) {
    return;
  }

  const amount = Math.min(360, artGalleryList.clientWidth * 0.85);
  artGalleryList.scrollBy({ left: amount * direction, behavior: "smooth" });
}

function openLightbox(src) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = src;
  lightbox.hidden = false;
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
}

function setupArtGallery() {
  if (!artPrev || !artNext) {
    return;
  }

  artPrev.addEventListener("click", () => scrollArtGallery(-1));
  artNext.addEventListener("click", () => scrollArtGallery(1));

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

shelfPrev.addEventListener("click", () => scrollShelf(-1));
shelfNext.addEventListener("click", () => scrollShelf(1));
window.addEventListener("scroll", updateTopbar, { passive: true });

renderArtLinks();
renderArtGallery();
renderProjects();
updateTopbar();
setupMobileHeaderJump();
setupArtGallery();
