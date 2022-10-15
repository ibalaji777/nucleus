<template>
  <div class="home">
    
<div class="oeeContainer">
    <div>
      <percentage-chart :color="'red'" :chartData="10" :title="'Quality'"></percentage-chart>
    </div>
    <div>
      <percentage-chart :color="'green'" :chartData="90" :title="'Quality'"></percentage-chart>
    </div>
    <div>
      <percentage-chart :color="'orange'" :chartData="80" :title="'Quality'"></percentage-chart>
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
}

.oeeContainer div{
// width: 33wh;
}
</style>