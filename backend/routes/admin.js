const express = require('express');
const router  = express.Router();

// GET /api/admin/analytics
router.get('/analytics', (req, res) => {
  res.json({
    totalFarmers:      40,
    totalTransactions: 188432,
    avgTrustScore:     82.4,
    certifiedBatches:  342,
    // No write endpoints exposed — read-only
  });
});

// GET /api/admin/farmers
router.get('/farmers', (req, res) => {
  res.json({ farmers: [] }); // populate from MongoDB
});

module.exports = router;
