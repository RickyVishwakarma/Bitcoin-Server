const EC = require('elliptic').ec;
const axios = require('axios');

// Create wallet
const ec = new EC('secp256k1');
const keyPair = ec.genKeyPair();
const walletAddress = keyPair.getPublic().encode('hex');

document.getElementById('wallet-address').textContent = walletAddress;

// WebSocket connection to miner
const ws = new WebSocket('ws://localhost:8081');

// Update balance periodically
function updateBalance() {
    axios.get(`http://localhost:8081/balance/${walletAddress}`)
        .then(response => {
            document.getElementById('wallet-balance').textContent = response.data.balance;
        })
        .catch(error => console.error('Error fetching balance:', error));
}

// Initial balance update
updateBalance();
setInterval(updateBalance, 5000); // Update every 5 seconds

// Handle transaction form submission
document.getElementById('transaction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const toAddress = document.getElementById('to-address').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Create transaction
    const transaction = {
        fromAddress: walletAddress,
        toAddress: toAddress,
        amount: amount,
        timestamp: Date.now()
    };

    // Sign transaction
    const hashTx = crypto.createHash('sha256')
        .update(transaction.fromAddress + transaction.toAddress + transaction.amount + transaction.timestamp)
        .digest('hex');
    
    transaction.signature = ec.sign(hashTx, keyPair).toDER('hex');

    // Send transaction to miner
    try {
        await axios.post('http://localhost:8081/transaction', transaction);
        alert('Transaction sent successfully!');
        e.target.reset();
    } catch (error) {
        console.error('Error sending transaction:', error);
        alert('Error sending transaction');
    }
});
