import express from "express";
import customerRouter from "./customer";
import authRouter from "./auth";

const router = express.Router();

router.use("/customers", customerRouter);
router.use("/auth", authRouter);

module.exports = router;
