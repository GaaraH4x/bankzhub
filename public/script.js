const API = "https://bankz-hub.onrender.com/api";

async function loadContent() {
  const res = await fetch(`${API}/content`);
  const data = await res.json();

  document.getElementById("hero-name").innerText = data.name;
  document.getElementById("hero-tagline").innerText = data.tagline;
  document.getElementById("hero-hook").innerText = data.hook;

  // buttons
  const btnContainer = document.getElementById("hero-buttons");
  data.buttons.forEach(btn => {
    const a = document.createElement("a");
    a.href = btn.link;
    a.innerText = btn.text;
    a.className = "btn";
    btnContainer.appendChild(a);
  });

  // slider
  let i = 0;
  const slider = document.getElementById("slider");
  setInterval(() => {
    slider.src = data.images[i];
    i = (i + 1) % data.images.length;
  }, 2500);
}

async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();

  const container = document.getElementById("projects-container");

  projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "project-card";

    div.innerHTML = `
      <img src="${p.image}" width="100%">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <a href="${p.link}" target="_blank">View</a>
    `;

    container.appendChild(div);
  });
}

async function loadSocials() {
  const res = await fetch(`${API}/socials`);
  const socials = await res.json();

  const container = document.getElementById("social-links");

  socials.forEach(s => {
    const a = document.createElement("a");
    a.href = s.link;
    a.innerText = s.name;
    container.appendChild(a);
  });
}

loadContent();
loadProjects();
loadSocials();
