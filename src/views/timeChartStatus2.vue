<template>
 <div class="graphContainer2">

  <div class="graph_container2">
   <canvas ref="myChart" width="400" height="400"></canvas>
  </div>
 </div>
</template>
<script>
// import d from '../core/chart2'
/*eslint-disable*/
var moment = require("moment");
const Chart = require("chart.js/auto").default;
import "chartjs-adapter-moment";
// import "chartjs-plugin-labels"
export default {
 mounted() {
  var $vm = this;
  var myChart;
  const ctx = this.$refs.myChart; // document.getElementById('myChart').getContext('2d');

  var todayStartTime = new moment("2022-10-19 08:00:00 am");
  var todayEndTime = new moment("2022-10-19 03:00:00 pm");
  //today date based on shift
  console.log(todayStartTime);
  console.log(todayEndTime);
  //----date----------------------
  // var time = "15:30:00";
var options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
        animation:{
    
        onComplete: function () {
          console.log(this)
            var chartInstance = this;
            var ctx = chartInstance.ctx;
          
// ctx.fillText("tet adf", 200,90);

// ctx.fillText("tet adf", 200,130);
var bars=[]
this.data.datasets.forEach(function (dataset, i) {
                var meta = myChart.getDatasetMeta(i);
var bar=meta.data[i]
// console.log(i,bar.x,'meta',meta)

// console.log("meta",meta)
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
ctx.moveTo(17, 150);
else
ctx.moveTo(bars[i-1].x, bars[i-1].y);
ctx.lineTo(plot.x, plot.y);
ctx.stroke();

})


//             Chart.each(this.data.datasets.forEach(function (dataset, i) {
//                 var meta = myChart.getDatasetMeta(i);
//                console.log("meta",meta)
//                Chart.each(meta.data.forEach(function (bar, index) {
//                     data = dataset.data[index];
//                     // console.log("bar",bar,index,bar.y)
//                    var countXaxis=0
//                     if(i==0){
// ctx.fillText("tet", 10,10);
// ctx.textAlign = "start";
// // ctx.fillText("datatt", bar._model.x-countXaxis, 60);
// ctx.fillText("tesst", 10,10);
//                     } else {
//                       ctx.fillText("tete", 10,10);
//                         // ctx.fillText(data, bar._model.x-25, bar._model.y+4);
//                        // Show the different textAlign values
// ctx.textAlign = "start";
// // ctx.fillText(data, bar._model.x-countXaxis, 60);
            
//                     }
//                 }),this)
//             }),this);
        }
    },
  scales: {
    x: {
      offset: false,
      type: 'time',
      time: {
        unit: 'hour'
      },
      min: todayStartTime,
      max: todayEndTime
    },
    y: {
      stacked: true,
      offset: true
    }
  }
};
const data = {
  datasets: [{
      label: "T1" + moment(todayStartTime).add(0.5, 'hours'),
      data: [{
        x: moment(todayStartTime).add(0.5, 'hours'),
        y: 0,
            label:'a1',
    count:3 

      }],
      backgroundColor: "red"
    },
    {
      label: "T2" + moment(todayStartTime).add(2, 'hours'),
      data: [{
        x: moment(todayStartTime).add(2, 'hours'),
        y: 0,
            label:'a2',
    count:5 

      }],
      backgroundColor: "blue"
    },
    {
      label: "T3" + moment(todayStartTime).add(3, 'hours'),
      data: [{
        x: moment(todayStartTime).add(3, 'hours'),
        y: 0,
            label:'a3',
    count:8 

      }],
      backgroundColor: "orange"
    },
  ]
};

const config = {
  type: 'bar',
  data,
  options
};

 myChart=new Chart(ctx, config);
 },
};
</script>
<style lang="scss">
.graph_container2 {
 display: block;
 width: 92vw;
 height: 200px !important;
}
.graphContainer2{
    padding:10px;
    // background:lightgrey;
}
</style>
