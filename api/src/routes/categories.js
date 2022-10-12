const { Router } = require("express");
const router = Router();
const { Category } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    let results = [];
    results = await Category.findAll();

    let balance = 0;

    if (results.length === 0) {
      res.status(404).json("No results found");
    } else {
      res.status(200).json({ results });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/add", async (req, res) => {
  let { category } = req.body;
  console.log(category);
  try {
    await Category.create(category);

    res.status(200).json({ message: "Category succesfully added" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Cant add category" });
  }
});

module.exports = router;
