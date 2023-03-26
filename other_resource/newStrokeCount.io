float value=0; 
float rev=0; 
int rpm; 
int oldtime=0; 
int time; 
int count=0; 
int stroke=0;
int inPin = 3; 
int inputState = 0;
int RelayPin = 4;
int 


String output;
boolean isMachineOnOrOff=false;
String readFrom;
String alert;
void isr()//interrupt service routine 
{ 
  rev++; 
  stroke++;

} 
void setup() { 
  Serial.begin(9600); 
  attachInterrupt(0,isr,RISING);
  pinMode(inPin, OUTPUT);
  //attaching the interrupt 
  count++; } 
  void loop() { 
      inputState= digitalRead(inPin);  
  if (inputState == HIGH)
  {
isMachineOnOrOff=true;
  } 
  else{
isMachineOnOrOff=false;
  }

    delay(1000); 
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
// Serial.println((String)"{stroke:"+stroke+",rpm:"+rpm+",machine:"+isMachineOnOrOff+",inputState:"+inputState+"}");
output=(String)"{\"stroke\":\""+stroke+"\","+"\"rpm\":\""+rpm+"\","+"\"machine\":\""+isMachineOnOrOff+"\","+"\"inputState\":\""+inputState+"\","+"\"alert\":\""+alert+"\"}";
//-------------------------------------------used string
//"\"stroke\":\""+stroke+"\""
//-------------------------------------------used string
Serial.println(output);
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

if(readFrom=="alertOn"){
    alert="on";
digitalWrite(RelayPin, LOW);
}
if(readFrom=="alertOff"){
        alert="off";
digitalWrite(RelayPin, HIGH);
}


}
////-----------------------------------------------
count++; 
attachInterrupt(0,isr,RISING); 
}