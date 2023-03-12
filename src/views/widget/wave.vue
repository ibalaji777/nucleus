<template>
    <div>
        <canvas id="canvasWave"></canvas>

    </div>
</template>

<script>
export default {
   
   mounted(){
var canvas = document.getElementById("canvasWave");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var amplitude = 40;
var frequency = 0.03;
var speed = 3;
var x = 0;

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  for (var i = 0; i <= width; i += 10) {
    var y = Math.sin(x + i * frequency) * amplitude;
    ctx.lineTo(i, height / 2 + y);
  }
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  x += speed * frequency;
}

setInterval(draw, 30);
        

},
   
}
</script>

<style lang="scss">
    #canvasWave {
  width: 100%;
  height: 120px;
  background-color: black;
}

@keyframes wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

</style>