<template>
 <div>
  <time-chart-status
   v-if="global_timeChart.end_time"
   :key="JSON.stringify(global_timeChart.chartData)"
   :startTime="global_timeChart.start_time"
   :endTime="global_timeChart.end_time"
   :newData="global_timeChart.chartData"
  ></time-chart-status>

  <!-- {{ $store.state.machineData.machineLog }} -->
  <oee-panel style="margin-top: 15px"></oee-panel>
 </div>
</template>
<script>
export default {};
</script>

<style lang="scss"></style>
