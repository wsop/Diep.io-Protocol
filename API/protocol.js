window.DiepAPI = {};
DiepAPI.Spawned = false;
DiepAPI.Nickname_Called = false;
DiepAPI.ConnectedToServer = false;
DiepAPI.ReceivedPacket5 = false;
DiepAPI.LogClientPackets = false;
DiepAPI.LogServerPackets = false;
DiepAPI.Shoot = false;

DiepAPI.LogKeys = true;

DiepAPI.Nickname = "";
DiepAPI.Leaderboard = "";

DiepAPI.Skills = {
    Bullet_Speed: 0,
    Body_Damage: 0,
    Max_Health: 0,
    Health_Regen: 0,
    Movement_Speed: 0,
    Bullet_Damage: 0,
    Bullet_Penetration: 0
};

DiepAPI.init = function() {
    DiepAPI.ws();
};

DiepAPI.setStatus = function(bool) {
    if (!DiepAPI.Nickname_Called) {
        DiepAPI.Spawned = false;
    } else {
        DiepAPI.Spawned = bool;
    }
};

DiepAPI.ws = function() {
    _WebSocket = window.WebSocket;
    function refer(master, slave, prop) {
        Object.defineProperty(master, prop, {
            get: function() {
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
        if (protocols === undefined) {
            protocols = [];
        }
        var ws = new _WebSocket(url, protocols);
        refer(this, ws, 'binaryType');
        refer(this, ws, 'bufferedAmount');
        refer(this, ws, 'extensions');
        refer(this, ws, 'protocol');
        refer(this, ws, 'readyState');
        refer(this, ws, 'url');

        this.send = function(data) {
            DiepAPI.beforeSend(data);
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
            DiepAPI.processMessage(new Buffer(event.data));
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
};

DiepAPI.beforeSend = function(data) {
    if (window.Buffer) {
        try {
            if (DiepAPI.LogClientPackets) console.log(new Uint8Array(data));
            var buf = new Buffer(data);
            if (buf.readUInt8(0) === 2) {
                let offset;
                let nick = "";
                for (offset = 1; offset < buf.byteLength - 1; offset++) {
                    nick += String.fromCharCode(buf.readUInt8(offset));
                }
                DiepAPI.Nickname_Called = true;
                DiepAPI.Nickname = nick;
                DiepAPI.Spawned = true;
            }
            if (buf.readUInt8(0) === 1) {
                let offset = 0;
                switch (buf.byteLength) {
                    case 6:
                        offset += 4;
                        if (buf.readUInt8(offset) === 134) {
                            DiepAPI.setStatus(true);
                        } else if (buf.readUInt8(offset) === 136) {
                            DiepAPI.setStatus(false);
                        }
                        break;
                    case 7:
                        offset += 5;
                        if (buf.readUInt8(offset) === 134) {
                            DiepAPI.setStatus(true);
                        } else if (buf.readUInt8(offset) === 136) {
                            DiepAPI.setStatus(false);
                        }
                        break;
                    case 8:
                        offset += 5;
                        if (buf.readUInt8(offset) === 134) {
                            DiepAPI.setStatus(false);
                        } else if (buf.readUInt8(offset) === 136) {
                            DiepAPI.setStatus(true);
                        }
                        break;
                    case 9:
                        offset += 7;
                        if (buf.readUInt8(offset) === 134) {
                            DiepAPI.setStatus(false);
                        } else if (buf.readUInt8(offset) === 136) {
                            DiepAPI.setStatus(true);
                        } else if (buf.readUInt8(offset--) === 132) {
                            DiepAPI.setStatus(true);
                        }
                        break;
                    case 10:
                        offset += 6;
                        if (buf.readUInt8(offset) === 138) {
                            DiepAPI.setStatus(false);
                        } else if (buf.readUInt8(offset) === 136) {
                            DiepAPI.setStatus(true);
                        } else if (buf.readUInt8(offset++) === 136) {
                            DiepAPI.setStatus(true);
                        }
                        break;
                    case 11:
                        offset += 7;
                        if (buf.readUInt8(offset) === 134) {
                            DiepAPI.setStatus(false);
                        } else if (buf.readUInt8(offset) === 136) {
                            DiepAPI.setStatus(true);
                        }
                        break;
                }
                if (DiepAPI.LogKeys) {
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
                        case 134:
                            console.log("W & A");
                            break;
                        case 135: break;
                        case 136:
                            console.log("S");
                            break;
                        case 137: break;
                        case 140:
                            console.log("A & S");
                            break;
                        case 141: break;
                        case 144:
                            console.log("D");
                            break;
                        case 145: break;
                        case 146:
                            console.log("D & W");
                            break;
                        case 147: break;
                        case 152:
                            console.log("S & D");
                            break;
                        case 153: break;
                    }
                    if (buf.readUInt8(1) === 129 || buf.readUInt8(1) === 131 || buf.readUInt8(1) === 133 || buf.readUInt8(1) === 137 || buf.readUInt8(1) === 145) {
                        DiepAPI.Shoot = true;
                        do {
                            console.log("Shot");
                            DiepAPI.Shoot = false;
                        } while (DiepAPI.Shoot);
                    }
                }
            }
            if (buf.readUInt8(0) === 3) {
                var offsetx = 0;
                offsetx += 1;
                switch(buf.readUInt8(offsetx)) {
                    case 0:
                        console.log("Upgraded Bullet Speed!");
                        DiepAPI.Skills.Bullet_Speed += 1;
                        break;
                    case 2:
                        console.log("Upgraded Body Damage!");
                        DiepAPI.Skills.Body_Damage += 1;
                        break;
                    case 4:
                        console.log("Upgraded Max Health!");
                        DiepAPI.Skills.Max_Health += 1;
                        break;
                    case 6:
                        console.log("Upgraded Health Regen!");
                        DiepAPI.Skills.Health_Regen += 1;
                        break;
                    case 10:
                        console.log("Upgraded Movement Speed!");
                        DiepAPI.Skills.Movement_Speed += 1;
                        break;
                    case 12:
                        console.log("Upgraded Bullet Damage!");
                        DiepAPI.Skills.Bullet_Damage += 1;
                        break;
                    case 14:
                        console.log("Upgraded Bullet Penetration!");
                        DiepAPI.Skills.Bullet_Penetration += 1;
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
            alert(e);
        }
    }
};

DiepAPI.processMessage = function(buf) {
    var a = new TextDecoder("utf-8");
    if (window.logv2) console.log(a.decode(buf));
    let opcode = buf.readUInt8(0);
    switch (opcode) {
        case 5:
            while(!DiepAPI.ReceivedPacket5) {
                console.log("Connecting to server...");
                DiepAPI.ReceivedPacket5 = true;
            }
            break;
        case 7:
            DiepAPI.ConnectedToServer = true;
            console.log("Connected to server!");
            break;
        case 2:
            const decodeLeaderboard = function(bytes) {
                const leaderboard = [];
                const maxLength = bytes[29];
                let length = 0;
                let offset = 0;
                if (bytes[offset] == 2) {
                    bytes = bytes.slice(29);
                    do {
                        let name = "";
                        let char = null;
                        while (true) {
                            char = bytes[offset];
                            offset += 1;
                            if (char === 0) break;
                            name += String.fromCharCode(char);
                        }
                        leaderboard.push(name);
                        length += 1;
                    } while (length < maxLength);
                }
                if (leaderboard.length === 10) {
                    console.log("Got leaderboard!");
                    DiepAPI.Leaderboard = leaderboard;
                    return leaderboard;
                }
            };
            decodeLeaderboard(new Uint8Array(event.data));
            break;
        case 4:
            var gm = "";
            for (var i = 1; i < buf.byteLength - 1; i++) {
                gm += String.fromCharCode(buf.readUInt8(i));
            }
            switch (gm) {
                case "vultr-paris":
                    DiepAPI.ServerRegion = "Paris";
            }
    }
};

DiepAPI.on = function(argument, callback) {
    if (typeof argument !== "string" || "function" !== typeof callback) return;
    if (typeof callback === "function") {
        switch(argument) {
            case "spawn":
                // ss
        }
    }
};

DiepAPI.init();
