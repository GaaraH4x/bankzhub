const API = "https://bankz-hub.onrender.com/api";

// UPDATE HERO
async function updateContent() {
  const data = {
    name: document.getElementById("name").value,
    tagline: document.getElementById("tagline").value,
    hook: document.getElementById("hook").value,
    buttons: [],
    images: []
  };

  await fetch(`${API}/content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Updated!");
}

// UPLOAD IMAGE
async function uploadImage() {
  const file = document.getElementById("imageFile").files[0];

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  alert("Image URL: " + data.url);
}

// ADD PROJECT
async function addProject() {
  const project = {
    title: document.getElementById("pTitle").value,
    desc: document.getElementById("pDesc").value,
    link: document.getElementById("pLink").value,
    image: document.getElementById("pImage").value
  };

  await fetch(`${API}/project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project)
  });

  alert("Project added!");
}

// ADD SOCIAL
async function addSocial() {
  const social = {
    name: document.getElementById("sName").value,
    link: document.getElementById("sLink").value
  };

  await fetch(`${API}/social`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(social)
  });

  alert("Social added!");
}
