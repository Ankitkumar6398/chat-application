import express from 'express';
import {getMessage, sendMessage} from "../controllers/message.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.route("/send/:id").post(isAuth,sendMessage);
router.route("/:id").get(isAuth,getMessage);
export default router;