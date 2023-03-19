<template>
 <div>
  <v-dialog
   v-model="$store.state.dialog.oeeSetupDialog"
   hide-overlay
   persistent
  >
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      dark
      @click="
       $store.commit('setDialog', { key: 'oeeSetupDialog', value: false })
      "
     >
      <v-icon style="color: black">mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>OEE</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>

    <div style="padding: 30px; height: 350px">
     <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab> Initial Setup </v-tab>
      <v-tab> OEE Setup </v-tab>
      <v-tab> Remark</v-tab>
     </v-tabs>

     <v-tabs-items v-model="tab">
      <v-tab-item>
       <v-text-field
        v-model="oeeInfo.pieces_per_stroke"
        type="number"
        label="Unit/Stroke"
       ></v-text-field>
      </v-tab-item>
      <v-tab-item>
       <div style="display: flex">
        <v-text-field
         v-model="oeeInfo.actual_count"
         type="number"
         label="Actual Count"
        ></v-text-field>
        <v-btn
         @click="getStrokeCount"
         style="margin-left: 5px"
         dark
         x-large
         color="pink"
        >
         Get
        </v-btn>
       </div>
       <v-text-field
        v-model="oeeInfo.rejected_count"
        type="number"
        label="Rejected Count"
       ></v-text-field>
       <v-text-field
        v-model="oeeInfo.pieces_per_min"
        type="number"
        label="Pieces Per Minute"
       ></v-text-field>
      </v-tab-item>
      <v-tab-item>
       <v-text-field
        v-model="oeeInfo.emp_remarks"
        type="number"
        label="Remarks"
       ></v-text-field>
      </v-tab-item>
     </v-tabs-items>

     <v-btn
      style="color: white; width: 100%"
      class="bg-gradient-primary"
      @click="machineAction('mark_oeeinfo', oeeInfo)"
      >Save</v-btn
     >
    </div>
   </v-card>
  </v-dialog>
 </div>
</template>
<script>
import * as machine from "../core/machine.js";

export default {
 data() {
  return {
   tab: null,
   oeeInfoDialog: false,
   oeeInfo: {
    actual_count: 0,
    rejected_count: 0,
    pieces_per_min: 0,
    emp_remarks: "",
    pieces_per_stroke: 1,
   },
  };
 },
 mounted() {
  var $vm = this;
  if ($vm.$store.state.machineData.machineLog)
   this.oeeInfo = $vm.$store.state.machineData.machineLog;
 },
 methods: {
  getStrokeCount() {
   this.oeeInfo.actual_count = this.oeeInfo.pieces_per_stroke;
  },
  machineAction(action, item) {
   var $vm = this;
   switch (action) {
    case "start":
     if (machine.machineLogIn($vm)) $vm.$alert("Manually started...");
     else $vm.$alert("Machine Already Running...");
     break;
    case "stop":
     $vm.$confirm("Do you Want to Logout?").then(() => {
      machine.machineLogOut($vm);
     });
     break;
    case "start_shedule":
     machine.startMachineShedule(item);
     break;
    case "mark_break":
     machine.markBreak(item);
     break;
    case "mark_downtime":
     machine.markDownTime(item);
     break;
    case "mark_oeeinfo":
     machine.markOeeInfo(item);
     $vm.$toast.success("Saved", {
      // optional options Object
     });
     break;

    default:
     break;
   }
   // switch (action) {
   //     case "start":
   // machine.startSignal($vm)
   //         break;
   //     case "stop":
   // machine.stopSignal($vm)
   //         break;
   //     default:
   //         break;
   // }
  },
 },
};
</script>
