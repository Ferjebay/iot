let txtDistancia    = document.querySelector('.txtDistancia');
let txtTemperatura  = document.querySelector('.txtTemperatura');
let txtHumedad      = document.querySelector('.txtHumedad');
let txtIndice       = document.querySelector('.txtIndice');
let txtLuminocidad  = document.querySelector('.txtLuminocidad');
let foco1           = document.querySelector('#foco1');
let foco2           = document.querySelector('#foco2');
let foco3           = document.querySelector('#foco3');

var connection = new WebSocket('ws://' + location.hostname + '/ws', ['arduino']);

function focoOnOff(){
  let focos = {
    "foco1": foco1.checked,
    "foco2": foco2.checked,
    "foco3": foco3.checked
  }
  connection.send(JSON.stringify(focos));
}

foco1.addEventListener('change', () => {  
  focoOnOff();
})

foco2.addEventListener('change', () => {  
  focoOnOff();
})

foco3.addEventListener('change', () => {  
  focoOnOff();
})

connection.onopen = function () {
   console.log('Connected: ');
   
   // Ejemplo 1, peticion desde cliente
   //(function scheduleRequest() {
   //   connection.send("");
   //   setTimeout(scheduleRequest, 100);
   //})();
};

connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};

connection.onmessage = function (e) {    
  const { distancia, 
          temperatura, 
          humedad, 
          dato_indice, 
          luminocidad,
          estadoFoco1,
          estadoFoco2,
          estadoFoco3 } = JSON.parse(e.data);

  foco1.checked = estadoFoco1;
  foco2.checked = estadoFoco2;
  foco3.checked = estadoFoco3;
  
  txtDistancia.innerHTML    = `${distancia} cm`
  txtLuminocidad.innerHTML  = `${luminocidad}`
  txtTemperatura.innerHTML  = `${temperatura} °C`
  txtHumedad.innerHTML      = `${humedad} %`
  txtIndice.innerHTML       = `${dato_indice.toFixed(2)} °C`
};

connection.onclose = function () {
  console.log('WebSocket connection closed');
};