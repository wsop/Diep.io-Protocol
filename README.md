# Diep.io Protocol (Updated: 2017, June):
<h2> Clientbound Packets </h2>
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
<td>null_utf8</td>
<td>Nickname</td>
</tr>
<td>Packet Length</td>
<td>Uint8</td>
<td>0</td>
</tbody></table>

<h4> Packet 5: (It is sent every 300ms until you connect a server)</h4>
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

<h4> Packet 1: (Mouse move position)</h4>
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
<td>128 (+1 if AutoFire is ON)</td>
</tr>
<tr>
<td>W</td>
<td>130 (+1 if AutoFire is ON)</td>
</tr>
<tr>
<td>A</td>
<td>132 (+1 if AutoFire is ON)</td>
</tr>
<tr>
<td>S</td>
<td>136 (+1 if AutoFire is ON)</td>
</tr>
<tr>
<td>D</td>
<td>144 (+1 if AutoFire is ON)</td>
</tr>
</tbody></table>

<h4> Packet 0: (Init packet, sent if server found)</h4>
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
<td>null_utf8</td>
<td>Unknown hash</td>
</tr>
<tr>
<td>?</td>
<td>Uint32</td>
<td>0</td>
</tr>
</tbody></table>

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
<td>Uint8</td>
<td>Packet ID</td>
</tr>
<td>1</td>
<td>Uint8</td>
<td>Selected Upgrade</td>
<tr>
<td>2</td>
<td>Uint8</td>
<td>1</td>
</tbody></table>

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
<td>6</td>
</tr>
<td>Max Health</td>
<td>4</td>
</tr>
<td>Body Damage</td>
<td>2</td>
</tr>
<td>Bullet Speed</td>
<td>0</td>
</tr>
<td>Bullet Penetration</td>
<td>14</td>
</tr>
<td>Bullet Damage</td>
<td>12</td>
</tr>
<td>Movement Speed</td>
<td>10</td>
</tbody></table>

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
<td>42</td>
</tr>
<td>Flank Guard</td>
<td>52</td>
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
<td>Auto5</td>
<td>116</td>
</tr>
</tbody></table>


<h2> Serverbound Packets </h2>

<h4> Packet 5: (Sent while joining a server)</h4>
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
<td>null_utf8</td>
<td>Server country location or gamemode</td>
</tr>
</tbody></table>

<h4> Packet 0: (Update Nodes) <- need help to decode it xd</h4>
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
<td>?</td>
<td>?</td>
</tr>
</tbody></table>
