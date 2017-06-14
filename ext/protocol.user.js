// ==UserScript==
// @name         ![Diep.io Protocol Extension]
// @require      https://raw.githubusercontent.com/xF4b3r/Diep.io-Protocol/master/ext/Buffer.js
// @version      0.1
// @description  try to take over the world!
// @author       Faber
// @match        http://diep.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.WebSocket.prototype._send = window.WebSocket.prototype.send;
    window.WebSocket.prototype.send = function(data) {
        var global = window;
        global.Logger = false;
        global.debugKeys = true;
        global.shoot = false;
        global.skills = {
            BULLET_SPEED: 0,
            BULLET_PENETRATION: 0,
            BULLET_DAMAGE: 0,
            BODY_DAMAGE: 0,
            MAX_HEALTH: 0,
            HEALTH_REGEN: 0,
            MOVEMENT_SPEED: 0
        };
        if (Logger) console.log(new Uint8Array(data));
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
                } else {
                    if (shoot) {
                        shoot = false;
                    }
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
        } catch(e) {
            console.log(e);
        }
        window.WebSocket.prototype._send.apply(this, arguments);
    };
})();
