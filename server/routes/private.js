const router = require("express").Router();
const profileController = require("../controllers").profile;

router.get("/my-account", profileController.show);
router.post("/my-account", profileController.update);

module.exports = router;
