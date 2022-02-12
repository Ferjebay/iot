#include <ArduinoJson.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include "DHT.h" 

#include "config.h"
#include "WebSockets.hpp"
#include "Server.hpp"
#include "ESP32_Utils.hpp"
#include "ESP32_Utils_AWS.hpp"

void setup() {  
  dht.begin();
                
  Serial.begin (115200);       // inicializa el puerto seria a 9600 baudios
  
  SPIFFS.begin();

  ConnectWiFi_STA();

  InitServer();
  InitWebSockets();
  pinMode(Pecho, INPUT);     // define el pin 6 como entrada (echo)
  pinMode(Ptrig, OUTPUT);    // define el pin 7 como salida  (triger)  
  
  //Pines de los focos
  pinMode(pinFoco1, OUTPUT);
  pinMode(pinFoco2, OUTPUT);
  pinMode(pinFoco3, OUTPUT);
}
  
void loop(){  
  digitalWrite(Ptrig, LOW);
  delayMicroseconds(2);
  digitalWrite(Ptrig, HIGH);   // genera el pulso de triger por 10ms
  delayMicroseconds(10);
  digitalWrite(Ptrig, LOW);
  
  duracion = pulseIn(Pecho, HIGH);
  distancia = (duracion/2) / 29;            // calcula la distancia en centimetros

  temperatura = dht.readTemperature(); 
  humedad = dht.readHumidity();      
  dato_indice = dht.computeHeatIndex(temperatura, humedad, false); 

  valorLDR = (analogRead(analogPin) > 1000) ? "Dia" : "Noche";   
 
  if(!newMessage){
    serializar();
    ws.textAll(output);   
    output="";
  }
  
  delay(800);
}
