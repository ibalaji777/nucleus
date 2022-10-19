<template>
  <div class="home">

    <time-chart></time-chart>    
    <time-chart-status></time-chart-status>
<div class="oeeContainer">
      <div>
      <percentage-chart :role="'OEE'" :color="$store.state.bgColor.oee" :chartData="10" :title="'OEE'"></percentage-chart>
    </div>

    <div>
      <percentage-chart :role="'AVAILABILITY'" :color="$store.state.bgColor.availability" :chartData="10" :title="'Availability'"></percentage-chart>
    </div>
    <div>
      <percentage-chart :role="'QUALITY'" :color="$store.state.bgColor.quality" :chartData="90" :title="'Quality'"></percentage-chart>
    </div>
    <div>
      <percentage-chart :role="'PERFORMANCE'" :color="$store.state.bgColor.performance" :chartData="80" :title="'Performance'"></percentage-chart>
  </div>


</div>

<!-- <div style="width:300px">
<percentage-chart :chartData="10" :title="'Quality'"></percentage-chart>
</div> -->

<!-- <doughnut-chart></doughnut-chart> -->

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss">
.oeeContainer{
  display:flex;
  max-width: 100% !important;
  justify-content: center;
  // overflow:hidden
}

.oeeContainer div{
width: 200px;
}
</style>