// Toggle dark theme with local storage
let html = document.querySelector("html");
let theme = window.localStorage.getItem("theme");
if (theme) {
  theme === "dark"
    ? html.classList.add("dark")
    : html.classList.remove("dark");
} else if (html.classList.contains("dark")) {
  window.localStorage.setItem("theme", "dark");
} else {
  html.classList.remove("dark");
  window.localStorage.setItem("theme", "light");
}

window.onload = () => {
  let themeToggle = document.querySelector(".theme-toggle");
  if (window.localStorage.getItem("theme") === "dark") {
    themeToggle.classList.remove("bi-moon-fill");
    themeToggle.classList.add("bi-brightness-high");
  } else {
    themeToggle.classList.add("bi-moon-fill");
    themeToggle.classList.remove("bi-brightness-high");
  }

  let defaultActivePanel = document.querySelector(".accordion.active");
  if (defaultActivePanel) {
    defaultActivePanel.nextElementSibling.style.maxHeight =
      defaultActivePanel.nextElementSibling.scrollHeight + "px";
  }
};

window.onresize = () => {
  let defaultActivePanel = document.querySelector(".accordion.active");
  if (defaultActivePanel) {
    defaultActivePanel.nextElementSibling.style.maxHeight =
      defaultActivePanel.nextElementSibling.scrollHeight + "px";
  }
};

const lightDark = (el) => {
  let html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    el.classList.add("fa-moon");
    el.classList.remove("fa-sun");
    window.localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    el.classList.add("fa-sun");
    el.classList.remove("fa-moon");
    window.localStorage.setItem("theme", "dark");
  }
};

// Accordion
const allPanels = Array.from(document.querySelectorAll(".panel"));
const allAccordion = Array.from(document.querySelectorAll(".accordion"));
const expandAccordion = (elem) => {
  if (!elem.parentElement.classList.contains("active")) {
    allAccordion.forEach((acc) => {
      acc.classList.remove("active");
    });
    elem.parentElement.classList.add("active");
    allPanels.forEach(function (elem) {
      elem.style.maxHeight = null;
    });
    let activePanel = elem.parentElement.nextElementSibling;
    if (
      activePanel.id != "skill-panel" &&
      document.querySelector("#skill-panel")
    ) {
      let skillBars = Array.from(document.querySelectorAll("#skill-percent"));
      skillBars.forEach((elem) => {
        elem.style.width = "0";
      });
    }
    activePanel.style.maxHeight = activePanel.scrollHeight + "px";
  }
};


// Show list of project from json file
fetch('../src/project-info.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.querySelector('.project-list');

    Object.values(projects).forEach(project => {
      if (!project.title || !project.link) return; // skip if missing

      const h4 = document.createElement('h4');
      const a = document.createElement('a');
      const p = document.createElement('p');

      a.href = project.link;
      a.textContent = project.title;
      p.textContent = project.description;

      h4.appendChild(a);
      container.appendChild(h4);
      container.appendChild(p);
    });
  })
  .catch(err => console.error("Error loading projects:", err));