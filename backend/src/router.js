const express = require("express");

const { ItemController, MembersController } = require("./controllers");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

router.post("/auth/members", MembersController.add);
router.get("/members", MembersController.browse);
router.post("/login/members", MembersController.login);
router.get("/logout/members", MembersController.logout);
router.get("/members/:id", MembersController.read);
router.delete("/members/:id", MembersController.delete);
router.put("/members/:id", MembersController.edit);

module.exports = router;
