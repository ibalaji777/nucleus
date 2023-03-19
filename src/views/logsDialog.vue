<template>
 <div>
  <v-dialog v-model="$store.state.dialog.logsDialog" hide-overlay persistent>
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      dark
      @click="$store.commit('setDialog', { key: 'logsDialog', value: false })"
     >
      <v-icon style="color: black">mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Logs</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div style="padding: 10px">
     <v-btn @click="loadData" style="margin: 10px" color="primary">Show</v-btn>
     <v-data-table
      :headers="headers"
      @click:row="selectRow"
      :items="$store.state.machineLogs"
      item-value="name"
      class="elevation-1"
     ></v-data-table>
    </div>
   </v-card>
  </v-dialog>

  <v-dialog v-model="oeeInfoDialog" hide-overlay persistent>
   <v-card>
    <v-toolbar>
     <v-btn icon dark @click="oeeInfoDialog = false">
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
      style="color: white; width: 100%; margin: 10px 0"
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

   headers: [
    {
     text: "Start Time",
     value: "start_time",
    },
    {
     text: "End Time",
     value: "end_time",
    },
    {
     text: "Employee",
     value: "employee_name",
    },
    {
     text: "Product",
     value: "product_name",
    },
    {
     text: "Shift",
     value: "shift",
    },
    {
     text: "Stroke",
     value: "stroke",
    },
    {
     text: "Duration/Sec",
     value: "duration",
    },
    {
     text: "Actual Count",
     value: "actual_count",
    },
    {
     text: "Rejected Count",
     value: "rejected_count",
    },
    {
     text: "Pieces Per Minute",
     value: "pieces_per_min",
    },
    {
     text: "Quality",
     value: "quality",
    },
    {
     text: "Performance",
     value: "performance",
    },
    {
     text: "Availability",
     value: "availability",
    },
    {
     text: "OEE",
     value: "oee",
    },
   ],
  };
 },
 methods: {
  selectRow(item) {
   let $vm = this;
   $vm.oeeInfo = {
    actual_count: item.actual_count,
    rejected_count: item.rejected_count,
    pieces_per_min: item.pieces_per_min,
   };

   $vm.oeeInfoDialog = true;
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
  loadData() {
   this.$store.dispatch("MACHINE_LOGS");
  },
 },
 mounted() {
  this.$store.dispatch("MACHINE_LOGS");
 },
};
</script>

<style lang="scss"></style>
