const { Router } = require("express");
const router = Router();
const operations = require("./operations.js");
const categories = require("./categories.js");

router.use("/operations", operations);
router.use("/categories", categories);

module.exports = router;
