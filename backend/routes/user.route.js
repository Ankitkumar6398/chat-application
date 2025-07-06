import express from 'express';
import { getOtherUsers, login, logout, register, updateProfilePhoto } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/').get(isAuth, getOtherUsers);
router.route('/profile-photo').put(isAuth, updateProfilePhoto);

export default router;