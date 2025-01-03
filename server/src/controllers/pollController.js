const db = require("../config/database");

const getPolls = (req, res) => {
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
      options.content AS option_content
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
      return res.status(500).json({ error: "Database error", details: err.message });
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
        });
      }
    });

    // Convert the object to an array
    const pollsArray = Object.values(polls);

    res.status(200).json(pollsArray);
  });
};

const createPoll = (req, res) => {
  const { title, end_time, description, type, created_by, options } = req.body;

  // Ensure `options` is an array
  if (!title || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: "Title and at least 2 options are required" });
  }

  // Check for duplicate options
  const uniqueOptions = new Set(options);
  if (uniqueOptions.size !== options.length) {
    return res.status(400).json({ error: "Options must not contain duplicates" });
  }

  // Insert poll into the database
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
        return res.status(500).json({ error: "Database error", details: err.message });
      }

      const pollId = pollResult.insertId;

      // Prepare options query
      const optionsQuery = `
        INSERT INTO options (content, poll_id)
        VALUES ?
      `;

      const optionsValues = Array.from(uniqueOptions).map((option) => [option, pollId]);

      db.query(optionsQuery, [optionsValues], (err, optionsResult) => {
        if (err) {
          console.error("Error inserting options:", err.message);
          return res.status(500).json({ error: "Database error", details: err.message });
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

  if (!pollId || !title || !end_time || !type || !Array.isArray(options) || options.length === 0) {
    return res.status(400).json({ message: "Invalid input!" });
  }

  // Update poll details
  const updatePollQuery = `
    UPDATE polls 
    SET title = ?, end_time = ?, description = ?, type = ?
    WHERE id = ?
  `;

  db.query(updatePollQuery, [title, end_time, description, type, pollId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update poll" });
    }

    // Check if poll exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Handle poll options
    const uniqueOptions = [...new Set(options)];
    const deleteOldOptionsQuery = `DELETE FROM options WHERE poll_id = ?`;
    const insertNewOptionsQuery = `INSERT INTO options (content, poll_id) VALUES ?`;

    db.query(deleteOldOptionsQuery, [pollId], (deleteErr) => {
      if (deleteErr) {
        console.error(deleteErr);
        return res.status(500).json({ message: "Failed to update poll options" });
      }

      const newOptions = uniqueOptions.map((option) => [option, pollId]);
      db.query(insertNewOptionsQuery, [newOptions], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: "Failed to add new options" });
        }

        return res.status(200).json({ message: "Poll and options updated successfully" });
      });
    });
  });
};


const deletePoll = (req, res) => {
  const pollId = req.params.id;

  if (!pollId) {
      return res.status(400).json({ message: "Poll ID is required" });
  }

  // Delete poll options first
  const deleteOptionsQuery = `DELETE FROM options WHERE poll_id = ?`;
  const deletePollQuery = `DELETE FROM polls WHERE id = ?`;

  db.query(deleteOptionsQuery, [pollId], (deleteOptionsErr) => {
      if (deleteOptionsErr) {
          console.error(deleteOptionsErr);
          return res.status(500).json({ message: "Failed to delete poll options" });
      }

      // Delete the poll after options are removed
      db.query(deletePollQuery, [pollId], (deletePollErr, result) => {
          if (deletePollErr) {
              console.error(deletePollErr);
              return res.status(500).json({ message: "Failed to delete poll" });
          }

          if (result.affectedRows === 0) {
              return res.status(404).json({ message: "Poll not found" });
          }

          return res.status(200).json({ message: "Poll and options deleted successfully" });
      });
  });
};



module.exports = {
  createPoll,
  editPoll,
  deletePoll,
  getPolls
};