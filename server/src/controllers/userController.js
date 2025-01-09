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

const getUserVotedPolls = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      polls.id AS poll_id,
      polls.title,
      polls.description,
      polls.type,
      polls.end_time,
      votes.id AS vote_id,
      votes.voted_at,
      users.username AS creator_username,
      users.img AS creator_img,
      DATE_FORMAT(votes.voted_at, '%Y-%m-%d %H:%i:%s') AS voted_at_formatted
    FROM 
      votes
    INNER JOIN 
      polls ON votes.poll_id = polls.id
    INNER JOIN 
      users ON polls.created_by = users.id
    WHERE 
      votes.user_id = ?
    ORDER BY 
      votes.voted_at DESC;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user voted polls:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    const votedPolls = results.map((row) => ({
      id: row.poll_id,
      title: row.title,
      description: row.description,
      type: row.type,
      end_time: row.end_time,
      vote_id: row.vote_id,
      voted_at: row.voted_at,
      voted_at_formatted: row.voted_at_formatted,
      creator: {
        id: row.created_by,
        username: row.creator_username,
        img: row.creator_img,
      },
    }));

    res.status(200).json({ polls: votedPolls });
  });
};


module.exports = { getUserProfile, getUserVotedPolls };
