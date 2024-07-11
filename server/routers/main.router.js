import express from "express";
import * as signup from "../controllers/signup.controller.js";
import * as login from "../controllers/login.controller.js";
import * as guestbook from "../controllers/guestbook.controller.js";
import { userSession } from '../controllers/session.controller.js';
import * as picture from "../controllers/picture.controller.js";
import cw from "../middlewares/controllerWrapper.middleware.js";

const router = express.Router();

router.post("/api/signup", cw(signup.createUser));

router.post("/api/login",  cw(login.loginUser));
router.post("/logout", cw(login.logoutUser));

router.get("/api/guestbook",  cw(guestbook.showGuestbookMessages));
router.post("/api/guestbook",  cw(guestbook.createMessage));

router.get('/api/session', userSession);

router.post('/api/picture', cw(picture.uploadImage));
router.get('/api/picture',  cw(picture.getImages));

export default router;
