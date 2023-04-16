<template>
 <div class="cardN" style="padding: 10px">
  <h3>OEE PANEL</h3>

  <v-row>
   <v-col cols="6" sm="6" md="3" class="cardCCol">
    <percentage-chart
     :role="'OEE'"
     :color="$store.state.bgColor.oee"
     :chartData="global_oee"
     :key="'oee-' + global_oee"
     :title="'OEE'"
    ></percentage-chart>
   </v-col>
   <v-col cols="6" sm="6" md="3" class="cardCCol">
    <percentage-chart
     :role="'AVAILABILITY'"
     :color="$store.state.bgColor.availability"
     :key="global_availibilty"
     :chartData="global_availibilty"
     :title="'Availability'"
    ></percentage-chart>
   </v-col>

   <v-col cols="6" sm="6" md="3" class="cardCCol">
    <percentage-chart
     :role="'QUALITY'"
     :color="$store.state.bgColor.quality"
     :key="global_quality"
     :chartData="global_quality"
     :title="'Quality'"
    ></percentage-chart>
   </v-col>

   <v-col cols="6" sm="6" md="3" class="cardCCol">
    <percentage-chart
     :role="'PERFORMANCE'"
     :color="$store.state.bgColor.performance"
     :key="global_performance"
     :chartData="global_performance"
     :title="'Performance'"
    ></percentage-chart>
   </v-col>
  </v-row>
 </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
