<h4>Upgrades</h4>
<table>
<thead>
<tr>
<th>Upgrade Name</th>
<th>Byte ID</th>
</tr>
</thead>
<tbody>
<tr>
<td>Health Regen</td>
<td>2</td>
</tr>
<td>Max Health</td>
<td>0</td>
</tr>
<td>Body Damage</td>
<td>6</td>
</tr>
<td>Bullet Speed</td>
<td>4</td>
</tr>
<td>Bullet Penetration</td>
<td>10</td>
</tr>
<td>Bullet Damage</td>
<td>8</td>
</tr>
<td>Reload</td>
<td>14</td>
</tr>
<td>Movement Speed/td>
<td>12</td>
</tbody></table>
</tbody></table>

# Diep.io Protocol (Updated: 2017, August):
<h2> Serverbound Packets </h2>
<h4> Packet 2: (Nickname)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
<td>1</td>
<td>zero-terminated string, UTF8 encoding</td>
<td>Nickname</td>
</tr>
<td>Packet Length</td>
<td>Uint8</td>
<td>0</td>
</tbody></table>

<h4> Packet 5: Server Response</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
</tbody></table>

<h4> Packet 1: (target position)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
<tr>
<td>1</td>
<td>Uint8</td>
<td>W, A, S, D directions (see below)</td>
</tr>
<tr>
<td>2</td>
<td>Uint8</td>
<td>Byte 16</td>
</tr>
</tbody></table>
<h4> W, A, S, D directions</h4>
<table>
<thead>
<tr>
<th>Movement Key</th>
<th>Byte ID</th>
</tr>
</thead>
<tbody>
<tr>
<td>Stop movement (default)</td>
<td>128</td>
</tr>
<tr>
<td>W</td>
<td>130</td>
</tr>
<tr>
<td>A</td>
<td>132</td>
</tr>
<tr>
<td>S</td>
<td>136</td>
</tr>
<tr>
<td>D</td>
<td>144</td>
</tr>
<tr>
<td>W & A</td>
<td>134</td>
</tr>
<tr>
<td>A & S</td>
<td>140</td>
</tr>
<tr>
<td>S & D</td>
<td>152</td>
</tr>
<tr>
<td>D & W</td>
<td>146</td>
</tr>
</tbody></table>

<h4> Packet 0: (Init packet, sent when connection to server is established)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
<tr>
<td>1</td>
<td>zero-terminated string, UTF8 encoding</td>
<td>Unknown hash</td>
</tr>
<tr>
<td>?</td>
<td>Uint32</td>
<td>0</td>
</tr>
</tbody></table>

```javascript
//The init key is a hash we don't know and it changes every certain time
function initKey(str) {
    var view = new Buffer(1 + str.length + 4);
    var offset = 0;
    view.writeUInt8(0, 0);
    offset += 1;
    for (var i = 0; i < str.length; i++) {
        view.writeUInt8(str.charCodeAt(i), offset);
        offset += 1;
    }
    view.writeUInt32LE(0, offset);
    offset += 4;
    return view;
}
```

<h4> Packet 3: (Upgrade Skills)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Int8</td>
<td>Packet ID</td>
</tr>
<td>1</td>
<td>Int8</td>
<td>Selected Upgrade</td>
<tr>
<td>2</td>
<td>Int8</td>
<td>1</td>
</tbody></table>

// UPGRADES
...

<h4> Packet 4: (Tank Evolutions)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
<td>1</td>
<td>Uint8</td>
<td>Tank Type</td>
<tr>
</tbody></table>

