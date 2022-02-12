const char* ssid = "HEY-FERJEBAY_2.4G";
const char* password = "byron1820";
const char* hostname = "ESP32_1";

IPAddress ip(192, 168, 1, 200);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

float temperatura, humedad, dato_indice;

const int analogPin = 33;
String valorLDR;

bool newMessage = false;
String output;

byte pinFoco1 = 15, pinFoco2 = 4, pinFoco3 = 5;
bool estadoFoco1, estadoFoco2, estadoFoco3 = false;

#define Pecho 18
#define Ptrig 19
long duracion, distancia;   
DHT dht(27, DHT11);
