import { Router } from "express";
import { post } from "../controllers/index.js";
import { comment } from "../controllers/index.js";

const router = Router();

router.get("/", post.get);
router.get("/:postId", post.getId);
router.post("/", post.post);
router.put("/:postId", post.putId);
router.delete("/:postId", post.delId);

router.get("/:postId/comments", comment.get);
router.get("/:postId/comments/:commentId", comment.getId);
router.post("/:postId/comments/", comment.post);
router.put("/:postId/comments/:commentId", comment.putId);
router.delete("/:postId/comments/:commentId", comment.delId);

export default router;
