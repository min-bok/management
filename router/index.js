const express = require("express");
const router = express.Router();
const customer = require("./customer");
const authRouter = require("./auth");

router.use("/customers", customer);
// router.use("/auth", authRouter);

module.exports = router;
