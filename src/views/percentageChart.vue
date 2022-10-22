<template>
  <div class="graph_container">

<canvas ref="myChart" width="400" height="400"></canvas>        
    </div>
</template>
<script>
/*eslint-disable*/
const Chart = require('chart.js/auto').default;
export default {
    props:['title','chartData','color','role'],
    mounted(){
        var $vm=this;
        var dataset=[parseFloat(this.chartData),100-parseFloat(this.chartData)]
const ctx =this.$refs.myChart// document.getElementById('myChart').getContext('2d');
var centertxt={
  beforeDraw: function(chart) {
    // console.log(chart)
    var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

    ctx.restore();
    var fontSize = (height / 214).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    var textP = chart.config.data.datasets[0].data[0];
    var textXP = Math.round((width - ctx.measureText(textP).width) / 2);

    var text = $vm.role||"",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
  ctx.font='900 15px Arial';
    ctx.fillText(textP+'%', textXP-7, textY-15);
    ctx.fillText(text, textX-7, textY+5);
    ctx.save();
  }
}
const myChart = new Chart(ctx, {
    type: 'doughnut',
    plugins:[centertxt],
    options: {
cutout: 80,
    responsive: true,
    maintainAspectRatio: false,

},
    data: {
        // labels: ['Active', 'Pending'],
        datasets: [{
            label: this.title,
            data: dataset,
            backgroundColor: [
                                this.color,
                                '#eff1ef'
            ],
            // borderColor: [
            //     'rgba(255, 206, 86, 1)',
            // ],
            // borderWidth: 0.4
        }]
    },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});

// var centertxt={
//   beforeDraw: function(chart) {
//     var width = chart.chart.width,
//         height = chart.chart.height,
//         ctx = chart.chart.ctx;

//     ctx.restore();
//     var fontSize = (height / 114).toFixed(2);
//     ctx.font = fontSize + "em sans-serif";
//     ctx.textBaseline = "middle";

//     var text = "75%",
//         textX = Math.round((width - ctx.measureText(text).width) / 2),
//         textY = height / 2;

//     ctx.fillText(text, textX, textY);
//     ctx.save();
//   }
// };
    }
}
</script>
<style lang="scss">
    .graph_container {
 display: block;
 width: 100vw;
 height: 200px !important;
}
</style>