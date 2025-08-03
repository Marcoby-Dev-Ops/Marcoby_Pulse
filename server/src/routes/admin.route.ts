import express from "express";
import { signInAdmin } from "../controllers/adminAuth.controller";

const router = express.Router();

router.post("/sign-in", signInAdmin);

export default router;
