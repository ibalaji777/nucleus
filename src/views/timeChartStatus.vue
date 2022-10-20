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
      moment(todayStartTime).add(1, "hours")],
       y: 0,
      },
      {
       x:[
      moment(todayStartTime).add(1, "hours"),
      moment(todayStartTime).add(2, "hours")],
       y: 0,
      },
      {
       x:[
      moment(todayStartTime).add(2, "hours"),
      moment(todayStartTime).add(6, "hours")],
       y: 0,
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
    
//         onComplete: function () {
//             // var chartInstance = this.chart;
//             // var ctx = chartInstance.ctx;
//             ctx.textAlign = "left";
//             ctx.font = "9px Open Sans";
//             ctx.fillStyle = "#fff";

//             Chart.each(this.data.datasets.forEach(function (dataset, i) {
//                 var meta = myChart.getDatasetMeta(i);
//                console.log("meta",meta)
//                Chart.each(meta.data.forEach(function (bar, index) {
//                     data = dataset.data[index];
//                     // console.log("bar",bar,index,bar.y)
//                    var countXaxis=0
//                     if(i==0){
// ctx.fillText(data, 50, bar._model.y+4);
// ctx.textAlign = "start";
// ctx.fillText(data, bar._model.x-countXaxis, 60);
//                     } else {
//                         ctx.fillText(data, bar._model.x-25, bar._model.y+4);
//                        // Show the different textAlign values
// ctx.textAlign = "start";
// ctx.fillText(data, bar._model.x-countXaxis, 60);
            
//                     }
//                 }),this)
//             }),this);
//         }
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
