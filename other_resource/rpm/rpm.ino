float value=0;
float rev=0;
int rpm;
int oldtime=0;
int time;
int count=0;
void isr() //interrupt service routine
{
rev++;
}
void setup()
{
  Serial.begin(9600);
attachInterrupt(0,isr,RISING);  //attaching the interrupt
count++;
}
void loop()
{
delay(1000);
detachInterrupt(0);           //detaches the interrupt
time=millis()-oldtime;        //finds the time 
rpm=(rev/time)*60000;         //calculates rpm
oldtime=millis();             //saves the current time
rev=0;

Serial.println("rotation per minute");
Serial.println(rpm);
count++;
attachInterrupt(0,isr,RISING);
}
