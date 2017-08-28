// ==UserScript==
// @name         Diep.io protocol
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Faber
// @match        diep.io
// @require      http://cdn.rawgit.com/xF4b3r/Diep.io-Protocol/master/API/Buffer.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// ==/UserScript==

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
                if (flag === 128) setMovement("Stopped");
                if (flag === 130) setMovement("W");
                if (flag === 132) setMovement("A");
                if (flag === 134) setMovement("W & A");
                if (flag === 136) setMovement("S");
                if (flag === 140) setMovement("A & S");
                if (flag === 144) setMovement("D");
                if (flag === 146) setMovement("D & W");
                if (flag === 152) setMovement("S & D");
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

function setMovement(status) {
    $("#p_movement").text("Movement: " + status);
}

function AddInfoPanel() {
    $("#canvas").after('<div id="wPanel" style="width: 250px;height: 400px;border: 1px solid black;background: rgba(43, 106, 178, 0.77);position: absolute;margin: 15px;"><div id="p_content" style="margin: 15px;font-family: ubuntu;"><p style="margin-bottom: 15px">Diep.io Protocol Extension</p><p id="p_movement">Movement: </p></div></div>');
    $("#wPanel").draggable();
}

window.jQuery(document).ready(function() {
    AddInfoPanel();
});
