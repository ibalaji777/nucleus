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

var options = {
  chart: {
    height: 350,
    type: "heatmap"
  },
           dataLabels: {
      enabled: true
    },
    xaxis: {
      labels: {
        show: false
      },
      tooltip: {
        enabled: false,
      },
    },
    // tooltip: {
    //   shared: false,
    //   followCursor: true,
    //   intersect: false,
    //   x: {
    //     show: true,
    //     format: 'dd MMM'
    //   },
    // },
colors: [
    "#5A9BD5",
    "#5A9BD5",
    "#5A9BD5",
    "#5A9BD5",
    "#ffffff",
    "#F8C045",
    "#F8C045",
    "#F8C045",
    "#F8C045"
  ],
  plotOptions: {
    heatmap: {
      shadeIntensity: 1
    }
  },
  dataLabels: {
    enabled: false
  },
  series: [
    {
      name: "Jan",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Feb",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Mar",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Apr",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "",
      data: generateData(20, {
        min: 0,
        max: 0
      })
    },
    {
      name: "May",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Jun",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Jul",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Aug",
      data: generateData(20, {
        min: -30,
        max: 55
      })
    }
  ],
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      if (w.globals.seriesNames[seriesIndex] !== "") {
        return series[seriesIndex][dataPointIndex];
      } else {
        return "";
      }
    }
  }
};



var chart = new ApexCharts(myChart, options);

chart.render();
}
}
</script>
<style lang="scss">
    
</style>