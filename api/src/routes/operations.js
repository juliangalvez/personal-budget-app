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

router.post("/add", async (req, res) => {
  let { date, type, concept, amount } = req.body;

  //const searchOperation = await Operation.findOne({where: {id: id}})

  //if(searchOperation === null) { //en caso de que no exista
  try {
    const newOperation = await Operation.findOrCreate({
      where: {
        date: date,
        type: type,
        concept: concept,
        amount: amount,
      },
    });

    // const categoryN = await Category.findOne({
    //   where: {
    //     id: idcategory,
    //   },
    // });

    //await newProduct[0].addCategory(categoryN);

    res.status(200).json({ message: "Operation succesfully added" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Cant add operation" });
  }
  // } else {

  //   try{
  //   await Product.update({
  //     name: name,
  //     price: price,
  //     image: image,
  //     description: description,
  //     active: active,
  //     idcategory: idcategory,
  //     stock: stock
  //   }, {where: {id: id}})
  //   res.status(200).send("Producto editado")
  //   } catch(error){
  //     res.status(404).json(error)
  //   }
  // }
});

// router.put("/add/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Product.update({ active: false }, { where: { id: id } });
//     return res.status(200).json(id);
//   } catch (error) {
//     console.log("error: ", error);
//     res.status(404).json({ message: "Cant change amount" });
//   }
// });

module.exports = router;
