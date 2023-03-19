<template>
 <div style="margin: 10px 0">
  <div
   style="padding: 5px"
   @click="
    $store.commit('setDialog', { key: 'selectEmployeeWidget', value: true })
   "
  >
   <v-row>
    <v-col cols="12" sm="6" md="3" class="cardCCol">
     <v-card elevation="7">
      <v-row>
       <v-col cols="8" style="padding: 22px">
        <div>
         <div class="cardTStyle">Employee/Current</div>
         {{ $store.state.setup.selected_employee.username }}
        </div>
       </v-col>

       <v-col
        cols="4"
        style="text-align: center; display: flex; justify-content: center"
       >
        <div
         class="icon bg-gradient-primary shadow text-center border-radius-md"
        >
         <v-icon style="color: white">mdi-account</v-icon>
        </div>
       </v-col>
      </v-row>
     </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3" class="cardCCol">
     <v-card elevation="7">
      <v-row>
       <v-col cols="8" style="padding: 22px">
        <div>
         <div class="cardTStyle">Product/Current</div>
         {{ $store.state.setup.selected_product.name }}
        </div>
       </v-col>

       <v-col
        cols="4"
        style="text-align: center; display: flex; justify-content: center"
       >
        <div
         class="icon bg-gradient-primary shadow text-center border-radius-md"
        >
         <v-icon style="color: white">mdi-gesture-tap</v-icon>
        </div>
       </v-col>
      </v-row>
     </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3" class="cardCCol">
     <v-card elevation="7">
      <v-row>
       <v-col cols="8" style="padding: 22px">
        <div>
         <div class="cardTStyle">Shift/Current</div>
         {{ $store.state.setup.selected_shift.name }}
        </div>
       </v-col>

       <v-col
        cols="4"
        style="text-align: center; display: flex; justify-content: center"
       >
        <div
         class="icon bg-gradient-primary shadow text-center border-radius-md"
        >
         <v-icon style="color: white">mdi-clock-time-eight-outline</v-icon>
        </div>
       </v-col>
      </v-row>
     </v-card>
    </v-col>
    <!-- <v-col cols="12" sm="6" md="3" class="cardCCol">
     <v-card elevation="7">
      <v-row>
       <v-col cols="8" style="padding: 22px">
        <div>
         <div class="cardTStyle">Breaks/Min</div>
         {{ global_total_breaks.minutes }}
        </div>
       </v-col>

       <v-col
        cols="4"
        style="text-align: center; display: flex; justify-content: center"
       >
        <div
         class="icon bg-gradient-primary shadow text-center border-radius-md"
        >
         <v-icon style="color: white"> mdi-stop-circle-outline</v-icon>
        </div>
       </v-col>
      </v-row>
     </v-card>
    </v-col> -->
    <v-col cols="12" sm="6" md="3" class="cardCCol">
     <v-card elevation="7">
      <v-row>
       <v-col cols="8" style="padding: 22px">
        <div>
         <div class="cardTStyle">Staff/Count</div>
         {{ global_shifts.count }}
        </div>
       </v-col>

       <v-col
        cols="4"
        style="text-align: center; display: flex; justify-content: center"
       >
        <div
         class="icon bg-gradient-primary shadow text-center border-radius-md"
        >
         <v-icon style="color: white">mdi-account-multiple-outline</v-icon>
        </div>
       </v-col>
      </v-row>
     </v-card>
    </v-col>
   </v-row>
  </div>

  <div class="" style="display: flex; margin: 10px 0">
   <!-- <div @click="$store.commit('setDialog',{key:'selectMachineDialog',value:true})" class="widgetGroup" style="width: 100%;">
                <h5 class="widgetTitle">Planned Production Time</h5>
                <div class="widgetGroupContainer">
                    <div class="widget">
                        <div class="widgetHeader">Select Product</div>
                        
                        <div class="widgetContent"></div>
                    </div>
                </div>
            </div> -->
  </div>
 </div>
</template>
<script>
/*eslint-disable*/
import * as oee from "../core/oee.js";
import _ from "lodash";
import moment from "moment";

export default {
 mounted() {},
 computed: {
  totalBreak() {
   var $vm = this;
   return _.reduce(
    $vm.$store.state.db.breaks,
    function (result, x) {
     return (
      result +
      parseFloat(
       moment
        .utc(moment(x.end_time, "HH:mm").diff(moment(x.start_time, "HH:mm")))
        .format("mm")
      )
     );
    },
    0
   );
  },
  plannedProductionMinutes() {
   var $vm = this;
   return oee.HourToMin($vm.$store.state.setup.selected_machine.hours || 0);
  },
 },
};
</script>
<style lang="scss">
.widgetHeader {
 text-align: center;
 font-weight: 900;
 font-size: 16px;
}
.widgetContent {
 font-weight: 500;
 font-size: 16px;
}
</style>
