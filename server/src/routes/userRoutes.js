const {getUserProfile, getUserVotedPolls} = require('../controllers/userController')

const express = require("express");

const router = express.Router();
router.get("/:userId", getUserProfile);
router.get("/:userId/voted-polls", getUserVotedPolls);

router.get("/", getUserProfile);

module.exports = router;
