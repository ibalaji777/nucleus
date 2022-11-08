<template>
    <div>
        <div class="widgetContainer">
            <div class="widgetGroup">
                <h5 class="widgetBlueTitle">Planned Production Time</h5>
                <div class="widgetGroupContainer" style="flex-direction: column;">
                   <div class="widget">
                        <div>Loading Material: {{globalRunningProducts.length}}</div>

                    </div>
                     <div class="widget">
                        <div>Total Staffs:{{globalRunningOff.length}}</div>
                    </div>

                    <div class="widget">
                        <div>Running Shifts: {{globalRunningShifts.length}}</div>
                    </div>



                    <div class="widget">
                        <div>Total Stops:{{globalRunningOff.length}}</div>
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