import { Router } from "express";
import { user } from "../controllers/index.js";

const router = Router();

router.get("/", user.get);
router.get("/:userId", user.getId);
router.post("/", user.post);
router.post("/:userId", user.postId);
router.put("/", user.put);
router.put("/:userId", user.putId);
router.delete("/", user.del);
router.delete("/:userId", user.delId);

export default router;
