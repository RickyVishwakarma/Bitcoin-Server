# Simple Blockchain Implementation

A simplified implementation of a Bitcoin-like blockchain system with a central server, miner nodes, and a frontend wallet interface.

## Tech Stack

- Node.js
- WebSocket for real-time communication
- Elliptic curve cryptography for secure transactions
- SHA256 for block hashing

## Components

1. **Central Server**
   - Manages WebSocket connections with miners
   - Broadcasts new blocks and transactions
   - Maintains global blockchain state

2. **Miner Server**
   - Connects to central server via WebSocket
   - Mines new blocks using proof of work
   - Validates transactions and blocks
   - Maintains local blockchain copy

3. **Frontend Wallet**
   - Creates and manages user wallets
   - Sends signed transactions
   - Displays balance and transaction history

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Start the central server:
```bash
npm run start:server
```

3. Start a miner node:
```bash
npm run start:miner
```

4. Start the frontend (in a new terminal):
```bash
cd frontend
npm install
npm start
```

## Features

- Secure transactions using elliptic curve cryptography
- Proof of work mining
- Blockchain validation
- Automatic blockchain synchronization
- Frontend wallet interface
- Real-time transaction broadcasting

## Security Features

- Digital signatures for transaction validation
- Proof of work to prevent spam
- Blockchain validation to prevent invalid blocks
- Secure key generation using secp256k1
