<template>
    <div>
        <div id="chart-container"></div>
    </div>
</template>
<script>
/*eslint-disable*/
import moment from 'moment'
const echarts =require('echarts')
export default {
    
    mounted(){
var todayStartTime=new moment('2022-10-19 08:00:00 am')
var todayEndTime=new moment('2022-10-19 03:00:00 pm')

        var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});

// var data =  [
//       ['2018-04-10T20:40:33Z', 1, 5],
//       ['2018-04-10T20:40:53Z', 2, 3],
//       ['2018-04-10T20:41:03Z', 4, 2],
//       ['2018-04-10T20:44:03Z', 5, 1],
//       ['2018-04-10T20:45:03Z', 6, 0]
// ];

// var option = {
//   legend: {},
//   tooltip: {
//     trigger: 'axis',
//   },
//   dataset: {
//     source:data,
//     dimensions: ['timestamp', 'sensor1', 'sensor2'],
//   },
//   xAxis: { type: 'time' },
//   yAxis: { },
//   series: [
//   {
//      name: 'sensor1',
//      type: 'line',
//      encode: {
//        x: 'timestamp',
//        y: 'sensor1' // refer sensor 1 value 
//      }
//   },{
//      name: 'sensor2',
//      type: 'bar',
//      stack:'total',
//      encode: {
//        x: 'timestamp',
//        y: 'sensor2'
//   },
  
// },
//     //  {
//     //   name: 'Search Engine',
//     //   type: 'bar',
//     //   stack: 'total',
//     //   label: {
//     //     show: true
//     //   },
//     //   emphasis: {
//     //     focus: 'series'
//     //   },
//     //   data: [moment().add(1,'hours'), moment().add(2,'hours')]
//     // },
    
//         {
//       name: 'Direct',
//       type: 'bar',
//       stack: 'total',
//       label: {
//         show: true
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [moment().add(1,'hours'), moment().add(2,'hours')]
//         }
//     ]
// };
// myChart.setOption(option);


var option;

option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
//  xAxis : [
//         {
//             type: 'time',
//             // min:todayStartTime,
//             // max:todayEndTime,
//             boundaryGap:false,
//             axisLabel: {
//                 formatter: (function(value){
//                     return moment(value).format('HH:mm');
//                 })
//             }
//         }
//     ],
  yAxis: {
    type: 'category',
    data: ['Mon','di','d','kk']
  },
  series: [
    // {
    //   name: 'Direct',
    //   type: 'bar',
    //   stack: 'total',
    //   label: {
    //     show: true
    //   },
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [320, 302, 301, 334, 390, 330, 320]
    // },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    // {
    //   name: 'Search Engine 2',
    //   type: 'bar',
    //   stack: 'total',
    //   label: {
    //     show: true
    //   },
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [moment().add(1,'hours'), moment().add(2,'hours')]
    // },   
    //  {
    //   name: 'Search Engine',
    //   type: 'bar',
    //   stack: 'total',
    //   label: {
    //     show: true
    //   },
    //   emphasis: {
    //     focus: 'series'
    //   },
    //   data: [moment().add(1,'hours'), moment().add(2,'hours')]
    // }
  ]
};


if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
    }
}
</script>
<style lang="scss">
    #chart-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
</style>