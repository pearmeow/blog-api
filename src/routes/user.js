const { Router } = require("express");
const { user } = require("../controllers");

const router = Router();

router.get("/", user.get);
router.get("/:userId", user.getId);
router.post("/", user.post);
router.post("/:userId", user.postId);
router.put("/", user.put);
router.put("/:userId", user.putId);
router.delete("/", user.del);
router.delete("/:userId", user.delId);

module.exports = router;
