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

     <v-btn style="margin-right: 10px" color="primary" @click="exportExcel"
      >Excel</v-btn
     >

     <v-btn
      color="primary"
      @click="
       $store.commit('setDialog', { key: 'editLogsDialog', value: true })
      "
      >Edit</v-btn
     >

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
/*eslint-disable*/
import * as machine from "../core/machine.js";
import * as XLSX from "xlsx";
import state from "../store/state.js";
import _ from "lodash";

let table_header = [
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
];
export default {
 data() {
  return {
   oeeInfoDialog: false,
   oeeInfo: {
    actual_count: 0,
    rejected_count: 0,
    pieces_per_min: 0,
   },

   headers: table_header,
  };
 },
 methods: {
  dataTableExcel() {
   var $vm = this;
   var array = _.cloneDeep($vm.$store.state.machineLogs);
   array.forEach((element) => {
    let machineOffStaus = _.filter(element.history, (x) => {
     if (x.reason == "") x.reason = "Unplanned/DownTime";
     return x.machine_status == state.defaultData.machine_status_off;
    });
    const resultObj = machineOffStaus.reduce((acc, curr) => {
     if (acc[curr.reason]) {
      acc[curr.reason] += curr.duration;
     } else {
      acc[curr.reason] = curr.duration;
     }
     return acc;
    }, {});

    const [header_rt, values_rt] = Object.entries(resultObj).map(
     ([key, value]) => [key, value]
    );
   });

   console.log(header_rt); // ["abc d", "abc b"]
   console.log(values_rt); // [44, 22]
  },
  dataTableData() {
   const $vm = this;
   const array = _.cloneDeep($vm.$store.state.machineLogs);
   array.forEach((element) => {
    const machineOffStaus = _.filter(element.history, (x) => {
     if (x.reason == "") x.reason = "Unplanned/DownTime";
     return x.machine_status == state.defaultData.machine_status_off;
    });
    const resultObj = machineOffStaus.reduce((acc, curr) => {
     if (acc[curr.reason]) {
      acc[curr.reason] += curr.duration;
     } else {
      acc[curr.reason] = curr.duration;
     }
     return acc;
    }, {});

    const [header_rt, values_rt] = Object.entries(resultObj).map(
     ([key, value]) => [key, value]
    );

    const vuetifyValue = header_rt.reduce((acc, title, index) => {
     acc[title] = values_rt[index];
     return acc;
    }, {});

    element = { ...element, ...vuetifyValue };
    const vuetifyHeader = header_rt.map((title) => ({
     text: title,
     value: title,
    }));
    let prepareVuetifyValue = [...table_header, ...vuetifyHeader];
    console.log(header_rt); // ["abc d", "abc b"]
    console.log(values_rt); // [44, 22]
    console.log(vuetifyValue); // [{ "abc d": 44 }, { "abc b": 22 }]
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

    "pieces_per_min",

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
     x["pieces_per_min"],
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
