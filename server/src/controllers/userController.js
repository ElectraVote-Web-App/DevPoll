// Assuming you're using Express and mysql2
const db = require("../config/database");

// Get user profile by userId
const getUserProfile = (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  // Query to fetch the user profile data
  const query = `
    SELECT id, username, img
    FROM users
    WHERE id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user profile data as response
    res.json(results[0]);
  });
};

const getUserVotedPolls = async (req, res) => {
  const { userId } = req.params;


    // Query to fetch polls a user has voted in
    const query = `
      SELECT 
        polls.id AS poll_id,
        polls.title,
        polls.description,
        polls.type,
        polls.end_time,
        votes.id AS vote_id,
        votes.voted_at
      FROM votes
      INNER JOIN polls ON votes.poll_id = polls.id
      WHERE votes.user_id = ?;
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching user profile:", err);
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }
  
      // if (results.length === 0) {
      //   return res.status(404).json({ message: "No polls found for this user." });
      // }
  
      // Send the user profile data as response
      res.json({ polls: results });
    });
};


module.exports = { getUserProfile, getUserVotedPolls };
