<template>
    <div>
<canvas ref="myChart" width="400" height="400"></canvas>        
    </div>
</template>
<script>
/*eslint-disable*/
const Chart = require('chart.js/auto').default;
export default {
    props:['title','chartData','color'],
    mounted(){
        var dataset=[parseFloat(this.chartData),100-parseFloat(this.chartData)]
const ctx =this.$refs.myChart// document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Active', 'Pending'],
        datasets: [{
            label: this.title,
            data: dataset,
            backgroundColor: [
                                this.color,
                                'grey'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
    }
}
</script>
<style lang="scss">
    
</style>