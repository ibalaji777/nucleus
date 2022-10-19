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
var moment = require('moment');
const Chart = require('chart.js/auto').default;
import 'chartjs-adapter-moment'
export default {

mounted(){
    var $vm=this;
    const ctx =this.$refs.myChart// document.getElementById('myChart').getContext('2d');

var todayStartTime=new moment('2022-10-19 08:00:00 am')
var todayEndTime=new moment('2022-10-19 03:00:00 pm')
 //today date based on shift
console.log(todayStartTime)
console.log(todayEndTime)
//----date----------------------
// var time = "15:30:00";
const data = {
  datasets: [
    {
      label: "Testing"+moment(todayStartTime).add(1,'hours'),
      data: [
        {
        x: moment(todayStartTime).add(0.5,'hours'),
        y: 0
      },
      ],
      backgroundColor: "red"
    },
    {
      label: "Testing"+moment(todayStartTime).add(1,'hours'),
      data: [{
        x: moment(todayStartTime).add(2,'hours'),
        y: 0
      }],
      backgroundColor: "blue"
    },
//     {
//       label: "Testing"+moment(todayStartTime).add(1,'hours'),
//       data: [
//         {
//   x: moment(todayStartTime).add(2,'hours'),
//         y: 0
//       }],
//       backgroundColor: "orange"
//     },  
    
    // {
    //   label: "Testing",
    //   data: [{
    //     x: moment().startOf('day').add(3, 'day'),
    //     y: 0
    //   }],
    //   backgroundColor: "blue"
    // },{
    //   label: "Testing",
    //   data: [{
    //     x: moment().startOf('day').add(4, 'day'),        y: 0
    //   }],
    //   backgroundColor: "red"
    // },
    // {
    //   label: "Testing",
    //   data: [{
    //     x: moment().startOf('day').add(5, 'day'),
    //     y: 0
    //   }],
    //   backgroundColor: "blue"
    // },
  ]
};
//----date----------------------
//----time----------------------
// var time = "15:30:00";
// const data = {
//   datasets: [
//     {
//       label: "Testing",
//       data: [{
//    x: '2021-11-06 23:39:30',
//         y: 0
//       }],
//       backgroundColor: "red"
//     },
//     {
//       label: "Testing"+moment().startOf('day').add(1, 'day'),
//       data: [{
//         x:"15:33:00",
//         y: 0
//       }],
//       backgroundColor: "blue"
//     },
//     {
//       label: "Testing"+moment().startOf('day').add(2, 'day'),
//       data: [{
//         x:"3:1:00",
//         y: 0
//       }],
//       backgroundColor: "red"
//     },
//   ]
// };

const config = {
  type: 'bar',
  data,
  options: {
    responsive:true,
maintainAspectRatio: false, 
    indexAxis: 'y',
    scales: {
      x: {   
        offset: true,   
        stacked: true,
        type: 'time',
        time: {
        //   unit: 'day'
        unit:'hour'
        },
        min:  moment(String(todayStartTime)),
        max: moment(String(todayEndTime))

        // max:  moment().add(8, 'hours')
      },
      y: {
        stacked: true,
        offset: true
      }
    }
  }
};

 new Chart(ctx,config);

}
}
</script>
<style lang="scss">
          .graph_container{
      display:block;
      width:100vw;
      height:200px !important;
    }
</style>