<template>
 <div>
  <!-- eslint-disable -->
  <v-dialog
   fullscreen
   v-model="$store.state.dialog.editLogsDialog"
   hide-overlay
   persistent
  >
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      dark
      @click="
       $store.commit('setDialog', { key: 'editLogsDialog', value: false })
      "
     >
      <v-icon style="color: black">mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Logs</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div style="padding: 10px">
     <v-data-table
      :headers="headers"
      :items="$store.state.machineLogs"
      item-value="name"
      class="elevation-1"
     >
      <template v-slot:item.actions="{ item }">
       <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
       <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
     </v-data-table>
    </div>
   </v-card>
  </v-dialog>

  <v-dialog
   v-model="feedDataDialog"
   fullscreen
   hide-overlay
   transition="dialog-bottom-transition"
   persistent
  >
   <v-card>
    <v-toolbar dark color="primary">
     <v-btn icon dark @click="feedDataDialog = false">
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>FeedData</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div style="padding: 10px">
     <v-text-field
      v-model="feedData.actual_count"
      type="number"
      label="Actual Count"
     ></v-text-field>

     <v-text-field
      v-model="feedData.rejected_count"
      type="number"
      label="Rejected Count"
     ></v-text-field>
     <v-text-field
      v-model="feedData.pieces_per_stroke"
      type="number"
      label="Pieces Per Stroke"
     ></v-text-field>

     <v-text-field
      v-model="feedData.emp_remarks"
      type="number"
      label="Emp Remarks"
     ></v-text-field>

     <v-btn @click="updateLog()">Save</v-btn>
    </div>
   </v-card>
  </v-dialog>
 </div>
</template>

<script>
/*eslint-disable*/
import * as machine from "../core/machine.js";
import * as oeeCore from "../core/oeeCore.js";
import * as XLSX from "xlsx";

export default {
 data() {
  return {
   feedDataDialog: false,
   machineData: {
    machineLog: {},
    machineData: [],
   },

   feedData: {
    id: "",
    actual_count: "",
    rejected_count: "",
    pieces_per_stroke: "",
    emp_remarks: "",
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
     text: "Pieces Per Stroke",
     value: "pieces_per_stroke",
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
    {
     text: "Actions",
     value: "actions",
    },
   ],
  };
 },
 methods: {
  updateLog() {
   var $vm = this;

   let machineLog = $vm.machineData.machineLog;
   let machineHisotry = $vm.machineData.machineHisotry;

   machineLog.actual_count = parseFloat($vm.feedData.actual_count || 1);
   machineLog.rejected_count = parseFloat($vm.feedData.rejected_count || 0);
   machineLog.pieces_per_stroke = parseFloat(
    $vm.feedData.pieces_per_stroke || 1
   );
   machineLog.emp_remarks = $vm.feedData.emp_remarks;
   let dataAdd = oeeCore.machineDataForOee(
    _.cloneDeep(machineHisotry),
    _.cloneDeep(machineLog)
   );

   console.log(dataAdd);

   let dataset = {
    ..._.cloneDeep($vm.feedData),
    quality: dataAdd.quality,
    performance: dataAdd.performance,
    availability: dataAdd.availability,
    oee: dataAdd.oee,
   };

   console.log(dataset);
   machine
    .feedDataToServer(_.cloneDeep(dataset))
    .then(() => {
     $vm.feedDataDialog = false;
    })
    .catch(() => {
     $vm.feedDataDialog = false;
    });
  },
  editItem(item) {
   var $vm = this;
   $vm.feedDataDialog = true;
   $vm.machineData.machineLog = item;

   $vm.feedData.id = item.id;
   $vm.feedData.actual_count = item.actual_count;
   $vm.feedData.rejected_count = item.rejected_count;
   $vm.feedData.pieces_per_stroke = item.pieces_per_stroke;
   $vm.feedData.emp_remarks = item.emp_remarks;

   $vm.$store
    .dispatch("getServerMachineHistory", { machine_id: item.id, uq: item.uq })
    .then((res) => {
     console.log("machine data");
     console.log(res);
     if (res.data) $vm.machineData.machineHisotry = res.data;

     $vm.feedDataDialog = true;
    });
  },
  deleteItem(item) {
   var $vm = this;
   $vm.$confirm("Do You Want to delete?").then(() => {
    $vm.$store.dispatch("deleteServerLog", { id: item.id });
   });
  },
  exportExcel() {
   var $vm = this;

   // Import the SheetJS library

   let headers = [
    "start_time",

    "end_time",

    "employee_name",

    "product_name",

    "shift",

    "stroke",

    "duration",

    "actual_count",

    "rejected_count",

    "pieces_per_stroke",

    "quality",

    "performance",

    "availability",

    "oee",
   ];

   let items = _.map($vm.$store.state.machineLogs, (x) => {
    return [
     x["start_time"],
     x["end_time"],
     x["employee_name"],
     x["product_name"],
     x["shift"],
     x["stroke"],
     x["duration"],
     x["actual_count"],
     x["rejected_count"],
     x["pieces_per_stroke"],
     x["quality"],
     x["performance"],
     x["availability"],
     x["oee"],
    ];
   });
   // Create an array
   const myArray = [headers, ...items];

   // Create a new workbook and sheet
   const wb = XLSX.utils.book_new();
   const ws = XLSX.utils.aoa_to_sheet(myArray);

   // Add the sheet to the workbook
   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

   // Generate a file name for the download
   const fileName = "export.xlsx";

   // Convert the workbook to a buffer
   const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

   // Create a blob from the buffer
   const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
   });

   // Create a download link and click it
   const a = document.createElement("a");
   a.href = URL.createObjectURL(blob);
   a.download = fileName;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
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
