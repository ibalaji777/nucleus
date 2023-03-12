<template>
 <div>
  <div class="graph_container">
   <canvas ref="myChart" width="400" height="400"></canvas>
  </div>
 </div>
</template>
<script>
/*eslint-disable*/
var moment = require("moment");
const Chart = require("chart.js/auto").default;
import "chartjs-adapter-moment";
export default {
 mounted() {
  var $vm = this;
  const ctx = this.$refs.myChart; // document.getElementById('myChart').getContext('2d');

  var todayStartTime = new moment("2022-10-19 08:00:00 am");
  var todayEndTime = new moment("2022-10-19 03:00:00 pm");
  //today date based on shift
  console.log(todayStartTime);
  console.log(todayEndTime);
  //----date----------------------
  var data = {
   datasets: [
    {


     data: [
      {
       x:[
      moment(todayStartTime).add(0, "hours"),
      moment(todayStartTime).add(0.5, "hours")],
       y: 0,
    label:'a1',
    count:3 
   },
      {
       x:[
      moment(todayStartTime).add(1, "hours"),
      moment(todayStartTime).add(2, "hours")],
       y: 0,
         label:'a2',
             count:5 

      },
      {
       x:[
      moment(todayStartTime).add(2, "hours"),
      moment(todayStartTime).add(6, "hours")],
       y: 0,
         label:'a3',
             count:8 

      },
      
     ],
          label: ["T0","T1","T2"],
     backgroundColor: ["red","blue","yellow"]
    },

   ],
  };

  const config = {
   type: "bar",
   data,
   
   options: {
    animation:{
    
onComplete: function () {
var chartInstance = this;
var ctx = chartInstance.ctx;
         
var bars=[]
this.data.datasets.forEach(function (dataset, i) {
var meta = myChart.getDatasetMeta(i);
var bar=meta.data[i]
meta.data.forEach(function (bar, index) {
var data = dataset.data[index];
console.log("data",data)
  // ctx.textAlign = "left";
// ----------------------label--------------------------------
ctx.font = "15px Open Sans";
ctx.fillStyle = "black";
ctx.textAlign = "right";

ctx.fillText(data.label, bar.x-20,bar.y+30);
// ctx.restore()
// ----------------------counter--------------------------------
var countX=bar.x+2;
var countY=bar.y-30;
// var countY=(parseFloat(data.count)/parseFloat(bar.height))+120;
console.log("countY",countY)
ctx.font = "15px Open Sans";
ctx.fillStyle = "black";
ctx.textAlign = "left";
 /// color for background
    ctx.fillStyle = 'black';
       /// get width of text
    var width = ctx.measureText(data.count).width;
 /// draw background rect assuming height of font
    ctx.fillRect(countX-1,countY, width+10, 20);
       /// text color
    ctx.fillStyle = '#ffff';
bars.push({x:countX,y:countY})
ctx.fillText(data.count,countX,countY+10);
console.log("nes",index,bar,i)
})

})


// --------------------------bar line--------------------
bars.forEach(function (plot, i) {
ctx.beginPath();
if(i==0)
ctx.moveTo(74, 146);
else
ctx.moveTo(bars[i-1].x, bars[i-1].y);
ctx.lineTo(plot.x, plot.y);
ctx.stroke();

})


        }
    },
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
     x: {
      offset: true,
      stacked: true,
      type: "time",
      time: {
       unit: "hour",
      },
      min: moment(String(todayStartTime)),
      max: moment(String(todayEndTime)),

     },
     y: {
      stacked: true,
      offset: true,
     },
    },
   },
  };

var myChart=  new Chart(ctx, config);
 },
};
</script>
<style lang="scss">
.graph_container {
 display: block;
 width: 100vw;
 height: 200px !important;
}
</style>
