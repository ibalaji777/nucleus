<template>
 <div class="graphContainer2">

  <div class="graph_container2">
   <canvas ref="myChart" width="400" height="400"></canvas>
  </div>
 </div>
</template>
<script>
/*eslint-disable*/
import * as utils from '../core/utils.js'
var moment = require("moment");
const Chart = require("chart.js/auto").default;
import "chartjs-adapter-moment";
export default {
  // watch:{
  //   "$store.state.setup.machineActivities":{
      
  //   }
  // },

 mounted() {
  var $vm = this;
  var myChart;
  const ctx = this.$refs.myChart; // document.getElementById('myChart').getContext('2d');

  var todayStartTime =utils.chartTimeStatus($vm).todayStartTime //new moment("2022-10-19 08:00:00 am");
  var todayEndTime =utils.chartTimeStatus($vm).todayEndTime //new moment("2022-10-19 03:00:00 pm");
var options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
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
// ----------------------label--------------------------------
ctx.font = "15px Open Sans";
ctx.fillStyle = "black";
ctx.textAlign = "right";

ctx.fillText(data.label, bar.x-20,bar.y+30);
// ----------------------counter--------------------------------
var countX=bar.x+2;
var countY=bar.y-30;

ctx.font = "15px Open Sans";
ctx.fillStyle = "black";
ctx.textAlign = "left";
    ctx.fillStyle = 'black';
    var width = ctx.measureText(data.count).width;
    ctx.fillRect(countX-1,countY, width+10, 20);
    ctx.fillStyle = '#ffff';
bars.push({x:countX,y:countY})
ctx.fillText(data.count,countX,countY+10);
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

setInterval(function(){
//   myChart.data.datasets.forEach((dataset) => {
//     dataset.data = [amazon, google, facebook, twitter];
//     dataset.label = label;
// });
myChart.data.datasets=[];
_.map(utils.chartTimeStatus($vm).datasets,(data)=>{
    myChart.data.datasets.push(data)
    myChart.update();
    })
    // myChart.data.datasets=utils.chartTimeStatus($vm).datasets;
console.log(utils.chartTimeStatus($vm).datasets)
    // myChart.update();
},8000)
 
 },
};
</script>
<style lang="scss">
.graph_container2 {
 display: block;
 width: 100%;
 height: 200px !important;
}
.graphContainer2{
    padding:10px;
    // background:lightgrey;
    border: 1px solid black;
}
</style>
