window.Diep = {
    nick: ""
};

function MessageFromClient(buf, offset) {
    var opcode = buf.readUInt8(0);
    switch (opcode) {
        case 2:
            var nick = "";
            for (var i = 0; i < buf.byteLength; i++) {
                nick += String.fromCharCode(buf.readUInt8(i));
            }
            Diep.nick = nick.substr(1, nick.length - 1);
            console.log(Diep.nick + " spawned");
    }
}

function MessageFromServer(buf) {

}

window.WebSocket.prototype._send = window.WebSocket.prototype.send;
window.WebSocket.prototype.send = function(data) {
    try {
        var offset = 0;
        MessageFromClient(new Buffer(data), offset++);
        this.addEventListener("message", function(a) {
            var s_offset = 0;
            MessageFromServer(new Buffer(a.data), offset++);
        });
        window.WebSocket.prototype._send.apply(this, arguments);
    } catch (e) {
        throw e;
    }
};
