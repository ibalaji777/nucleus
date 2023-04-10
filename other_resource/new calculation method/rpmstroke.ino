
float value = 0;
float rev = 0;
int rpm;
int oldtime = 0;
int time;
int count = 0;
int stroke = 0;

int inPin = 3;
int inputState = 0;
int RelayPin = 4;

String alert;

boolean isMachineOnOrOff = false;

String output;

volatile boolean isr_flag = false;

void isr() //interrupt service routine
{
  rev++;
  stroke++;
  isr_flag = true;
}

void setup()
{
  Serial.begin(9600);
  attachInterrupt(0, isr, RISING); //attaching the interrupt
}

void loop()
{
  unsigned long start_time = millis();

  // Non-blocking serial input
  while (Serial.available() > 0)
  {
    char c = Serial.read();
    if (c == '\n' || c == '\r')
    {
      if (output == "clear")
      {
        stroke = 0;
        rpm = 0;
      }
      else if (output == "alertOn")
      {
        alert = "on";
        digitalWrite(RelayPin, LOW);
      }
      else if (output == "alertOff")
      {
        alert = "off";
        digitalWrite(RelayPin, HIGH);
      }
      output = "";
    }
    else
    {
      output += c;
    }
  }

  inputState = digitalRead(inPin);
  if (inputState == HIGH)
  {
    isMachineOnOrOff = true;
  }
  else
  {
    isMachineOnOrOff = false;
  }

  if (isr_flag)
  {
    detachInterrupt(0); //detaches the interrupt
    time = millis() - oldtime; //finds the time
    rpm = (rev / time) * 60000; //calculates rpm
    oldtime = millis(); //saves the current time
    rev = 0;
    isr_flag = false;
    attachInterrupt(0, isr, RISING);
    output = "{\"stroke\":\"" + String(stroke) + "\",\"rpm\":\"" + String(rpm) + "\",\"machine\":\"" + String(isMachineOnOrOff) + "\",\"inputState\":\"" + String(inputState) + "\",\"alert\":\"" + alert + "\"}";
    Serial.println(output);
  }

  unsigned long elapsed_time = millis() - start_time;
  if (elapsed_time < 1000)
  {
    delay(1000 - elapsed_time);
  }
}

