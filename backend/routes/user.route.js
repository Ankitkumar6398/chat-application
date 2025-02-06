import express from 'express';
import {getOtherUsers, loginUser, logoutUser, registerUser} from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/').get(isAuth,getOtherUsers)

export default router;