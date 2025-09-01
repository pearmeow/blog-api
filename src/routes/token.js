import { Router } from "express";
import { token } from "../controllers/index.js";

const router = Router();

router.post("/", token.post);

export default router;
