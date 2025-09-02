import { Router } from "express";
import { authortoken, usertoken } from "../controllers/index.js";

const router = Router();

router.post("/users", usertoken.post);
router.post("/authors", authortoken.post);

export default router;
