import { Router } from "express";
import { comment } from "../controllers/index.js";
const router = Router();

router.get("/", comment.get);
router.get("/:commentId", comment.getId);
router.post("/", comment.post);
router.put("/:commentId", comment.putId);
router.delete("/:commentId", comment.delId);

export default router;
