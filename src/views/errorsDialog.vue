<template>
 <div>
  <v-dialog
   v-model="$store.state.dialog.errorsDialog"
   fullscreen
   hide-overlay
   transition="dialog-bottom-transition"
  >
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      style="color: black"
      @click="$store.commit('setDialog', { key: 'errorsDialog', value: false })"
     >
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>General Information</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>

    <div style="margin-top: 40px; padding: 20px">
     <h4>Errors/Warnings</h4>

     <div
      style="padding: 10px; background: lightgrey"
      v-for="(msg, index) in global_errors.list"
      :key="'err' + index"
     >
      {{ index + 1 }}. &nbsp; {{ msg }}
     </div>
    </div>
   </v-card>
  </v-dialog>
 </div>
</template>
<script>
/*eslint-disable*/
import moment from "moment";
export default {
 data() {
  return {};
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
