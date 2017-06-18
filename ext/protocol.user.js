// ==UserScript==
// @name         ![Diep.io Protocol Extension]
// @require      https://raw.githubusercontent.com/xF4b3r/Diep.io-Protocol/master/ext/Buffer.js
// @version      0.3
// @description  Diep.io WS Protocol Ext
// @author       Faber
// @match        http://diep.io/
// ==/UserScript==

const global = window;
global.Logger = false;
global.debugKeys = true;
global.shoot = false;
global.receivedP5 = false;
global.skills = {
    BULLET_SPEED: 0,
    BULLET_PENETRATION: 0,
    BULLET_DAMAGE: 0,
    BODY_DAMAGE: 0,
    MAX_HEALTH: 0,
    HEALTH_REGEN: 0,
    MOVEMENT_SPEED: 0
};

_WebSocket = window.WebSocket;

function refer(master, slave, prop) {
    Object.defineProperty(master, prop, {
        get: function(){
            return slave[prop];
        },
        set: function(val) {
            slave[prop] = val;
        },
        enumerable: true,
        configurable: true
    });
}

window.WebSocket = function(url, protocols) {
    protocols = undefined === protocols ? [] : 0;
    var ws = new _WebSocket(url, protocols);
    refer(this, ws, 'binaryType');
    refer(this, ws, 'bufferedAmount');
    refer(this, ws, 'extensions');
    refer(this, ws, 'protocol');
    refer(this, ws, 'readyState');
    refer(this, ws, 'url');

    this.send = function(data) {
        try {
            var buf = new Buffer(data);
            if (buf.readUInt8(0) === 2) {
                console.log("Spawn success!!");
                var offset = 1;
                var nick = "";
                offset += 1;
                for (var i = 0; i < buf.byteLength; i++) {
                    nick += String.fromCharCode(buf.readUInt8(offset));
                }
                console.log("Nick: " + nick);
            }
            if (buf.readUInt8(0) === 1) {
                if (debugKeys) {
                    switch(buf.readUInt8(1)) {
                        case 128:
                            console.log("Stopped");
                            break;
                        case 129: break;
                        case 130:
                            console.log("W");
                            break;
                        case 131: break;
                        case 132:
                            console.log("A");
                            break;
                        case 133: break;
                        case 136:
                            console.log("S");
                            break;
                        case 137: break;
                        case 144:
                            console.log("D");
                            break;
                        case 145: break;
                    }
                }
                if (buf.readUInt8(1) === 129 || buf.readUInt8(1) === 131 || buf.readUInt8(1) === 133 || buf.readUInt8(1) === 137 || buf.readUInt8(1) === 145) {
                    shoot = true;
                    console.log("Shot");
                }
            }
            if (buf.readUInt8(0) === 3) {
                var offsetx = 0;
                offsetx += 1;
                switch(buf.readUInt8(offsetx)) {
                    case 0:
                        console.log("Upgraded Bullet Speed!");
                        skills.BULLET_SPEED += 1;
                        break;
                    case 2:
                        console.log("Upgraded Body Damage!");
                        skills.BODY_DAMAGE += 1;
                        break;
                    case 4:
                        console.log("Upgraded Max Health!");
                        skills.MAX_HEALTH += 1;
                        break;
                    case 6:
                        console.log("Upgraded Health Regen!");
                        skills.HEALTH_REGEN += 1;
                        break;
                    case 10:
                        console.log("Upgraded Movement Speed!");
                        skills.MOVEMENT_SPEED += 1;
                        break;
                    case 12:
                        console.log("Upgraded Bullet Damage!");
                        skills.BULLET_DAMAGE += 1;
                        break;
                    case 14:
                        console.log("Upgraded Bullet Penetration!");
                        skills.BULLET_PENETRATION += 1;
                }
            }
            if (buf.readUInt8(0) === 4) {
                switch(buf.readUInt8(1)) {
                    case 2:
                        console.log("Tank evolved to Hunter!");
                        break;
                    case 12:
                        console.log("Tank evolved to Gunner!");
                        break;
                    case 34:
                        console.log("Tank evolved to Triple Shot!");
                        break;
                    case 38:
                        console.log("Tank evolved to Twin!");
                        break;
                    case 40:
                        console.log("Tank evolved to Tank!");
                        break;
                    case 42:
                        console.log("Tank evolved to Machine Gun!");
                        break;
                    case 52:
                        console.log("Tank evolved to Flank Guard!");
                        break;
                    case 106:
                        console.log("Tank evolved to Autogunner!");
                        break;
                    case 116:
                        console.log("Tank evolved to Auto5!");
                        break;
                    case 118:
                        console.log("Tank evolved to Auto3!");
                        break;
                }
            }
        } catch(e) {
            console.log(e);
        }
        return ws.send.call(ws, data);
    };

    this.close = function() {
        return ws.close.call(ws);
    };

    this.onopen = function(event) {};
    this.onclose = function(event) {};
    this.onerror = function(event) {};
    this.onmessage = function(event) {};

    ws.onopen = function(event) {
        if (this.onopen)
            return this.onopen.call(ws, event);
    }.bind(this);

    ws.onmessage = function(event) {
        var buf = new Buffer(event.data);
        switch(buf.readUInt8(0)) {
            case 5:
                while(!receivedP5) {
                    console.log("Connecting to server...");
                    receivedP5 = true;
                }
                break;
            case 7:
                console.log("Connected to server!");
                break;
            case 4:
                var gm = "";
                for (var i = 0; i < buf.byteLength; i++) {
                    gm += String.fromCharCode(buf.readUInt8(i));
                }
                var gmm = gm.match(/\w+:(\w+):|\w+-(\w+)\s/i);
                try {
                    console.log("Gamemode: " + gmm[1]);
                } catch(e) {
                    console.log("Gamemode: FFA");
                }
                break;
            case 0:
                // Need help decoding this packet
                /*var xdec = "";
                for (var d = 0; d < buf.byteLength; d++) {
                    xdec += String.fromCharCode(buf.readUInt8(d));
                }
                console.log(xdec);*/
        }
        if (this.onmessage)
            return this.onmessage.call(ws, event);
    }.bind(this);

    ws.onclose = function(event) {
        if (this.onclose)
            return this.onclose.call(ws, event);
    }.bind(this);

    ws.onerror = function(event) {
        if (this.onerror)
            return this.onerror.call(ws, event);
    }.bind(this);
};

window.WebSocket.prototype = _WebSocket;
