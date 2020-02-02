
var wsUri = "ws://127.0.0.1:8088";
var output;
var desk;
var boopons = [];
var websocket;

function initialize() {
    console.log('Initializing');
    output = document.getElementById("output");
    desk = document.getElementById("desk"); 
    
    for (var p = 0; p < 2; p++)
    {
        for (var i = 0; i < 8; i++)
        {
            boopons[p*8+i] = document.getElementById(`desk-p${p+1}-${i}`); 
        }
    }
}

function connect() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) { onOpen(evt) };
    websocket.onclose = function (evt) { onClose(evt) };
    websocket.onmessage = function (evt) { onMessage(evt) };
    websocket.onerror = function (evt) { onError(evt) };
}

function disconnect() {
    websocket.close();
}

function boop(player, slot){
    if (websocket)
    {
        var message = ['boop', player, slot];
        websocket.send(JSON.stringify(message));
        display("SENT: " + message);
    }
    else
    {
        display('<span style="color: red;">Can\'t boop! Connect first!</span>');
    }
}


function onOpen(evt) {
    display("CONNECTED");
}

function onClose(evt) {
    display("DISCONNECTED");
}

function onMessage(evt) {
    display('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
    
    var data = JSON.parse(evt.data);
    console.log(data);
    
    if (data[0] === 'connection')
    {
        desk.style.display = "block";
        for (var i = 0; i < 16; i++)
        {
            boopons[i].innerHTML = data[1][i];
        }
    }

    if (data[0] === 'update')
    {
        for (var i = 0; i < 16; i++)
        {
            boopons[i].innerHTML = data[1][i];
        }
    }
}

function onError(evt) {
    display('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function display(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}