AsyncWebServer server(80);

void crudUsers(uint8_t *usuario, size_t len){
   //Abrimos el archivo que contiene los usuarios
   File f = SPIFFS.open("/db/usuarios.json", "w"); 
    for(size_t i = 0; i < len; i++){    
      f.write(usuario[i]);                         
    }
    f.close();
}

void InitServer(){ 
    server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html"); //cargamos la pag de inicio

    server.on("/user", 
      HTTP_DELETE, 
      [](AsyncWebServerRequest *request){},
      NULL,
      [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total){
        crudUsers(data, len);
        request->send(200, "application/json", "ok");
    });

    server.on("/user", HTTP_GET, [](AsyncWebServerRequest *request) {
        //Abrimos el archivo que contiene los usuarios
        File f = SPIFFS.open("/db/usuarios.json", "r"); 
        String users;
        while(f.available()) {
          //Se lee line por linea y lo cancatenamos en la variable users
          users += f.readString();        
        }      
        //Se retorna el objeto json al cliente
        request->send(200, "application/json", users);
        f.close();
    });
        
    server.on("/user", 
      HTTP_POST, 
      [](AsyncWebServerRequest *request){},
      NULL,
      [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total){
        crudUsers(data, len);
        request->send(200, "application/json", "ok");
    });

    server.on("/user", 
      HTTP_PUT, 
      [](AsyncWebServerRequest *request){},
      NULL,
      [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total){
        crudUsers(data, len);
        request->send(200, "application/json", "ok");
     });

    server.onNotFound([](AsyncWebServerRequest *request) { //Este metodo se acciona cuando no encuentra una pagina
      request->send(400, "text/plain", "Not found");
    });

    server.begin();
    Serial.println("HTTP server started");
}
