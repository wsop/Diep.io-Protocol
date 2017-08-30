if (!("Decoder" in window)) {
    this.Decoder = class {
        constructor(buffer) {
            this.buffer = buffer;
            this.str = "";
        }
        null_str() {
            this.str = "";
            this.buffer = this.buffer.slice(1, this.buffer.length);
            for (var i = 0; i < this.buffer.length; i++) {
                while (true) {
                    var char = this.buffer.readUInt8(i);
                    if (char === 0) break;
                    this.str += String.fromCharCode(char & 255);
                    i += 1;
                }
            }
            return this.str;

        }
    };
}
