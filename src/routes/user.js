const { Router } = require("express");

const router = Router();

router.get("/");
router.get("/:userId");
router.post("/");
router.post("/:userId");
router.put("/");
router.put("/:userId");
router.delete("/");
router.delete("/:userId");

module.exports = router;
