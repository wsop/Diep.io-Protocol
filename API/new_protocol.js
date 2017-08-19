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
/*
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


var called = false;
window.WebSocket.prototype._send = window.WebSocket.prototype.send;
window.WebSocket.prototype.send = function(data) {
	this.addEventListener("message", function(msg) {
		var buf = new Buffer(msg.data);
		var offset = 0;
		var s_offset = 0;
		var txt = "";
		for (var j = 0; j < buf.byteLength; j++) txt += String.fromCharCode(buf[j]);
    	if (buf[0] === 0) {
			for (var i = 0; i < buf.byteLength; i++) {
				offset += 1;
				if (buf[i] === 51 && buf[i + 1] === 51) {
					offset += 128;
					if (buf.readUInt8(offset) === 65) {
						buf = buf.slice(offset, buf.byteLength).reverse();
						for (var r = 0; r < buf.byteLength; r++) {
							if (buf[r] === 7 && buf[r + 1] === 192 && buf[r + 2] === 0 && buf[r + 3] === 0 && buf[r + 4] === 0 && buf[r + 5] === 0 && buf[r + 6] === 0 && buf[r + 7] === 0) {
								buf = buf.slice(s_offset + 10, buf.byteLength - 1).reverse();
                                console.log(buf.toString() + " spawned");
                                called = true;
                            }
							s_offset += 1;
						}
                    }
                }
			}
        }
	});
	window.WebSocket.prototype._send.apply(this, arguments);
};*/
