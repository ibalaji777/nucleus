<template>
    <div>
        <div class="widgetContainer">
            <div class="widgetGroup">
                <h5 class="widgetBlueTitle">Planned Production Time</h5>
                <div class="widgetGroupContainer" style="flex-direction: column;">


                   <div class="widget">
                        <div>Live Stroke: {{globalMachineLive.stroke}}</div>
                    </div>
                  <div 
                   @click="$store.commit('setDialog',{key:'loadMaterialDialog',value:true})"                    class="widget">
                        <div>Loading Material: {{globalRunningProducts.count}}</div>
                        <!-- {{globalRunningProducts}} -->

                    </div>
                     <div class="widget">
                        <div>Staffs:{{globalRunningEmps.count}}</div>
                    </div>

                    <div class="widget">
                        <div>Shifts: {{globalRunningShifts.count}}</div>
                    </div>



                    <div class="widget">
                        <div>Total Stops:{{globalRunningOff.count}}</div>
                    </div>
                    <div class="widget">
                        <div>Planned Stops:{{globalPlannedStops.count}}</div>
                    </div>

                <div class="widget">
                        <div>Unplaneed Stops:{{globalUnPlannedStops.count}}</div>
                    </div>
               <div class="widget" @click="$store.commit('setDialog',{key:'historyDialog',value:true})">
                        <div>History</div>
                    </div>

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