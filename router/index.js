const express = require("express");
const router = express.Router();
const customerRouter = require("./customer");
const authRouter = require("./auth");

router.use("/customers", customerRouter);
router.use("/auth", authRouter);

module.exports = router;
