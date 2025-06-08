const WebSocket = require('ws');
const { Blockchain } = require('../blockchain');

const wss = new WebSocket.Server({ port: 8080 });
const blockchain = new Blockchain();

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send current blockchain state to new miner
    ws.send(JSON.stringify({
        type: 'INITIAL_STATE',
        data: blockchain.chain
    }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        switch(data.type) {
            case 'NEW_TRANSACTION':
                try {
                    blockchain.addTransaction(data.transaction);
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'NEW_TRANSACTION',
                                transaction: data.transaction
                            }));
                        }
                    });
                } catch (error) {
                    console.error('Error adding transaction:', error);
                }
                break;

            case 'NEW_BLOCK':
                try {
                    const newBlock = data.block;
                    const isValid = blockchain.isChainValid();
                    
                    if (isValid) {
                        blockchain.chain.push(newBlock);
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify({
                                    type: 'NEW_BLOCK',
                                    block: newBlock
                                }));
                            }
                        });
                    } else {
                        console.error('Received invalid blockchain');
                    }
                } catch (error) {
                    console.error('Error processing new block:', error);
                }
                break;
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started on port 8080');
