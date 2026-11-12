const express = require("express");

const app = express();
app.use(express.json());

const REGISTRATION_URL = "http://localhost:5001";
const SEARCH_URL = "http://search-service:5002";

app.get("/", (req, res) => {
  res.json({
    message: "Student Management API Gateway is running",
    services: ["Registration", "Search Student"]
  });
});

app.post("/register", async (req, res) => {
  try {
    const response = await fetch(`${REGISTRATION_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  try {
    const query = new URLSearchParams(req.query);
    const response = await fetch(
      `${SEARCH_URL}/search?${query.toString()}`
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
});

app.listen(5050, "0.0.0.0", () => {
  console.log("API Gateway running on port 5050");
});
