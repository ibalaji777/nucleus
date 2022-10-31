<template>
    <div>
        
   <div ref="myChart" width="400" height="400"></div>

    </div>
</template>
<script>
/*eslint-disable*/
// import ApexCharts from 'apexcharts'
const ApexCharts=require('apexcharts')
export default {

mounted(){

      
        // var options = {
        //   series: [{
        //   name: 'Metric1',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric2',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric3',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric4',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric5',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric6',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric7',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric8',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // },
        // {
        //   name: 'Metric8',
        //   data: generateData(20, {
        //     min: 0,
        //     max: 90
        //   })
        // }
        // ],
        //   chart: {
        //   height: 350,
        //   type: 'heatmap',
        // },
        // stroke: {
        //   width: 0
        // },
        // plotOptions: {
        //   heatmap: {
        //     radius: 30,
        //     enableShades: false,
        //     colorScale: {
        //       ranges: [{
        //           from: 0,
        //           to: 50,
        //           color: '#008FFB'
        //         },
        //         {
        //           from: 51,
        //           to: 100,
        //           color: '#00E396'
        //         },
        //       ],
        //     },
        
        //   }
        // },
        // dataLabels: {
        //   enabled: true,
        //   style: {
        //     colors: ['#fff']
        //   }
        // },
        // xaxis: {
        //   type: 'category',
        // },
        // title: {
        //   text: 'Rounded (Range without Shades)'
        // },
        // };

var $vm=this;
  const myChart = this.$refs.myChart; // document.getElementById('myChart').getContext('2d');
function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

let options = {
   plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [{
              from: -10,
              to: 10,
              color: 'green',
              name: 'low',
            },
            {
              from: 11,
              to: 20,
              color: 'yellow',
              name: 'medium',
            },
            {
              from: 21,
              to: 170,
              color: 'red',
              name: 'high',
            }
          ]
        }
      }
    },
  chart: {
    type: "heatmap",
    fontSize: "16px",
    fontFamily: "Montserrat, Arial, sans-serif"
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "1.2em",
      fontFamily: "Montserrat, Arial, sans-serif",
      fontWeight: "700",
      colors: ["#fff"]
    },
    
    background: {
      enabled: true,
      foreColor: '#333'
    },
    dropShadow: {
      enabled: false
    }
  },
  xaxis: {
    labels: {
      style: {
        fontSize: "14px",
        fontWeight: 700
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "14px",
        fontWeight: 700
      }
    }
  },
  series: [
    {
      name: 'count',
      data: [
        { x: 'Q1', y: 1 },
        { x: 'Q2', y: 33 },
        { x: 'Q3', y: 81 },
        { x: 'Q4', y: 89 }
      ]
    },
    {
      name: 'heat',
      data: [
        { x: 'Q1', y: 44 },
        { x: 'Q2', y: 0 },
        { x: 'Q3', y: 85 },
        { x: 'Q4', y: 97 }
      ]
    }
  ],
};



var chart = new ApexCharts(myChart, options);

chart.render();
}
}
</script>
<style lang="scss">
    
</style>