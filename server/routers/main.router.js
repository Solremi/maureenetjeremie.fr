import express from "express";
import * as signup from "../controllers/signup.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.post("/api/signup", cw(signup.createUser));

export default router;