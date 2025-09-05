const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

// MongoDB Atlas connection
const uri = "mongodb+srv://aiquaticlabs_db_user:AiQuaticLabs123@aiquaticlabs-cluster.iuxjpdw.mongodb.net/ocean_data?retryWrites=true&w=majority&appName=aiquaticlabs-cluster";
const client = new MongoClient(uri);

// Serve frontend
app.use(express.static("public"));

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  const collectionName = path.basename(req.file.originalname, ext);

  try {
    await client.connect();
    const db = client.db("aiquaticlabs");
    const collection = db.collection(collectionName);

    if (ext === ".csv") {
      const rows = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", async () => {
          await collection.insertMany(rows);
          fs.unlinkSync(filePath);
          res.json({ message: `✅ CSV uploaded to ${collectionName}` });
        });
    } else if (ext === ".json") {
      const data = JSON.parse(fs.readFileSync(filePath));
      await collection.insertMany(Array.isArray(data) ? data : [data]);
      fs.unlinkSync(filePath);
      res.json({ message: `✅ JSON uploaded to ${collectionName}` });
    } else {
      res.status(400).json({ error: "Only CSV/JSON supported" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
