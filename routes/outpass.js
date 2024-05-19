const express = require("express");
const { generatePass } = require("../controllers/Outpass");

const router = express.Router();

router.post("/generatePass", generatePass);

module.exports = router;
