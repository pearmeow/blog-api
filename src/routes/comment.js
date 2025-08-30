const { Router } = require("express");

const router = Router();

router.get("/");
router.get("/:commentId");
router.post("/");
router.post("/:commentId");
router.put("/");
router.put("/:commentId");
router.delete("/");
router.delete("/:commentId");

module.exports = router;
