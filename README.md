# AgriTrace: IoT-Based Blockchain Framework for Organic Food Traceability

## Overview

AgriTrace is a four-layer framework that combines real-time IoT 
sensing, edge-level data validation, blockchain immutability, and 
smart contract automation to ensure tamper-proof organic food 
certification from farm to consumer.

Key innovation: A strict write-protection boundary enforced at 
the protocol level — no human user can write directly to the 
blockchain. All writes pass exclusively through the SC-04 edge 
gateway contract.

## System Architecture

| Layer | Responsibility |
|-------|---------------|
| Layer 1 — IoT Sensing | Soil, env, GPS, chemical sensors via MQTT/LoRaWAN |
| Layer 2 — Edge Verification | Anomaly filter → threshold check → context enricher → offline buffer |
| Layer 3 — Blockchain (AgriChain-v2) | SC-01 compliance · SC-02 settlement · SC-03 trust score · SC-04 gateway |
| Layer 4 — Application | Farmer portal · Customer scanner · Admin console (all read-only) |


## Tech Stack

| Component | Technology |
|-----------|-----------|
| Smart Contracts | Solidity (SC-01 to SC-04) |
| Blockchain (Dev) | Ethereum — Hardhat local network |
| Blockchain (Prod) | Hyperledger Fabric (permissioned) |
| Backend | Node.js + Express REST API |
| Database | MongoDB (off-chain metadata) |
| Frontend | React.js (role-gated dashboards) |
| IoT Protocol | MQTT over LoRaWAN / Wi-Fi / GSM |
| Edge Logic | Node.js + Python |
| Testing | Hardhat, Postman |


## Key Results

- **80–90%** reduction in invalid blockchain records via edge filtering
- **100%** compliance detection accuracy under normal conditions
- **98%** accuracy for excess chemical usage detection
- Trust score converges to ~97 (compliant farm) vs ~11 (15% violation rate) over 90 days


##  Setup Instructions

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB running locally or Atlas URI
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/AgriTrace.git
cd AgriTrace
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Open .env and fill in your values
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 5. Install Hardhat and deploy contracts
```bash
cd ..
npm install --save-dev hardhat
npx hardhat node          # starts local blockchain in one terminal
npx hardhat run scripts/deploy.js --network localhost
```

### 6. Generate simulation data
```bash
cd simulation
pip install pandas numpy
python generate_sensor_data.py
```

### 7. Start backend
```bash
cd ../backend
npm start
```

### 8. Start frontend
```bash
cd ../frontend
npm start
# Opens at http://localhost:3000
```


## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Farmer (Ravi Kumar) | farmer@agritrace.com | demo123 |
| Customer (Priya Sharma) | customer@agritrace.com | demo123 |
| Admin | admin@agritrace.com | demo123 |


## Project Structure

AgriTrace/
├── contracts/      # Solidity smart contracts SC-01 to SC-04
├── backend/        # Node.js + Express API
├── frontend/       # React.js role-gated dashboards
├── edge/           # Anomaly filter, context enricher, offline buffer
├── simulation/     # Python IoT data generators
├── test/           # Hardhat contract tests
└── docs/           # Report and architecture diagrams


## References

Key references: Kour & Arora (2020), Lin et al. (2022), 
Ellahi et al. (2023).
