const express = require('express');
const router  = express.Router();

// GET /api/customer/trace/:batchId
// Called when customer scans QR code
router.get('/trace/:batchId', async (req, res) => {
  try {
    const { batchId } = req.params;
    res.json({
      batchId,
      product:    'Organic Tomatoes',
      farm:       'Ravi Kumar Farm, Warangal, Telangana',
      trustScore: 89,
      certified:  true,
      timeline: [
        { stage: 'Planting',  date: '2024-09-13', notes: 'Ravi Kumar Farm' },
        { stage: 'Growing',   date: '2024-09-21', notes: '11,842 IoT readings recorded' },
        { stage: 'Audit',     date: '2024-12-18', notes: 'NPOP audit by APEDA' },
        { stage: 'Harvest',   date: '2024-12-22', notes: '450kg collected, trust score 89/100' }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
