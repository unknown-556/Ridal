
const WebSocket = require('ws');

let clients = [];

const initWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.push(ws);

        ws.on('message', (message) => {
            console.log(`Received message => ${message}`);
        });

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
        });
    });

    return wss;
};

const broadcast = (message) => {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

module.exports = { initWebSocket, broadcast };
