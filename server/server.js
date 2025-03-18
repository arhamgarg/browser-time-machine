const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", require("./routes/api"));

// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
