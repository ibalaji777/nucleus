<template>
    <div>
        <div class="">
            <div class="widgetGroup">

                <div class="widgetGroupContainer" style="display:flex;justify-content:space-evenly;font-weight:500">

                   <div 
                                      @click="$store.commit('setDialog',{key:'machineActionDialog',value:true})"    class="widget">
                   
                        <div>Machine Action</div>
                    </div>

                    <div class="">
                        <div>Breaks:{{global_total_breaks.minutes}}Min</div>
                    </div>
                    
                    <div class="">
                        <div>Shedule:{{global_shedule.minutes}}Min</div>
                    </div>
                  <div 
                   @click="$store.commit('setDialog',{key:'loadMaterialDialog',value:true})"    class="widget">
                        <div>Loaded Material: {{global_products.count}}</div>
                        <!-- {{globalRunningProducts}} -->

                    </div>
                     <div class="widget">
                        <div>Staffs:{{global_shifts.count}}</div>
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
export default {

}
</script>
<style lang="scss">

    
</style>