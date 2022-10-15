<template>
    <div>
<canvas id="myChart" width="400" height="400"></canvas>        
    </div>
</template>
<script>
/*eslint-disable*/
const Chart = require('chart.js/auto').default;
export default {
    mounted(){
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [50,50],
            backgroundColor: [
                                'green',
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