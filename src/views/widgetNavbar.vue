<template>
 <div>
  <div class="">
   <div class="widgetGroup">
    <div class="cards3">
     <div
      class="bg-gradient-primary raduius10 p10 white pointer"
      @click="
       $store.commit('setDialog', { key: 'machineActionDialog', value: true })
      "
     >
      <div>Machine Action</div>
     </div>

     <div
      @click="
       $store.commit('setDialog', { key: 'productWidgetDialog', value: true })
      "
      class="bg-gradient-dark raduius10 p10 white"
     >
      <div>Choose Product</div>
     </div>

     <div
      @click="
       $store.commit('setDialog', { key: 'empLoginWidgetDialog', value: true })
      "
      class="bg-gradient-dark raduius10 p10 white pointer"
     >
      <div>Change Emplyee</div>
     </div>

     <div
      @click="
       $store.commit('setDialog', { key: 'oeeSetupDialog', value: true })
      "
      class="bg-gradient-dark raduius10 p10 white pointer"
     >
      <div>Data/Feed</div>
     </div>

     <div
      @click="$store.commit('setDialog', { key: 'logsDialog', value: true })"
      class="bg-gradient-dark raduius10 p10 white pointer"
     >
      <div>Logs</div>
     </div>

     <div
      @click="$store.commit('setDialog', { key: 'deviceDialog', value: true })"
      class="bg-gradient-dark raduius10 p10 white pointer"
      style="text-align: center; display: flex"
     >
      <v-icon style="color: white">mdi-chip</v-icon>
      <div>Device</div>
     </div>
     <div
      @click="$store.commit('setDialog', { key: 'errorsDialog', value: true })"
      class="raduius10 p10 white pointer"
      style="background: red; color: red"
     >
      <div>Suggesion {{ global_errors.count }}</div>
     </div>

     <!-- <div class="widget">
                        <div>Planned Stops:{{globalPlannedStops.count}}</div>
                    </div>

                <div class="widget">
                        <div>Unplaneed Stops:{{globalUnPlannedStops.count}}</div>
                    </div> -->
     <!-- <div class="widget" @click="$store.commit('setDialog',{key:'historyDialog',value:true})">
                        <div>History</div>
                    </div> -->

     <!-- <div class="widget">
    <div>Planned Time</div>
  </div> -->
    </div>
   </div>
   <div class="cards2" style="margin-top: 15px">
    <span class="bg-gradient-dark raduius10 p10 white pointer"
     >Log:
     {{ guiTimeFormat($store.state.machineData.machineLog.start_time) }}
    </span>

    <span class="bg-gradient-dark raduius10 p10 white pointer"
     >Dur:{{ globalScToHrs($store.state.machineData.machineLog.duration) }}
    </span>
    <span class="bg-gradient-dark raduius10 p10 white pointer"
     >R/Time:{{ global_runTime.seconds }}</span
    >
    <span class="bg-gradient-dark raduius10 p10 white pointer"
     >P/Time:{{ global_plannedTime.seconds }}</span
    >
    <span class="bg-gradient-dark raduius10 p10 white pointer"
     >R/Count:{{ global_runTime_production_count }}</span
    >
    <span class="bg-gradient-dark raduius10 p10 white pointer"
     >P/Count:{{ global_planned_production_count }}</span
    >
   </div>
  </div>
 </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
