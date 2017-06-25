// ==UserScript==
// @name         !! Diep.io API
// @require      https://rawgit.com/xF4b3r/Diep.io-Protocol/master/ext/Buffer.js
// @version      0.6
// @description  Diep.io WS Protocol
// @author       Faber, Gexi
// @match        http://diep.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const API = "<script src='https://rawgit.com/xF4b3r/Diep.io-Protocol/master/API/protocol.js'></script>";

function loadScript(x) {
    x = x.replace("</body>", API + "</body>");
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
