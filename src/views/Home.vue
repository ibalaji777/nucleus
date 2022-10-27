<template>
  <div class="home">
<!-- <div class="toolbar_container">

  <div @click="$router.push('createCompany')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Company</span>
    </div>
  </div>

  <div @click="$router.push('createGroup')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Create Group</span>
    </div>
  </div>

  <div @click="$router.push('dashboard')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Dashboard</span>
    </div>
  </div>

  <div @click="$router.push('dashboardMachine')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px">Machine</span>
    </div>
  </div>
    <div @click="$router.push('selectMachine')">
    <div class="center" >
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px"> Select Machine</span>
    </div>
  </div>
  <div @click="$router.push('selectMachine')">
    <div class="center">
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px"> Create User</span>
    </div>
  </div>
 <div @click="$router.push('createShift')">
    <div class="center">
      <v-icon>mdi-plus</v-icon><br>
      <span style="font-size:12px"> Create Shift</span>
    </div>
  </div>
</div> -->

        <!-- <time-chart-status></time-chart-status> -->
    <!-- <stackbar-chart></stackbar-chart>     -->
        <!-- <time-chart></time-chart>     -->

<!-- <time-chart-status></time-chart-status> -->
<time-chart-status2></time-chart-status2>
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

.toolbar_container{
  display:flex;
  padding:10px;
}
.toolbar_container > div{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    margin: 2px;
    box-shadow: 0px 1px 5px -1px black;
    background: azure;
    font-weight: 600;
    border-radius: 4px;
    }
.toolbar_container  .center{
text-align:center
}
</style>