AsyncWebSocket ws("/ws");

void serializar(){
  StaticJsonDocument<200> doc;
  doc["distancia"] = String(distancia);  
  doc["temperatura"] = temperatura;  
  doc["humedad"] = humedad;  
  doc["dato_indice"] = dato_indice;  
  doc["luminocidad"] = valorLDR; 
  doc["estadoFoco1"] = estadoFoco1;
  doc["estadoFoco2"] = estadoFoco2;
  doc["estadoFoco3"] = estadoFoco3;
  serializeJson(doc, output);  
}

void encenderApagarFocos(String focos){
  StaticJsonDocument<96> doc;

  DeserializationError error = deserializeJson(doc, focos);
  
  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }
  
  bool foco1 = doc["foco1"]; 
  bool foco2 = doc["foco2"]; 
  bool foco3 = doc["foco3"]; 

  estadoFoco1 = foco1;
  estadoFoco2 = foco2;
  estadoFoco3 = foco3;

  digitalWrite(pinFoco1, foco1);
  digitalWrite(pinFoco2, foco2);
  digitalWrite(pinFoco3, foco3);
  serializar();
  ws.textAll(output);   
  output="";
  newMessage = false;
}

//El siguiente metodo nos sirve para recibir la peticiones que realiza el cliente por medio de websockets
void ProcessRequest(AsyncWebSocketClient *client, String request){ 
  newMessage = true;
  if(newMessage) encenderApagarFocos(request);  
}
