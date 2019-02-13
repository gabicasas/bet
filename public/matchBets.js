alert('gabi remote');
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

var sendMarkets=function(){
    let selToSend=[];
    for(let i in selections){
        selToSend.push({evento:selections[i].evento,mercado:selections[i].mercado});
    }
    $.post('http://localhost:3000/betfair/pushNewMarkets',selToSend)
    .done(function(data){
        debugger;
    })
    .fail(function(data){
        debugger;
    })
};

var marketsForBetfair=function(){
    let selToSend=[];
    for(let i in selections){
        if(selections[i].evento && selections[i].mercado)
            selToSend.push({evento:selections[i].evento,mercado:selections[i].mercado});
    }
    console.log(JSON.stringify(selToSend)); 
    
    let win=window.open("http://localhost:3000/index.html");
    setTimeout(function(){
    win.postMessage(selToSend,"*");},3000);
};