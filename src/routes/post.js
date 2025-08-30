const { Router } = require("express");
const comments = require("./comment");

const router = Router();

router.get("/");
router.get("/:postId");
router.post("/");
router.post("/:postId");
router.put("/");
router.put("/:postId");
router.delete("/");
router.delete("/:postId");
router.use("/comments", comments);

module.exports = router;
