var data = require("./datamanager");
var WebSocket = require("ws");

var module_id;
var desk_id;

exports.runDesk = function(moduleID, deskID) {

    module_id = moduleID;
    desk_id = deskID;

    const wss = new WebSocket.Server({ port: 8088 })
    
    wss.on('connection', onConnection);
    
    wss.on('error', message => {
        console.log(`Error occured => ${message}`)
    })
}

function onConnection(socket) {
    socket.on('message', onMessage);
    socket.send(getDeskState());
}

function onMessage(message) {
    
    console.log(`Received message => ${message}`)
    
    var data = JSON.parse(message);
    
    if (data[0]=='use-argument')
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

function getDeskState() {
    var deskState = data.getDeskState(module_id, desk_id);
    var stateMessage = JSON.stringify(['desk-update', deskState]);
    return stateMessage;
}

function updateDesk(slotID, argumentID, notes) {
    data.useArgument(module_id, desk_id, argumentID, slotID, notes);
}