const API = "https://bankz-hub.onrender.com/api";

/* async function loadContent() {
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

*/

// HERO CONTENT
async function loadContent() {
  const res = await fetch(`${API}/content`);
  const data = await res.json();

  document.getElementById("hero-name").innerText = data.name;
  document.getElementById("hero-tagline").innerText = data.tagline;
  document.getElementById("hero-hook").innerText = data.hook;

  const btnContainer = document.getElementById("hero-buttons");
  btnContainer.innerHTML = "";

  data.buttons.forEach(btn => {
    const a = document.createElement("a");
    a.href = btn.link;
    a.innerText = btn.text;
    a.className = "btn btn-primary";
    a.target = "_blank";
    btnContainer.appendChild(a);
  });

  // IMAGE SLIDER
  let i = 0;
  const slider = document.getElementById("slider");

  if (data.images.length > 0) {
    setInterval(() => {
      slider.style.opacity = "0";
      setTimeout(() => {
        slider.src = data.images[i];
        slider.style.opacity = "1";
        i = (i + 1) % data.images.length;
      }, 300);
    }, 2500);
  }
}

// SCROLL REVEAL (from your original code)
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// PROJECTS
async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();

  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "project-card reveal";

    div.innerHTML = `
      <span class="project-tag">${p.tag}</span>
      <div class="project-name">${p.title}</div>
      <p class="project-desc">${p.desc}</p>
      <span class="project-arrow">→ View Project</span>
    `;

    div.onclick = () => window.open(p.link, "_blank");

    container.appendChild(div);
  });
}

// SOCIALS
async function loadSocials() {
  const res = await fetch(`${API}/socials`);
  const socials = await res.json();

  const container = document.getElementById("social-links");
  container.innerHTML = "";

  socials.forEach(s => {
    const a = document.createElement("a");
    a.href = s.link;
    a.innerText = s.name;
    a.target = "_blank";
    container.appendChild(a);
  });
}

/*
  // IMAGE SLIDER 
  const images = ["image1.png", "image2.png", "image3.png"];
  let index = 0;
  const slider = document.getElementById("slider");

  setInterval(() => {
    slider.style.opacity = "0";
    setTimeout(() => {
      index = (index + 1) % images.length;
      slider.src = images[index];
      slider.style.opacity = "1";
    }, 300);
  }, 2500);

  // SCROLL REVEAL 
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
*/

loadContent();
loadProjects();
loadSocials();