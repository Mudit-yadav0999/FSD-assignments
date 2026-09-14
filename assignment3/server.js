import express from "express";

const app = express();

const PORT = 3000;

// Serve static files from public folder
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});