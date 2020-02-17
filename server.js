var WebSocket = require("ws");
var Desk = require("./desk");
var port = 5000;

var users = {};

const wss = new WebSocket.Server({ port: port });
wss.on('error', message => { console.log(`Error occured => ${message}`); });
wss.on('connection', socket => { 
    
    function onMessage(message) {
        console.log(`Received message => ${message}`)
        
        var data = JSON.parse(message);
        
        if (data["request"] === 'connect')
        {
            users[data["character_id"]] = data["desk_id"];
        }
    
        if (data["request"] === 'disconnect')
        {
            delete users[data["character_id"]];
        }
    
        if (data["request"]=='use-argument')
        {
            var desk = data["desk_id"];
            var character = data["character_id"];
            var argument = data["argument_id"];
            var slot = data["slot_id"];
    
            Desk.update(desk, character, slot, argument)
                .then(response => response.json())
                .then(body => {
                    respond(socket, 'ok');
                    broadcastState();
                })
                .catch(error => respond(socket, 'error'));
        }
    
        if (data["request"]=='remove-argument')
        {
            var desk = data["desk_id"];
            var character = data["character_id"];
            var slot = data["slot_id"];

            Desk.update(desk, character, slot, null)
                .then(response => response.json())
                .then(body => {
                    respond(socket, 'ok');
                    broadcastState();
                })
                .catch(error => respond(socket, 'error'));
        }
    }

    socket.on('message', onMessage);
});

function respond(socket, request, status) {
    socket.send(JSON.stringify({request: request, state: status}));
}

function broadcastState(desk_id) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            
            var players = [], index = 0;
            for (var key in users)
                players[index++] = key;

            var state = {
                connected_players: players,
                arguments: Desk.getState(desk_id)
            };

            client.send(JSON.stringify(state));
        }
    });
}