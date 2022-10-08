const { Router } = require("express");
const router = Router();
const { Operation } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    let results = [];
    results = await Operation.findAll();

    if (results.length === 0) {
      res.status(404).json("No results found");
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
