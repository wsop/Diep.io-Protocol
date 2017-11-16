// ==UserScript==
// @name         !! Diep.io WebSocket Protocol
// @description  Diep.io WS Protocol
// @version      0.8
// @author       Faber, Gexi
// @match        http://diep.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var Protocol = "http://cdn.rawgit.com/xF4b3r/Diep.io-Protocol/master/extension/protocol.js";

function loadScript(x) {
    x = x.replace("</body>", "<script src='" + Protocol + "'></script></body>");
    return x;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://diep.io/",
    onload : function(e) {
        var doc = loadScript(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});
