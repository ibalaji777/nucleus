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
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'red',
                'blue',
                'green',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
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