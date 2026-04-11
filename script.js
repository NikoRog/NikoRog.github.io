const projects = [
  {
    title: "GodRun - Global Game Jam",
    description: "Game jam prototype from Global Game Jam.",
    site: "https://rogisa.itch.io/godrun-global-game-jam",
    widget: '<iframe frameborder="0" src="https://itch.io/embed/4251792?border_width=0&amp;dark=true" width="550" height="165"><a href="https://rogisa.itch.io/godrun-global-game-jam">GodRun - Global Game Jam by rogi</a></iframe>'
  },
  {
    title: "Smoke Brake_GMTK_game jam",
    description: "GMTK game jam project.",
    site: "https://rogisa.itch.io/smoke-brake-gmtk-game-jam",
    widget: '<iframe frameborder="0" src="https://itch.io/embed/3834246?border_width=0&amp;dark=true" width="550" height="165"><a href="https://rogisa.itch.io/smoke-brake-gmtk-game-jam">Smoke Brake_GMTK_game jam by rogi</a></iframe>'
  },
  {
    title: "Gamblers Gate",
    description: "Itch.io release with embedded widget.",
    site: "https://rogisa.itch.io/gambler-city",
    widget: '<iframe frameborder="0" src="https://itch.io/embed/3983948?border_width=0&amp;bg_color=222222&amp;fg_color=eeeeee&amp;border_color=363636" width="550" height="165"><a href="https://rogisa.itch.io/gambler-city">Gamblers Gate by rogi</a></iframe>'
  },
  {
    title: "AZIL_GJ_Blokjed",
    description: "Game jam prototype from Blokjed.",
    site: "https://rogisa.itch.io/azil-gj-blokjed",
    widget: '<iframe frameborder="0" src="https://itch.io/embed/3316524?border_width=0&amp;dark=true" width="550" height="165"><a href="https://rogisa.itch.io/azil-gj-blokjed">AZIL_GJ_Blokjed by rogi</a></iframe>'
  },
  {
    title: "Indeks Otpora - GGJ",
    description: "Educational project from Global Game Jam.",
    site: "https://rogisa.itch.io/test1",
    widget: '<iframe frameborder="0" src="https://itch.io/embed/3271894?border_width=0&amp;bg_color=222222&amp;fg_color=eeeeee&amp;link_color=ffffff&amp;border_color=363636" width="550" height="165"><a href="https://rogisa.itch.io/test1">Indeks Otpora - GGJ by rogi</a></iframe>'
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
    title: "YouTube",
    href: "https://www.youtube.com/@Highflyer_Project",
    icon: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.7V8.3L16 12l-6.4 3.7Z"/>
      </svg>
    `
  }
];

const artLinksContainer = document.getElementById("art-links");
const projectList = document.getElementById("project-list");
const projectDetailHost = document.getElementById("project-detail-host");
const shelfPrev = document.getElementById("shelf-prev");
const shelfNext = document.getElementById("shelf-next");

let activeProjectIndex = null;

function bindGlassTracking() {
  const glassItems = document.querySelectorAll(
    ".hero-links a, .about-links a, .project-link, .art-link-card, .project-card, .about-box, .project-detail"
  );

  glassItems.forEach((item) => {
    item.style.setProperty("--lx", "50%");
    item.style.setProperty("--ly", "50%");

    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      item.style.setProperty("--lx", `${x}%`);
      item.style.setProperty("--ly", `${y}%`);
    });

    item.addEventListener("pointerleave", () => {
      item.style.setProperty("--lx", "50%");
      item.style.setProperty("--ly", "50%");
    });
  });
}

function renderArtLinks() {
  artLinksContainer.innerHTML = artLinks.map((item) => `
    <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="art-link-card">
      ${item.icon}
      <span>${item.title}</span>
    </a>
  `).join("");

  bindGlassTracking();
}

function renderProjects() {
  projectList.innerHTML = "";
  projectDetailHost.innerHTML = "";

  projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `project-card${activeProjectIndex === index ? " active" : ""}`;
    button.innerHTML = `<span class="project-card-title">${project.title}</span>`;

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
        <div class="project-links">
          <a href="${project.site}" target="_blank" rel="noopener noreferrer" class="project-link">open project</a>
        </div>
      </div>
    `;
    projectDetailHost.appendChild(detail);
  }

  bindGlassTracking();
}

renderArtLinks();
renderProjects();

function updateAmbientGlow(x, y) {
  const root = document.documentElement;
  const px = (x / window.innerWidth) * 100;
  const py = (y / window.innerHeight) * 100;
  root.style.setProperty("--mx", `${px}%`);
  root.style.setProperty("--my", `${py}%`);
}

window.addEventListener("pointermove", (event) => {
  updateAmbientGlow(event.clientX, event.clientY);
});

document.body.addEventListener("pointerleave", () => {
  updateAmbientGlow(window.innerWidth * 0.5, window.innerHeight * 0.3);
});

updateAmbientGlow(window.innerWidth * 0.5, window.innerHeight * 0.3);

function scrollShelf(direction) {
  const amount = Math.min(260, projectList.clientWidth * 0.8);
  projectList.scrollBy({ left: amount * direction, behavior: "smooth" });
}

shelfPrev.addEventListener("click", () => scrollShelf(-1));
shelfNext.addEventListener("click", () => scrollShelf(1));
