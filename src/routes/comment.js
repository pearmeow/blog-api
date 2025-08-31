import { Router } from "express";
import { comment } from "../controllers";
const router = Router();

router.get("/", comment.get);
router.get("/:commentId", comment.getId);
router.post("/", comment.post);
router.post("/:commentId", comment.postId);
router.put("/", comment.put);
router.put("/:commentId", comment.putId);
router.delete("/", comment.del);
router.delete("/:commentId", comment.delId);

export default router;
