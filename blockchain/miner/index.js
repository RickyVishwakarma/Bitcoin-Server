const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const { Blockchain, Transaction } = require('../blockchain');
const config = require('../config');
const BLOCK_GENERATION_INTERVAL = config.BLOCK_GENERATION_INTERVAL;

// Generate miner's wallet
const minerKey = ec.genKeyPair();
const minerAddress = minerKey.getPublic('hex');

// Create a new blockchain instance
const blockchain = new Blockchain();

// Start mining
setInterval(() => {
    // Create a new block
    const newBlock = blockchain.minePendingTransactions(minerAddress);
    if (newBlock) {
        console.log(`Mined block #${newBlock.height} with hash: ${newBlock.hash}`);
    }
}, BLOCK_GENERATION_INTERVAL);

console.log(`Independent miner started with address: ${minerAddress}`);
console.log('Mining blocks independently without network connection...');
