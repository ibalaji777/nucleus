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
const Chart = require('chart.js/auto').default;
export default {
mounted(){
    var $vm=this;
    const ctx =this.$refs.myChart// document.getElementById('myChart').getContext('2d');
var barOptions_stacked = {
    tooltips: {
        enabled: false
    },
    hover :{
        animationDuration:0
    },
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            gridLines: {
            }, 
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:false
    },
    
    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px Open Sans";
            ctx.fillStyle = "#fff";
            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    data = dataset.data[index];
                   var countXaxis=0
                    if(i==0){
                        ctx.fillText(data, 50, bar._model.y+4);
                        ctx.textAlign = "start";
ctx.fillText(data, bar._model.x-countXaxis, 60);
                    } else {
                        ctx.fillText(data, bar._model.x-25, bar._model.y+4);
                       // Show the different textAlign values
ctx.textAlign = "start";
ctx.fillText(data, bar._model.x-countXaxis, 60);
            
                    }
                }),this)
            }),this);
        }
    },
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
};
var myChart = new Chart(ctx,barOptions_stacked);
}
}
</script>
<style lang="scss">
          .graph_container{
       display:block;
    //   width:100vw;
    //   height:200px !important;
    }
</style>