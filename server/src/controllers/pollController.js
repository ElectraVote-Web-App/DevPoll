const db = require("../config/database");
const { formatDistanceToNow } = require("date-fns");
const getUserId = require("../lib/utils");

const getPollsByUserId = (req, res) => {
  const { userId } = req.params;

  // Query to fetch polls created by a specific user
  const pollsQuery = `
    SELECT 
      polls.id AS poll_id, 
      polls.title,
      polls.description, 
      polls.type, 
      polls.end_time, 
      polls.created_at, 
      polls.created_by, 
      users.username AS creator_username, 
      users.img AS creator_img,
      DATE_FORMAT(polls.created_at, '%Y-%m-%d %H:%i:%s') AS created_at_formatted
    FROM 
      polls
    LEFT JOIN 
      users ON polls.created_by = users.id
    WHERE 
      polls.created_by = ?
    ORDER BY 
      polls.created_at DESC
  `;

  db.query(pollsQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching polls:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    // Transform the results into a structured format
    const polls = results.map((row) => ({
      id: row.poll_id,
      title: row.title,
      description: row.description,
      type: row.type,
      end_time: row.end_time,
      created_at: row.created_at,
      created_by: row.created_by,
      created_at_formatted: row.created_at_formatted,
      creator: {
        id: row.created_by,
        username: row.creator_username,
        img: row.creator_img,
      },
    }));

    res.status(200).json(polls);
  });
};


const getPolls = (req, res) => {
  const { page, limit, filter } = req.query;
  if (filter === "popular_active") {
    return getPopularPolls(req, res);
  }
  if (page && limit) {
    return paginatPolls(req, res);
  }
  // Query to fetch polls and their options
  const pollsQuery = `
    SELECT 
      polls.id AS poll_id, 
      polls.end_time, 
      polls.description, 
      polls.type, 
      polls.created_at, 
      polls.created_by, 
      options.id AS option_id, 
      options.content AS option_content,
      options.poll_id
    FROM 
      polls
    LEFT JOIN 
      options ON polls.id = options.poll_id
    ORDER BY 
      polls.created_at DESC, options.id ASC
  `;

  db.query(pollsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching polls:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    // Transform the results into a structured format
    const polls = {};
    results.forEach((row) => {
      if (!polls[row.poll_id]) {
        polls[row.poll_id] = {
          id: row.poll_id,
          title: row.title,
          end_time: row.end_time,
          description: row.description,
          type: row.type,
          created_at: row.created_at,
          created_by: row.created_by,
          options: [],
        };
      }

      if (row.option_id) {
        polls[row.poll_id].options.push({
          id: row.option_id,
          content: row.option_content,
          poll_id: row.poll_id,
        });
      }
    });

    // Convert the object to an array
    const pollsArray = Object.values(polls);

    res.status(200).json(pollsArray);
  });
};

