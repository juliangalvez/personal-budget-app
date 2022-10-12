const { Router } = require("express");
const router = Router();
const { Operation, Category } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    let results = [];
    results = await Operation.findAll({ include: [{ model: Category }] });

    let balance = 0;
    if (results) {
      balance = JSON.parse(JSON.stringify(results)).reduce((acc, curr) => {
        console.log(curr.amount);
        if (curr.type === "Income") {
          return acc + curr.amount;
        } else {
          return acc - curr.amount;
        }
      }, 0);
      console.log(balance);
    }

    if (results.length === 0) {
      res.status(404).json("No results found");
    } else {
      res.status(200).json({ results: results, balance: balance });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/add", async (req, res) => {
  let { operation } = req.body;

  try {
    const newOperation = await Operation.create(operation);

    newOperation.addCategory(operation.category);
    const findOp = await Operation.findByPk(newOperation.id, {
      include: [{ model: Category }],
    });

    res.status(200).json({ message: "Operation succesfully added" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Cant add operation" });
  }
});

router.patch("/edit", async (req, res) => {
  const { id, amount } = req.body;
  console.log(req.body);
  try {
    await Operation.update({ amount: amount }, { where: { id: id } });
    return res.status(200).json(id);
  } catch (error) {
    console.log("error: ", error);
    res.status(404).json({ message: "Cant change amount" });
  }
});
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  console.log("delete esto " + req.body);
  try {
    await Operation.destroy({ where: { id: id } });
    return res.status(200).json(id);
  } catch (error) {
    console.log("error: ", error);
    res.status(404).json({ message: "Cant delete operation" });
  }
});

module.exports = router;
