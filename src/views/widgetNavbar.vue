<template>
 <div>
  <div class="">
   <div class="widgetGroup">
    <div
     class="widgetGroupContainer"
     style="
      display: flex;
      justify-content: space-evenly;
      font-weight: 500;
      padding: 10px;
     "
    >
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
      @click="$store.commit('setDialog', { key: 'errorsDialog', value: true })"
      class="raduius10 p10 white pointer"
      style="background: red; color: red"
     >
      <div>Errors {{ global_errors.count }}</div>
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
  </div>
 </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
