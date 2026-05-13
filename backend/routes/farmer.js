const express = require('express');
const router  = express.Router();

// GET /api/farmer/:farmId/dashboard
router.get('/:farmId/dashboard', async (req, res) => {
  try {
    const { farmId } = req.params;
    // Returns sensor data and trust score for one farm only
    res.json({
      farmId,
      trustScore:     87,
      totalReadings:  14000,
      activeSensors:  12,
      compliance:     94.2,
      recentReadings: []   // populate from MongoDB
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/farmer/:farmId/trustscore
router.get('/:farmId/trustscore', (req, res) => {
  res.json({ farmId: req.params.farmId, score: 87, status: 'EXCELLENT' });
});

module.exports = router;
