const express = require("express");
const { getPolls, createPoll, editPoll, deletePoll, getPoll, votePoll, getVoteStatistiques } = require("../controllers/pollController");
const authMiddleware = require("../middlewars/authMiddleware");

const router = express.Router();

// pollRoutes
router.get("/", getPolls);
router.post("/", createPoll);
router.get("/:id", getPoll);
router.put("/:id", editPoll);
router.delete("/:id", deletePoll);
router.post('/vote', authMiddleware, votePoll);
router.get("/:id/statistics", (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
}, getVoteStatistiques);

module.exports = router;