<h4>Tank Evolutions</h4>
<table>
<thead>
<tr>
<th>Tank Name</th>
<th>Byte ID</th>
</tr>
</thead>
<tbody>
<tr>
<td>Twin</td>
<td>38</td>
</tr>
<td>Tank</td>
<td>40</td>
</tr>
<td>Machine Gun</td>
<td>74</td>
</tr>
<td>Flank Guard</td>
<td>84</td>
</tr>
<td>Triple Shot</td>
<td>34</td>
</tr>
<td>Gunner</td>
<td>12</td>
</tr>
<td>Autogunner</td>
<td>106</td>
</tr>
<td>Hunter</td>
<td>2</td>
</tr>
<td>Auto3</td>
<td>118</td>
</tr>
<tr>
<td>Auto5</td>
<td>116</td>
</tr>
<tr>
<td>Auto Smasher</td>
<td>32</td>
</tr>
<tr>
<td>Smasher</td>
<td>12</td>
</tr>
<tr>
<td>Landmine</td>
<td>8</td>
</tr>
<tr>
<td>Spike</td>
<td>34</td>
</tr>
<tr>
<td>Sprayer</td>
<td>126</td>
</tr>
<tr>
<td>Destroyer</td>
<td>80</td>
</tr>
<tr>
<td>Skimmer</td>
<td>40</td>
</tr>
<tr>
<td>Tri-Angle</td>
<td>86</td>
</tr>
<tr>
<td>Booster</td>
<td>106</td>
</tr>
<tr>
<td>XXXXXXXXXXXX</td>
<td>XXXXXXXXXXXX</td>
</tr>
<tr>
<td>XXXXXXXXXXXX</td>
<td>XXXXXXXXXXXX</td>
</tr>
</tbody></table>

<h4> Packet 7: (Extension detected)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>byte 7</td>
</tr>
<tr>
<td>1</td>
<td>Uint8</td>
<td>byte 226 (ban?)</td>
</tr>
 <tr>
<td>2</td>
<td>Uint8</td>
<td>byte 1</td>
</tr>
</tbody></table>


<h2> Clientbound Packets </h2>

<h4> Packet 5: (Connection-Keep-Alive)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
</tbody></table>

<h4> Packet 7: (Once you connect a server)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
</tbody></table>

<h4> Packet 4: (Server Info)</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>Packet ID</td>
</tr>
<tr>
<td>1</td>
<td>zero-terminated string, UTF8 encoding</td>
<td>Server country location or gamemode</td>
</tr>
</tbody></table>

<h4> Packet 2: ? (it can contain lb or spawn info)</h4>
<h6>Update Leaderboard</h6>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>Uint8</td>
<td>packet id</td>
</tr>
<tr>
<td>?</td>
<td>uint32</td>
<td>top 10 score</td>
</tr>
<tr>
<td>?</td>
<td>uint32</td>
<td>server uptime (ms)</td>
</tr>
</tbody></table>

```javascript
function decodeLeaderboard(bytes) {
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
    if (leaderboard.length === 10) return leaderboard;
}
```

<h6>User spawned ?</h6>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>?</td>
<td>uint8</td>
<td>byte 62</td>
</tr>
<tr>
<td>? to 3</td>
<td>null</td>
<td>null_string</td>
</tr>
<tr>
<td>1 + ? + 3</td>
<td>uint8</td>
<td>byte 65</td>
</tr>
<tr>
<td>2 + ? + 3</td>
<td>zero-terminated string, UTF8 encoding</td>
<td>nickname of user joined</td>
</tr>
</tbody></table>

<h4> Packet 0: ? ()</h4>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>uint8</td>
<td>opcode</td>
</tr>
<tr>
<td>1 to 2</td>
<td>uint16</td>
<td>offset1 += 1 everytime packet is received</td>
</tr>
<tr>
<td>byte length</td>
<td>uint8</td>
<td>1</td>
</tr>
</tbody></table>

<h6>User death ?</h6>
<table>
<thead>
<tr>
<th>Byte Offset</th>
<th>Data Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>?</td>
<td>uint8</td>
<td>byte 4</td>
</tr>
<tr>
<td>? + 1</td>
<td>zero-terminated string, UTF8 encoding</td>
<td>Nickname of killer</td>
</tr>
<tr>
<td>1 + ? + nick</td>
<td>uint8</td>
<td>3 bytes with value 1</td>
</tr>
</tbody></table>
