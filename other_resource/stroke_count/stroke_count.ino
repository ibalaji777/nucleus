float value=0; 
float rev=0; 
int rpm; 
int oldtime=0; 
int time; 
int count=0; 
int stroke=0;
int inPin = 7; 
int isMachineOnOrOff=0;
String readFrom;
void isr()//interrupt service routine 
{ 
  rev++; 
  stroke++;

} 
void setup() { 
  Serial.begin(9600); 
  attachInterrupt(0,isr,RISING);
  pinMode(inPin, INPUT);
  //attaching the interrupt 
  count++; } 
  void loop() { delay(1000); 
  isMachineOnOrOff= digitalRead(inPin);  
  detachInterrupt(0);
  //detaches the interrupt 
  time=millis()-oldtime;    
  //finds the time 
  rpm=(rev/time)*60000;        
  //calculates rpm 
  oldtime=millis();             
  //saves the current time 
  rev=0;
 //---------------------commented--------------- 
//Serial.println("rotation per minute"); 
//Serial.println(rpm); 
//Serial.println("stroke");
 //---------------------commented---------------
Serial.println((String)"output={stroke:"+stroke+", rpm:"+rpm+",machine:"+isMachineOnOrOff+"}");
////------------------read-----serial data-----------
if (Serial.available() > 0) {

readFrom = Serial.readString(); // read the incoming byte:
Serial.println((String)"readFrom:"+readFrom);
//Serial.println((String)readFrom=="clear");
if(readFrom=="clear"){
//  Serial.println("cleared");
  stroke=0;
  rpm=0;

}

}
////-----------------------------------------------
count++; 
attachInterrupt(0,isr,RISING); 
}
