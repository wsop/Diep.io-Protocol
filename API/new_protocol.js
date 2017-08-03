window.Diep = {
    nick: ""
};

function MessageFromClient(buf, offset) {
    var opcode = buf.readUInt8(0);
    switch (opcode) {
        case 2:
            console.log("Spawn");
    }
}

function MessageFromServer(buf) {

}

window.WebSocket.prototype._send = window.WebSocket.prototype.send;
window.WebSocket.prototype.send = function(data) {
    var offset = 0;
    MessageFromClient(new Buffer(data), offset++);
    this.addEventListener("message", function(a) {
        var s_offset = 0;
        MessageFromServer(new Buffer(a.data), offset++);
    });
    window.WebSocket.prototype._send.apply(this, arguments);
};
