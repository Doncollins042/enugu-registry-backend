const express = require('express');
const pool = require('../config/database');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM properties WHERE user_id = $1 ORDER BY purchase_date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, estate_id, plot_id, plot_number, estate_name, size, price, title_number, blockchain_tx_id } = req.body;
    const result = await pool.query(
      'INSERT INTO properties (user_id, estate_id, plot_id, plot_number, estate_name, size, price, title_number, blockchain_tx_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [user_id, estate_id, plot_id, plot_number, estate_name, size, price, title_number, blockchain_tx_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;