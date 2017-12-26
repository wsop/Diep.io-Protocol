var score = 25;
var level = 3;
var timeAlive = "10s";
var type = "Tank";
var nick = "ssda";

var SecondTest = `µ
	D ÚÃ
²ü	ÂÆ
áú®íÎùò³	à¦ ÚÃ		D0êPentagonÔ  ¥»AøßÐ	 \B
«ª*?hÍÌ8BÑB	¡ùÙãé1
ðÝÿÉéò¸
ý`

var score = 135;
var level = 7;
var sec = "35s";


[0, 202, 5, 0, 12, 1, 0, 0, 1, 14, 80, 107, 80, 196, 28, 29, 116, 109, 68, 1, 1, 21, 0, 1, 0, 224, 8, 0, 193, 8, 0, 153, 15, 1, 1, 23, 0, 1, 0, 135, 1, 0, 219, 13, 0, 239, 14, 1, 1, 15, 0, 1, 0]



function intersect(a1, a2) {
    var result = [];
	var count = 0;
    for(const item of a2) {
        if (a1.indexOf(item) > -1 ) {
            result.push (item);
			count += 1;
        }
    }
    return [true, result, count];
}
var called_v = false;
var found = false;
window.WebSocket.prototype._send = window.WebSocket.prototype.send;
window.WebSocket.prototype.send = function() {
	window.webSocket = this;
    this.addEventListener("message", function(msg) {
		var buf = new Buffer(msg.data);
		var id = buf.readUInt8(0);
		if (id === 0 && !called_v) {
            if (intersect(buf, [83, 113, 117, 97, 114, 101])[0] || intersect(buf, [84, 114, 105, 97, 110, 103, 108, 101])[0] || intersect(buf, [80, 101, 110, 116, 97, 103, 111, 110])[0] && !found) {
                var squares_found = intersect(buf, [83, 113, 117, 97, 114, 101]);
                var triangles_found = intersect(buf, [84, 114, 105, 97, 110, 103, 108, 101]);
                var pentagons_found = intersect(buf, [80, 101, 110, 116, 97, 103, 111, 110]);
                console.log("Shapes found: " + squares_found[2] + triangles_found[2] + pentagons_found[2] + 1)
				console.log("Squares found: " + squares_found[2] + 1);
				found = true;
            }
        }
	});
    window.WebSocket.prototype._send.apply(this, arguments);
};
