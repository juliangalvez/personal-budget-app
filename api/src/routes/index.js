const { Router } = require("express");
const router = Router();
const operations = require("./operations.js");

router.use("/operations", operations);

module.exports = router;
