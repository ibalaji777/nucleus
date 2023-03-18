<template>
 <div>
  <v-dialog
   v-model="$store.state.dialog.selectEmployeeWidget"
   fullscreen
   hide-overlay
   transition="dialog-bottom-transition"
  >
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      style="color: black"
      @click="
       $store.commit('setDialog', { key: 'selectEmployeeWidget', value: false })
      "
     >
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>General Information</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>

    <div style="margin-top: 40px; padding: 20px">
     <div><b>Machine Id:</b> {{ $store.state.setup.selected_machine.id }}</div>
     <div><b>Emp Id:</b> {{ $store.state.setup.selected_employee.id }}</div>
     <div><b>Product Id:</b> {{ $store.state.setup.selected_product.id }}</div>
    </div>

    <v-row>
     <v-col>
      <h3>Machine Runned/Status</h3>

      <v-data-table
       :headers="historyHeader"
       :items="global_total_machine_history.list"
       item-value="name"
       class="elevation-1"
      >
       <template v-slot:item.start_time="{ item }">
        <span>{{ item.start_time | global_time_format }}</span>
       </template>

       <template v-slot:item.end_time="{ item }">
        <span>{{ item.start_time | global_time_format }}</span>
       </template>
      </v-data-table>
     </v-col>
     <v-col>
      <h3>Breaks/Status</h3>

      <v-data-table
       :headers="historyHeader"
       :items="global_total_breaks.list"
       item-value="name"
       class="elevation-1"
      >
       <template v-slot:item.start_time="{ item }">
        <span>{{ item.start_time | global_time_format }}</span>
       </template>

       <template v-slot:item.end_time="{ item }">
        <span>{{ item.start_time | global_time_format }}</span>
       </template>
      </v-data-table>
     </v-col>
     <v-col>
      <h3>Shedules</h3>

      <v-data-table
       :headers="historyHeader"
       :items="global_total_shedule.list"
       item-value="name"
       class="elevation-1"
      >
       <template v-slot:item.start_time="{ item }">
        <span>{{ item.start_time | global_time_format }}</span>
       </template>

       <template v-slot:item.end_time="{ item }">
        <span>{{ item.start_time | global_time_format }}</span>
       </template>
      </v-data-table>
     </v-col>
    </v-row>
   </v-card>
  </v-dialog>
 </div>
</template>
<script>
/*eslint-disable*/
import moment from "moment";
export default {
 data() {
  return {
   historyHeader: [
    { text: "Start Time", value: "start_time" },
    { text: "End Time", value: "end_time" },
    { text: "Duration", value: "duration" },
   ],
  };
 },
};
</script>
<style lang="scss">
.employeeTable {
 width: 45vw;
 border-collapse: collapse;
}
.employeeTable td,
th {
 border: 1px solid black;
 padding: 10px;
}
</style>
