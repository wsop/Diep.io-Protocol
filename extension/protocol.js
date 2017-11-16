
var _WebSocket = window.WebSocket;

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

// Killed by Pentagon:

decodeURI("%00%EF%BF%BD%01%00%10%01%00%00%01%0Ef%EF%BF%BDQ%EF%BF%BD%1C%EF%BF%BD,%0E@%01%01%0B%00%01%00%EF%BF%BD%06%00%EF%BF%BD%0F%00%EF%BF%BD%03%01%01%0D%00%01%00%0B%00%EF%BF%BD%0B%00%EF%BF%BD%06%01%01%03%00%01%00%EF%BF%BD%05%00%EF%BF%BD%0D%00%EF%BF%BD%0D%01%01%05%00%01%00k%00%EF%BF%BD%0D%00%EF%BF%BD%0A%01%01%08%00%01%00%EF%BF%BD%07%00%EF%BF%BD%0B%00%EF%BF%BD%0A%01%01%0A%00%01%00%EF%BF%BD%02%00%EF%BF%BD%01%00%EF%BF%BD%08%01%01%0F%00%01%00%EF%BF%BD%02%00%0A%00o%20%00%00%00%00%0F%EF%BF%BD%EF%BF%BDbB%05%03%0A%EF%BF%BD%EF%BF%BD*?%01%01%10%00%01%03j%17Lf%3EB%1B9U%EF%BF%BDB%01%01%0E%00%01%04%EF%BF%BD,%0E@%09f%EF%BF%BDQ%EF%BF%BD&%06%0B%EF%BF%BD%03%04Pentagon%00%01%01%02%00%01%00%EF%BF%BD%01%00%EF%BF%BD%07%00%EF%BF%BD%09%01%01%06%00%01%00%EF%BF%BD%04%00%EF%BF%BD%01%00%01%20S%60%09B%13%01%01%01%11%00%01%00G%00%EF%BF%BD%10%00%EF%BF%BD%0C%01%01%12%00%01%00%EF%BF%BD%02%00%EF%BF%BD%01%00%EF%BF%BD%10%01%01%04%00%01%00,%00%EF%BF%BD%0A%00%EF%BF%BD%0C%01%01%0C%00%01%00%0F%00%EF%BF%BD%0B%00%EF%BF%BD%0C%01");

// Killed by Pentagon:
decodeURI("%00%EF%BF%BD%01%00%10%01%00%00%01%0Ef%EF%BF%BDQ%EF%BF%BD%1C%EF%BF%BD,%0E@%01%01%0B%00%01%00%EF%BF%BD%06%00%EF%BF%BD%0F%00%EF%BF%BD%03%01%01%0D%00%01%00%0B%00%EF%BF%BD%0B%00%EF%BF%BD%06%01%01%03%00%01%00%EF%BF%BD%05%00%EF%BF%BD%0D%00%EF%BF%BD%0D%01%01%05%00%01%00k%00%EF%BF%BD%0D%00%EF%BF%BD%0A%01%01%08%00%01%00%EF%BF%BD%07%00%EF%BF%BD%0B%00%EF%BF%BD%0A%01%01%0A%00%01%00%EF%BF%BD%02%00%EF%BF%BD%01%00%EF%BF%BD%08%01%01%0F%00%01%00%EF%BF%BD%02%00%0A%00o%20%00%00%00%00%0F%EF%BF%BD%EF%BF%BDbB%05%03%0A%EF%BF%BD%EF%BF%BD*?%01%01%10%00%01%03j%17Lf%3EB%1B9U%EF%BF%BDB%01%01%0E%00%01%04%EF%BF%BD,%0E@%09f%EF%BF%BDQ%EF%BF%BD&%06%0B%EF%BF%BD%03%04Pentagon%00%01%01%02%00%01%00%EF%BF%BD%01%00%EF%BF%BD%07%00%EF%BF%BD%09%01%01%06%00%01%00%EF%BF%BD%04%00%EF%BF%BD%01%00%01%20S%60%09B%13%01%01%01%11%00%01%00G%00%EF%BF%BD%10%00%EF%BF%BD%0C%01%01%12%00%01%00%EF%BF%BD%02%00%EF%BF%BD%01%00%EF%BF%BD%10%01%01%04%00%01%00,%00%EF%BF%BD%0A%00%EF%BF%BD%0C%01%01%0C%00%01%00%0F%00%EF%BF%BD%0B%00%EF%BF%BD%0C%01");
