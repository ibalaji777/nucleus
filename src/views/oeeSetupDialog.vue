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
    <div style="padding: 10px">
     <v-text-field
      v-model="oeeInfo.actual_count"
      type="number"
      label="Actual Count"
     ></v-text-field>

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

     <v-btn
      style="color: white"
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
   oeeInfoDialog: false,
   oeeInfo: {
    actual_count: 0,
    rejected_count: 0,
    pieces_per_min: 0,
   },
  };
 },
 methods: {
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
