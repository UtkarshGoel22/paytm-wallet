import express from "express";

import accountRouter from "./account";
import userRouter from "./user";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
