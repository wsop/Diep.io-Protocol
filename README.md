# Diep.io Protocol:

## Clientbound communication

**Packet 2: Spawn**

| Offset | Data Type | Description |
| ------------- | ------------- | ------------- |
| 0 | Uint8 | Packet ID |
| 1 | NTS | Nickname |

----------

**Packet 0: Init packet: Contains the current diep.io version and the party code**

| Offset | Data Type | Description |
| ------------- | ------------- | ------------- |
| 0 | Uint8 | Packet ID |
| 1 | NTS | Latest version's hash |
| 1 + Hash length + 2 | NTS | Party Code (if exists) |

```javascript
function initKey(hash, partyCode) {
    var buf = new Buffer(1 + hash.length + (partyCode ? partyCode.length : 0) + 4);
    var offset = 0;
    buf.writeUInt8(0, 0);
    offset += 1;
    for (var i = 0; i < hash.length; i++) {
        buf.writeUInt8(hash.charCodeAt(i), offset);
        offset += 1;
    }
    offset += 2;
    if (partyCode) {
        for (var i = 0; i < partyCode.length; i++) {
            buf.writeUInt8(partyCode.charCodeAt(i), offset);
            offset += 1;
        }
    }
    return buf;
}
```

## Serverbound communication
