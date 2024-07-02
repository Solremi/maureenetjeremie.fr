import express from "express";
import * as signup from "../controllers/signup.controller.js";
import * as login from "../controllers/login.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.post("/api/signup", cw(signup.createUser));
router.post("/api/login", cw(login.loginUser));
router.post("/api/logout", cw(login.logoutUser));


export default router;