const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("./cloudinary");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// READ DATA
function readData() {
  return JSON.parse(fs.readFileSync("./server/data.json"));
}

// WRITE DATA
function writeData(data) {
  fs.writeFileSync("./server/data.json", JSON.stringify(data, null, 2));
}

//
// 🔥 GET ROUTES
//

app.get("/api/content", (req, res) => {
  const data = readData();
  res.json(data.content);
});

app.get("/api/projects", (req, res) => {
  const data = readData();
  res.json(data.projects);
});

app.get("/api/socials", (req, res) => {
  const data = readData();
  res.json(data.socials);
});

const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// Serve admin panel
app.use("/admin", express.static(path.join(__dirname, "../admin")));

//
// 🔥 POST ROUTES
//

// Update content
app.post("/api/content", (req, res) => {
  const data = readData();
  data.content = req.body;
  writeData(data);
  res.json({ message: "Content updated" });
});

// Add project
app.post("/api/project", (req, res) => {
  const data = readData();
  data.projects.push(req.body);
  writeData(data);
  res.json({ message: "Project added" });
});

// Add social
app.post("/api/social", (req, res) => {
  const data = readData();
  data.socials.push(req.body);
  writeData(data);
  res.json({ message: "Social added" });
});

//
// 🖼 IMAGE UPLOAD (Cloudinary)
//

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    // delete temp file
    fs.unlinkSync(req.file.path);

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// 🚀 START SERVER
//

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});