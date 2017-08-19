window.Diep = {
    debug: {
        keys: true
    },
    calls: {
        nick: false
    },
    nick: ""
};

function MessageFromClient(buf, offset) {
    var opcode = buf.readUInt8(offset);
    switch (opcode) {
        case 0:
            var hash = "";
            for (var i = 0; i < buf.byteLength; i++) {
                while (true) {
                    var char = buf.readUInt8(i);
                    if (char === 0) break;
                    hash += String.fromCharCode(char);
                    i += 1;
                }
            }
            console.log("Received packet 0 with hash: " + hash);
            break;
        case 1:
            if (Diep.calls.nick) { // temporary
                offset += 1;
                var flag = buf.readUInt8(offset);
                if (flag === 128) console.log("Stopped");
                if (flag === 130) console.log("W");
                if (flag === 132) console.log("A");
                if (flag === 134) console.log("W & A");
                if (flag === 136) console.log("S");
                if (flag === 140) console.log("A & S");
                if (flag === 144) console.log("D");
                if (flag === 146) console.log("D & W");
                if (flag === 152) console.log("S & D");
            }
            break;
        case 2:
            var nick = "";
            for (i = 0; i < buf.byteLength; i++) {
                nick += String.fromCharCode(buf.readUInt8(i) & 0xFF);
            }
            Diep.nick = nick.substr(1, nick.length - 2);
            Diep.calls.nick = true;
            console.log(Diep.nick + " spawned");
            break;
        case 7:
            if (buf.readUInt8(1) === 226 && 1 === buf.readUInt8(2)) {
                console.log("Received packet 7. Extension detected");
            }
            break;
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
            MessageFromServer(new Buffer(a.data), s_offset++);
        });
        window.WebSocket.prototype._send.apply(this, arguments);
    } catch (e) {
        throw e;
    }
};
