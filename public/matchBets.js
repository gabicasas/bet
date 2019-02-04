alert('gabi ggg');
debugger;

let selectionNodes = $('[data-selectionid]');
let selections = [];
for (var i = 0; i < selectionNodes.length; i++) {
    selections.push({
        evento: selectionNodes[i].getAttribute('data-eventid'),
        apuesta: selectionNodes[i].getAttribute('data-selectionid'),
        mercado: selectionNodes[i].getAttribute('data-marketid'),
        cuota_html: selectionNodes[i].innerHTML
    });







}

console.log(selections);
var pressTimer;

selectionNodes.mouseup(function () {
    clearTimeout(pressTimer);
    // Clear timeout
    return false;
}).mousedown(function () {
    // Set timeout
    pressTimer = window.setTimeout(function () {
        alert('Funciona presionaod largo');
        window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
    }, 1000);
    return false;
});

// long click en javascript https://stackoverflow.com/questions/2625210/long-press-in-javascript