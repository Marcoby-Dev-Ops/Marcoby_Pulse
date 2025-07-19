import express from "express";
import userAuth from "../middlewares/user.auth";
import { getUserData } from "../controllers/user.controller";

const router = express.Router();

router.get("/data", userAuth, getUserData);

export default router;
