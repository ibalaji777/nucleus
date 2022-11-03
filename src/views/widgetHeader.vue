<template>
    <div>
 <div class="widgetContainer">
<div  @click="$store.commit('setDialog',{key:'selectMachineDialog',value:true})" class="widgetGroup" style="width:32vw">
  <h5 class="widgetTitle">Planned Production Time</h5>
  <div class="widgetGroupContainer">
    <div class="widget">
    <div>Planned Time</div>
  </div>
   <div class="widget">
    <div>Breaks </div>
  </div>
  </div>
  </div>
  <div @click="$store.commit('setDialog',{key:'selectEmployeeWidget',value:true})" class="widgetGroup"  style="width:32vw">
  <h5 class="widgetTitle">User Detail</h5>
  <div class="widgetGroupContainer">
    <div class="widget">
    <div>User</div>
  </div>
   <div class="widget">
    <div>
      Shift<br>
    {{$store.state.setup.selected_shift.name}}
      </div>
  </div>
  </div>
  </div>

    <div class="widgetGroup"  style="width:32vw">
  <h5 class="widgetTitle">Running Part No</h5>
  <div class="widgetGroupContainer">
    <div class="widget">
    <div>Part No</div>
  </div>
   <div class="widget">
    <div>Machine Id </div>
  </div>
  </div>
  </div>
 </div>
    
    <select-employee-widget></select-employee-widget>
    <select-machine></select-machine>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    
</style>