const paginatPolls = (req, res) => {
  const { page, limit } = req.query;
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  if (isNaN(parsedPage) || isNaN(parsedLimit)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const offset = (parsedPage - 1) * parsedLimit;

  const pollsQuery = `
    SELECT 
      polls.id AS poll_id, 
      polls.end_time, 
      polls.description, 
      polls.title,
      polls.type, 
      polls.created_at, 
      polls.created_by,
      users.id AS user_id,
      users.username,
      users.img
    FROM 
      polls
    LEFT JOIN
      users ON polls.created_by = users.id
    ORDER BY 
      polls.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(pollsQuery, [parsedLimit, offset], (err, results) => {
    if (err) {
      console.error("Error fetching polls:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    const polls = {};
    results.forEach((row) => {
      if (!polls[row.poll_id]) {
        polls[row.poll_id] = {
          id: row.poll_id,
          title: row.title,
          description: row.description,
          type: row.type,
          end_time: row.end_time,
          created_at: row.created_at,
          created_by: row.created_by,
          created_at_formatted: formatDistanceToNow(row.created_at, {
            addSuffix: true,
          }),
          creator: {
            id: row.user_id,
            username: row.username,
            img: row.img,
          },
        };
      }
    });

    const pollsArray = Object.values(polls);

    res.status(200).json(pollsArray);
  });
};

const getPopularPolls = (req, res) => {
  const pollsQuery = `
    SELECT 
    polls.id AS poll_id, 
    polls.title AS poll_title, 
    users.username AS creator_username, 
    users.img AS creator_img, 
    COUNT(votes.id) AS total_votes
    FROM 
        polls
    JOIN 
        users ON polls.created_by = users.id
    LEFT JOIN 
        votes ON polls.id = votes.poll_id
    WHERE 
        polls.end_time > NOW()
    GROUP BY 
        polls.id, polls.title, users.username, users.img
    ORDER BY 
        total_votes DESC, polls.created_at DESC
    LIMIT 6;
  `;

  const countQuery = `
    SELECT COUNT(*) as active_polls_count 
    FROM polls 
    WHERE polls.end_time > NOW();
  `;

  db.query(countQuery, (err, countResults) => {
    if (err) {
      console.error("Error fetching active polls count:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    db.query(pollsQuery, (err, pollResults) => {
      if (err) {
        console.error("Error fetching popular polls:", err.message);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      res.status(200).json({
        active_polls_count: countResults[0].active_polls_count,
        polls: pollResults,
      });
    });
  });
};

const createPoll = (req, res) => {
  const { title, end_time, description, type, created_by, options } = req.body;

  if (!Array.isArray(options) || options.length < 2) {
    return res
      .status(400)
      .json({ error: "A poll must contains at least 2 options" });
  }

  const uniqueOptions = new Set(options);
  if (uniqueOptions.size !== options.length) {
    return res
      .status(400)
      .json({ error: "Options must not contain duplicates" });
  }

  const pollQuery = `
    INSERT INTO polls (title, end_time, description, type, created_by, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    pollQuery,
    [title, end_time, description, type, created_by],
    (err, pollResult) => {
      if (err) {
        console.error("Error inserting poll:", err.message);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      const pollId = pollResult.insertId;

      const optionsQuery = `
        INSERT INTO options (content, poll_id)
        VALUES ?
      `;

      const optionsValues = Array.from(uniqueOptions).map((option) => [
        option,
        pollId,
      ]);

      db.query(optionsQuery, [optionsValues], (err, optionsResult) => {
        if (err) {
          console.error("Error inserting options:", err.message);
          return res
            .status(500)
            .json({ error: "Database error", details: err.message });
        }

        res.status(201).json({
          message: "Poll and options created successfully",
          pollId,
          optionsCreated: optionsResult.affectedRows,
        });
      });
    }
  );
};

const editPoll = (req, res) => {
  const pollId = req.params.id;
  const { title, end_time, description, type, options } = req.body;

  if (
    !pollId ||
    !end_time ||
    !type ||
    !Array.isArray(options) ||
    options.length === 0
  ) {
    return res.status(400).json({ message: "Invalid input!" });
  }

  const updatePollQuery = `
    UPDATE polls 
    SET title = ?, end_time = ?, description = ?, type = ?
    WHERE id = ?
  `;

  db.query(
    updatePollQuery,
    [title, end_time, description, type, pollId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update poll" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Poll not found" });
      }

      const deleteOldOptionsQuery = `DELETE FROM options WHERE poll_id = ?`;
      const insertNewOptionsQuery = `INSERT INTO options (content, poll_id) VALUES ?`;

      db.query(deleteOldOptionsQuery, [pollId], (deleteErr) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res
            .status(500)
            .json({ message: "Failed to update poll options" });
        }

        // Extract the `content` from each option object for insertion
        const newOptions = options.map((option) => [option.content, pollId]);

        db.query(insertNewOptionsQuery, [newOptions], (insertErr) => {
          if (insertErr) {
            console.error(insertErr);
            return res
              .status(500)
              .json({ message: "Failed to add new options" });
          }

          return res
            .status(200)
            .json({ message: "Poll and options updated successfully" });
        });
      });
    }
  );
};


