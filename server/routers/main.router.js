import express from "express";
import * as signup from "../controllers/signup.controller.js";
import * as login from "../controllers/login.controller.js";
import * as guestbook from "../controllers/guestbook.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.post("/api/signup", cw(signup.createUser));
router.post("/api/login", cw(login.loginUser));
router.post("/api/logout", cw(login.logoutUser));
router.get(('/api/guestbook'), cw(guestbook.getMessage));
router.post(('/api/guestbook'), cw(guestbook.addMessage));


export default router;