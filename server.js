var WebSocket = require("ws");
var Desk = require("desk");
var port = 5000;

const wss = new WebSocket.Server({ port: port });
wss.on('connection', socket => { socket.on('message', onMessage); });
wss.on('error', message => { console.log(`Error occured => ${message}`); });

function onMessage(message) {
    console.log(`Received message => ${message}`)
    
    var data = JSON.parse(message);
    
    if (data["request"] === 'connect')
    {

    }

    if (data["request"]=='use-argument')
    {
        updateDesk(data[1], data[2], data[3]);
        broadcastState(wss);
    }
}

function broadcastState(wss) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(getDeskState());
        }
    });
}