const deletePoll = (req, res) => {
  const pollId = req.params.id;

  if (!pollId) {
    return res.status(400).json({ message: "Poll ID is required" });
  }

  const deleteOptionsQuery = `DELETE FROM options WHERE poll_id = ?`;
  const deletePollQuery = `DELETE FROM polls WHERE id = ?`;

  db.query(deleteOptionsQuery, [pollId], (deleteOptionsErr) => {
    if (deleteOptionsErr) {
      console.error(deleteOptionsErr);
      return res.status(500).json({ message: "Failed to delete poll options" });
    }

    db.query(deletePollQuery, [pollId], (deletePollErr, result) => {
      if (deletePollErr) {
        console.error(deletePollErr);
        return res.status(500).json({ message: "Failed to delete poll" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Poll not found" });
      }

      return res
        .status(200)
        .json({ message: "Poll and options deleted successfully" });
    });
  });
};

const getPoll = (req, res) => {
  const pollId = parseInt(req.params.id);

  if (!pollId || isNaN(pollId)) {
    return res.status(400).json({ message: "Poll ID is required" });
  }

  const userId = getUserId(req);

  const pollQuery = `
    SELECT 
      polls.id AS poll_id, 
      polls.title, 
      polls.end_time, 
      polls.description, 
      polls.type, 
      options.id AS option_id, 
      options.content AS option_content, 
      IFNULL(COUNT(votes.id), 0) AS votes_count,
      users.id AS creator_id,
      users.username AS creator_username,
      users.img AS creator_img,
      IFNULL((SELECT 1 FROM votes WHERE votes.option_id = options.id AND votes.user_id = ?), 0) AS user_voted
    FROM 
      polls
    LEFT JOIN 
      options ON polls.id = options.poll_id
    LEFT JOIN 
      votes ON options.id = votes.option_id
    LEFT JOIN
      users ON polls.created_by = users.id
    WHERE 
      polls.id = ?
    GROUP BY 
      options.id
  `;

  db.query(pollQuery, [userId, pollId], (err, results) => {
    if (err) {
      console.error("Error fetching poll:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Transform the results into a structured format
    const poll = {
      id: results[0].poll_id,
      title: results[0].title,
      end_time: results[0].end_time,
      end_time_formated: formatDistanceToNow(results[0].end_time, {
        addSuffix: true,
      }),
      description: results[0].description,
      type: results[0].type,
      creator: {
        id: results[0].creator_id,
        username: results[0].creator_username,
        img: results[0].creator_img,
      },
      options: results
        .filter((row) => row.option_id !== null)
        .map((row) => ({
          id: row.option_id,
          content: row.option_content,
          votes_count: results[0].type === "vote" ? undefined : row.votes_count,
          percentage:
            results[0].type === "vote"
              ? undefined
              : (row.votes_count /
                  results.reduce((acc, curr) => acc + curr.votes_count, 0)) *
                100,
          user_voted: row.user_voted === 1,
        })),
    };

    res.status(200).json(poll);
  });
};

const votePoll = (req, res) => {
  const { pollId, optionId } = req.body;
  const userId = getUserId(req);

  if (!pollId || isNaN(pollId) || !optionId || isNaN(optionId)) {
    return res
      .status(400)
      .json({ message: "Poll ID and Option ID are required" });
  }

  // Check if the user is the creator of the poll
  const checkCreatorQuery = `
    SELECT created_by FROM polls WHERE id = ?
  `;

  db.query(checkCreatorQuery, [pollId], (err, results) => {
    if (err) {
      console.error("Error checking poll creator:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (results[0].created_by === userId) {
      return res.status(403).json({ message: "You cannot vote on your own poll" });
    }

    // Check if the user has already voted
    const checkVoteQuery = `
      SELECT id FROM votes WHERE user_id = ? AND poll_id = ?
    `;

    db.query(checkVoteQuery, [userId, pollId], (err, results) => {
      if (err) {
        console.error("Error checking vote:", err.message);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      if (results.length > 0) {
        // User has already voted, update the vote
        const updateVoteQuery = `
          UPDATE votes SET option_id = ? WHERE user_id = ? AND poll_id = ?
        `;

        db.query(updateVoteQuery, [optionId, userId, pollId], (err, results) => {
          if (err) {
            console.error("Error updating vote:", err.message);
            return res
              .status(500)
              .json({ error: "Database error", details: err.message });
          }

          return res.status(200).json({ message: "Vote updated successfully" });
        });
      } else {
        // User has not voted, insert a new vote
        const insertVoteQuery = `
          INSERT INTO votes (user_id, poll_id, option_id) VALUES (?, ?, ?)
        `;

        db.query(insertVoteQuery, [userId, pollId, optionId], (err, results) => {
          if (err) {
            console.error("Error inserting vote:", err.message);
            return res
              .status(500)
              .json({ error: "Database error", details: err.message });
          }

          return res.status(200).json({ message: "Vote cast successfully" });
        });
      }
    });
  });
};

const getVoteStatistiques = (req, res) => {
  const pollId = parseInt(req.params.id);

  // Check if pollId is valid
  if (!pollId || isNaN(pollId)) {
    return res.status(400).json({ message: "Poll ID is required and must be a valid number" });
  }

  // SQL query to fetch vote statistics for each option
  const voteStatistiquesQuery = `
    SELECT 
      options.id AS option_id, 
      options.content AS option_content, 
      COUNT(votes.id) AS votes_count
    FROM 
      options
    LEFT JOIN 
      votes ON options.id = votes.option_id
    WHERE 
      options.poll_id = ?
    GROUP BY 
      options.id
  `;

  // Execute query
  db.query(voteStatistiquesQuery, [pollId], (err, results) => {
    if (err) {
      // Log database error and return response
      console.error("Error fetching vote statistics:", err.message);
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    // Log results for debugging
    console.log("Vote statistics results:", results);

    if (!results || results.length === 0) {
      // If no results, return an empty array
      return res.status(200).json([]);
    }

    // Calculate total votes
    const totalVotes = results.reduce((acc, curr) => acc + curr.votes_count, 0);

    // Format statistics with percentage calculation
    const statistics = results.map((option) => ({
      option_id: option.option_id,
      content: option.option_content,
      votes_count: option.votes_count,
      percentage: totalVotes > 0 ? Math.round((option.votes_count / totalVotes) * 100) : 0,
    }));

    // Return formatted statistics as the response
    res.status(200).json(statistics);
  });
};


module.exports = {
  createPoll,
  editPoll,
  deletePoll,
  getPolls,
  getPoll,
  votePoll,
  getVoteStatistiques,
  paginatPolls,
  getPollsByUserId
}