import { Router } from "express";
import { user } from "../controllers/index.js";

const router = Router();

router.get("/", user.get);
router.get("/:userId", user.getId);
router.post("/", user.post);
router.put("/:userId", user.putId);
router.delete("/:userId", user.delId);

export default router;
