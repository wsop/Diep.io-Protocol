# Diep.io Protocol:

## Clientbound communication

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

----------

**Packet 2: Spawn**

| Offset | Data Type | Description |
| ------------- | ------------- | ------------- |
| 0 | Uint8 | Packet ID |
| 1 | NTS | Nickname |

----------

**Packet 3: Upgrade Skills**

| Byte Offset  | Data Type | Description |
| ------------- | ------------- | ------------- |
| 0  | Uint8  | Packet ID  |
| 1  | Uint8  | Selected Upgrade  |
| 2  | Uint8  | ?  |


| Upgrade Name  | Byte ID |
| ------------- | ------------- |
| Reload  | 0  |
| Movement Speed  | 2  |
| Bullet Penetration  | 4  |
| Bullet Damage  | 6  |
| Body Damage  | 8  |
| Bullet Speed  | 10  |
| Health Regen  | 12  |
| Max Health  | 14  |

## Serverbound communication
