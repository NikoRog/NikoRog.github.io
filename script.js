const CONFIG = {
  shelfScrollRatio: 0.85,
  shelfScrollMax: 340,
  minProgressWidth: 0.18,
  topbarScrollThreshold: 36,
  mobileMaxWidth: 767
};

const projects = [
  {
    title: "Morosha: Uno",
    description: "In-development co-op survival roguelite shooter.",
    role: "Game Designer",
    tools: "Godot, Blender",
    site: "",
    icon: "forest",
    bullets: [
      "Designed the core loop around wave survival, resource management, and player progression",
      "Developed systems for enemy waves, weapon variety, and upgrade-based builds",
      "Defined cooperative replayability through dynamic difficulty and run structure"
    ]
  },
  {
    title: "MadTrooper",
    description: "Web and mobile game.",
    role: "Game Designer / Team Lead",
    tools: "Unity, Blender",
    site: "",
    icon: "rocket_launch",
    bullets: [
      "Led development from concept to playable build",
      "Designed and implemented core gameplay systems and progression loop",
      "Coordinated team tasks and feature priorities"
    ]
  },
  {
    title: "Race of Fata",
    description: "Prototype arcade kart racer set in a stylized fairy tale world.",
    role: "Game Designer",
    tools: "Godot, Blender",
    site: "",
    icon: "sports_motorsports",
    bullets: [
      "Designed driving mechanics including drifting, trick system, and boost resource system",
      "Developed gameplay systems focused on speed control and player expression",
      "Defined thematic direction based on fairy tale environments"
    ]
  },
  {
    title: "Gamblers Gate",
    description: "Roguelike gambling game built around risk, reads, and controlled chance.",
    role: "Game Designer / Prototyper",
    tools: "Unity, Blender",
    site: "https://rogisa.itch.io/gambler-city",
    icon: "casino",
    bullets: [
      "Designed dice and card-based systems that reduce pure luck through player choice",
      "Built risk-reward decisions around betting, prediction, and upgrade planning",
      "Structured runs around readable pacing, escalating stakes, and replayability"
    ]
  }
];

const elements = {
  projectList: document.getElementById("project-list"),
  projectDetailHost: document.getElementById("project-detail-host"),
  shelfPrev: document.getElementById("shelf-prev"),
  shelfNext: document.getElementById("shelf-next"),
  shelfProgressBar: document.getElementById("shelf-progress-bar"),
  topbar: document.getElementById("topbar"),
  topbarShell: document.getElementById("topbar-shell")
};

let activeProjectIndex = null;

function createProjectButton(project, index) {
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

  return button;
}

function createProjectDetail(project) {
  const detail = document.createElement("div");
  const linkMarkup = project.site
    ? `<a href="${project.site}" target="_blank" rel="noopener noreferrer" class="project-link">open project &#8599;</a>`
    : "";

  detail.className = "project-detail";
  detail.innerHTML = `
    <h3>${project.title}</h3>
    <div class="project-body">
      <p>${project.description}</p>
      <div class="project-facts">
        <p><strong>Role:</strong> ${project.role}</p>
        <p><strong>Tools:</strong> ${project.tools}</p>
      </div>
      <ul class="project-bullets">
        ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
      <div class="project-links">${linkMarkup}</div>
    </div>
  `;

  return detail;
}

function renderProjects() {
  const { projectList, projectDetailHost } = elements;

  projectList.innerHTML = "";
  projectDetailHost.innerHTML = "";

  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    fragment.appendChild(createProjectButton(project, index));
  });
  projectList.appendChild(fragment);

  if (activeProjectIndex !== null) {
    projectDetailHost.appendChild(createProjectDetail(projects[activeProjectIndex]));
  }

  updateShelfProgress();
}

function scrollShelf(direction) {
  const { projectList } = elements;
  const amount = Math.min(CONFIG.shelfScrollMax, projectList.clientWidth * CONFIG.shelfScrollRatio);
  projectList.scrollBy({ left: amount * direction, behavior: "smooth" });
}

function updateShelfProgress() {
  const { projectList, shelfProgressBar } = elements;
  const maxScroll = projectList.scrollWidth - projectList.clientWidth;
  const visibleRatio = projectList.clientWidth / projectList.scrollWidth;
  const progress = maxScroll <= 0 ? 1 : projectList.scrollLeft / maxScroll;
  const thumbWidth = Math.max(CONFIG.minProgressWidth, Math.min(1, visibleRatio));
  const travel = 100 - thumbWidth * 100;

  shelfProgressBar.style.width = `${thumbWidth * 100}%`;
  shelfProgressBar.style.transform = `translateX(${progress * travel}%)`;
}

function updateTopbar() {
  elements.topbar.classList.toggle("is-scrolled", window.scrollY > CONFIG.topbarScrollThreshold);
}

function setupMobileHeaderJump() {
  elements.topbarShell.addEventListener("click", (event) => {
    if (window.innerWidth > CONFIG.mobileMaxWidth) {
      return;
    }

    event.preventDefault();
    window.location.hash = "contact";
  });
}

function init() {
  elements.shelfPrev.addEventListener("click", () => scrollShelf(-1));
  elements.shelfNext.addEventListener("click", () => scrollShelf(1));
  elements.projectList.addEventListener("scroll", updateShelfProgress, { passive: true });
  window.addEventListener("scroll", updateTopbar, { passive: true });
  window.addEventListener("resize", updateShelfProgress);

  renderProjects();
  updateTopbar();
  setupMobileHeaderJump();
}

init();
