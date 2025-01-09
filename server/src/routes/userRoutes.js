const {getUserProfile, getUserVotedPolls, updateUserProfile} = require('../controllers/userController')

const express = require("express");

const router = express.Router();
router.get("/:userId", getUserProfile);
router.put("/:userId", updateUserProfile);
router.get("/:userId/voted-polls", getUserVotedPolls);

router.get("/", getUserProfile);

module.exports = router;
