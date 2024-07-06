import express from "express";
import * as signup from "../controllers/signup.controller.js";
import * as login from "../controllers/login.controller.js";
import * as guestbook from "../controllers/guestbook.controller.js";
import * as session from "../controllers/session.controller.js";
import * as picture from "../controllers/picture.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/api/signup", cw(signup.createUser));

router.post("/api/login",  cw(login.loginUser));
router.post("/api/logout", cw(login.logoutUser));

router.get("/api/guestbook", isAuthenticated, cw(guestbook.showGuestbookMessages));
router.post("/api/guestbook", isAuthenticated, cw(guestbook.createMessage));

router.get('/api/session', isAuthenticated, cw(session.userSession));

router.post('/api/picture', isAuthenticated, cw(picture.uploadImage));
router.get('/api/picture', isAuthenticated, cw(picture.getImages));

export default router;
