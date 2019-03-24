alert('gabi remote');
debugger;
let winMsg=window.open("http://localhost:3000/index.html");

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
}).mousedown(function (e) {
    /**
     * 
     */
    
    /*
    *
    */
    pressTimer = window.setTimeout(function () {
        debugger;
        console.log(e);
        let market=e.currentTarget.getAttribute("data-marketid")+"_betfairES";
        let event = e.currentTarget.getAttribute('data-eventid')+"_betfairES";
        let apuesta= e.currentTarget.getAttribute('data-selectionid')+"_betfairES";
        let fee = e.currentTarget.firstElementChild.innerHTML;
        
        let marketData={ids:[market],runners:[{'ids':[apuesta]}]};
        alert('Funciona presionaod largo');
        winMsg.postMessage({ type: "equalRunner", data: marketData }, "*");
    }, 1000);
    return false;
});
//SIN USO
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
    let dataToSend={type:"newMarkets",data:selToSend};
   
    setTimeout(function(){
    winMsg.postMessage(dataToSend,"*");},3000);
};