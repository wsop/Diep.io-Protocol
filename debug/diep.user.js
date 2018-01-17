// ==UserScript==
// @name         Diep.io Packet Parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Faber
// @match        http://diep.io/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.8.1/js/perfect-scrollbar.jquery.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

$(function() {
    "use strict";
    $("body").append('<script type="text/javascript" src="http://localhost/PacketParser/app.js"></script>');
    $("body").append('<link rel="stylesheet" type="text/css" href="http://localhost/PacketParser/style.css">');
    $("body").append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.8.1/css/perfect-scrollbar.min.css">');

    WebSocket.prototype._send = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        this._send(data);
        var buffer = new Buffer(data);
        if (buffer.byteLength >= 45) {
            appendPacket(buffer);
        }
    };
});
