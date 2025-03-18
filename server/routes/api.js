const express = require("express");
const router = express.Router();
const eras = require("../data/eras.json");
const websites = require("../data/websites.json");
const techSpecs = require("../data/techSpecs.json");

router.get("/eras", (req, res) => {
  res.json(eras);
});

router.get("/websites", (req, res) => {
  const { era } = req.query;
  const filtered = websites.filter((site) => site.era === era);
  res.json(filtered);
});

router.get("/techSpecs", (req, res) => {
  const { era } = req.query;
  const spec = techSpecs.find((s) => s.era === era) || {};
  res.json(spec);
});

module.exports = router;
