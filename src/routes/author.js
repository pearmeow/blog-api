import { Router } from "express";
import { author } from "../controllers/index.js";

const router = Router();

router.get("/", author.get);
router.get("/:authorId", author.getId);
router.post("/", author.post);
router.put("/:authorId", author.putId);
router.delete("/:authorId", author.delId);

export default router;
