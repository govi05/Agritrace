const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/farmer',   require('./routes/farmer'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/admin',    require('./routes/admin'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    system: 'AgriTrace v1.0',
    blockchain: 'AgriChain-v2',
    status: 'running',
    npop: 'compliant'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AgriTrace backend running on port ${PORT}`));
