import { Router } from "express";
import comments from "./comment.js";
import { post } from "../controllers/index.js";

const router = Router();

router.get("/", post.get);
router.get("/:postId", post.getId);
router.post("/", post.post);
router.put("/:postId", post.putId);
router.delete("/:postId", post.delId);
router.use("/comments", comments);

export default router;
