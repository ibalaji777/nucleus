<template>
    <div>
        <div class="oeeContainer" style="margin: 10px 0; background: dimgrey;;text-align:center">
            <div class="oeeWidget">
                <percentage-chart :role="'OEE'" :color="$store.state.bgColor.oee" :chartData="global_oee" :key="'oee-'+global_oee" :title="'OEE'"></percentage-chart>
            </div>

            <div class="oeeWidget">
                <percentage-chart :role="'AVAILABILITY'" :color="$store.state.bgColor.availability" :key="global_availibilty" :chartData="global_availibilty" :title="'Availability'"></percentage-chart>
            </div>
            <div class="oeeWidget">
                <percentage-chart :role="'QUALITY'" :color="$store.state.bgColor.quality" :key="global_performance" :chartData="global_performance" :title="'Quality'"></percentage-chart>
            </div>
            <div class="oeeWidget">
                <percentage-chart :role="'PERFORMANCE'" :color="$store.state.bgColor.performance" :key="global_quality" :chartData="global_quality" :title="'Performance'"></percentage-chart>
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