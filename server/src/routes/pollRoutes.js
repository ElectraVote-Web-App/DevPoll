const express = require("express");
const { getPolls, createPoll, editPoll, deletePoll, getPoll } = require("../controllers/pollController");

const router = express.Router();

// pollRoutes
router.get("/", getPolls);
router.post("/", createPoll);
router.get("/:id", getPoll)
router.put("/:id", editPoll);
router.delete("/:id", deletePoll);



module.exports = router;
