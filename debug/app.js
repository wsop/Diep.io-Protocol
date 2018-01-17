$("canvas").after('<div id="pcontent"></div>');
$("#pcontent").draggable();
$('#pcontent').perfectScrollbar({
    wheelSpeed: 0.2
});

function update() {
    var colors = {
        "ID": "#9a9292",
        "0": "#6b3626"
    };
    var packetContent = document.getElementsByClassName("pline");
    for (var i = 0; i < packetContent.length; i++) {
        var content = String(packetContent[i].innerHTML);
        if (content.match(/(^\d+)/i)) content = content.replace(/(^\d+)/i, "<font color=" + colors["ID"] + ">$1</font>");
        if (content.match(/(\s0)/g)) content = content.replace(/(\s0)/g, "<font color=" + colors["0"] + ">$1</font>");
        document.getElementsByClassName("pline")[i].innerHTML = content;
    }

    var elem = document.getElementById('pcontent');
    elem.scrollTop = elem.scrollHeight;
}

var observer = new MutationObserver(update);
var target = document.getElementById("pcontent");
observer.observe(target, {
    childList: true,
    subtree: false,
    attributes: false,
    characterData: false
});

var count = 1;

function appendPacket(packet) {
    var lastPacket = document.getElementsByClassName("pline");
    var rawText = "";
    for (var i = 0; i < packet.length; i++) {
        rawText += packet[i] + " ";
    }
    document.getElementById("pcontent").insertAdjacentHTML("beforeend", '<div class="pall"><span class="pnum">' + count + '</span><span class="pline">' + rawText + '</span></div>');
    count += 1;
}
