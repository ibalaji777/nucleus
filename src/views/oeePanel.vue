<template>
    <div>
  <div class="oeeContainer" style="margin:10px 0;background:dimgrey">
   <div class="oeeWidget">
    <percentage-chart
     :role="'OEE'"
     :color="$store.state.bgColor.oee"
     :chartData="10"
     :title="'OEE'"
    ></percentage-chart>
   </div>

   <div class="oeeWidget">
    <percentage-chart
     :role="'AVAILABILITY'"
     :color="$store.state.bgColor.availability"
     :chartData="10"
     :title="'Availability'"
    ></percentage-chart>
   </div>
   <div class="oeeWidget">
    <percentage-chart
     :role="'QUALITY'"
     :color="$store.state.bgColor.quality"
     :chartData="90"
     :title="'Quality'"
    ></percentage-chart>
   </div>
   <div class="oeeWidget">
    <percentage-chart
     :role="'PERFORMANCE'"
     :color="$store.state.bgColor.performance"
     :chartData="80"
     :title="'Performance'"
    ></percentage-chart>
   </div>
  </div>        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    
</style>