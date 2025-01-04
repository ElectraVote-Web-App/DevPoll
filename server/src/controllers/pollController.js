const db = require("../config/database");
const { formatDistanceToNow } = require("date-fns");

const getPolls = (req, res) => {
  const { page, limit, filter } = req.query;
  if(filter === 'popular_active') {
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

      const uniqueOptions = [...new Set(options)];
      const deleteOldOptionsQuery = `DELETE FROM options WHERE poll_id = ?`;
      const insertNewOptionsQuery = `INSERT INTO options (content, poll_id) VALUES ?`;

      db.query(deleteOldOptionsQuery, [pollId], (deleteErr) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res
            .status(500)
            .json({ message: "Failed to update poll options" });
        }

        const newOptions = uniqueOptions.map((option) => [option, pollId]);
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

module.exports = {
  createPoll,
  getPolls,
  editPoll,
  deletePoll,
  paginatPolls,
}