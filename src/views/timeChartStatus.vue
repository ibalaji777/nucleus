<template>
 <div>
  <div class="graph_container">
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
  const ctx = this.$refs.myChart; // document.getElementById('myChart').getContext('2d');

  var todayStartTime = new moment("2022-10-19 08:00:00 am");
  var todayEndTime = new moment("2022-10-19 03:00:00 pm");
  //today date based on shift
  console.log(todayStartTime);
  console.log(todayEndTime);
  //----date----------------------
  // var time = "15:30:00";
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
    // {
    //  label: "T",

    //  data: [
    //   {
    //    x: [
    //   moment(todayStartTime).add(1, "hours"),
    //   moment(todayStartTime).add(2.5, "hours"),
    //    ],
    //    y: 0,
    //   },
    //  ],
    //  backgroundColor: "blue",
    // },
    // {
    //  label: "T",
    //  data: [
    //   {
    //    x: [
    //   moment(todayStartTime).add(2.5, "hours"),
    //   moment(todayStartTime).add(9, "hours"),
    //    ],
    //    y: 0,
    //   },
    //  ],
    //  backgroundColor: "red",
    //  borderColor: "red",
    // },
   ],
  };

  const config = {
   type: "bar",
   data,
   
   options: {
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
ctx.moveTo(74, 146);
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

      // max:  moment().add(8, 'hours')
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
