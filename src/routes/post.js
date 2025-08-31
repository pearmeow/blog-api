import { Router } from "express";
import comments from "./comment.js";
import { post } from "../controllers/index.js";

const router = Router();

router.get("/", post.get);
router.get("/:postId", post.getId);
router.post("/", post.post);
router.post("/:postId", post.postId);
router.put("/", post.put);
router.put("/:postId", post.putId);
router.delete("/", post.del);
router.delete("/:postId", post.delId);
router.use("/comments", comments);

export default router;
