<template>
 <div>
  <v-dialog
   v-model="$store.state.dialog.oeeSetupDialog"
   hide-overlay
   persistent
   width="700"
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
     <div
      style="
       display: flex;
       justify-content: space-evenly;
       font-weight: 900;
       text-decoration: underline;
      "
     >
      <!-- <span>
       Rejected Count:
       {{ $store.state.machineData.machineLog.rejected_count || 0 }}
      </span> -->
      <span>
       Pieces Per Stroke:
       {{ $store.state.machineData.machineLog.pieces_per_stroke || 1 }}
      </span>
     </div>
     <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab> Initial Setup </v-tab>
      <v-tab> Info </v-tab>
     </v-tabs>

     <v-tabs-items v-model="tab">
      <v-tab-item>
       <v-text-field
        v-model="oeeInfo.pieces_per_stroke"
        type="number"
        label="Pieces Per Stroke"
       ></v-text-field>

       <v-btn
        style="color: white; width: 100%"
        class="bg-gradient-primary"
        :loading="isDisabled"
        @click="machineAction('mark_oeeinfo', oeeInfo)"
        >Save</v-btn
       >
      </v-tab-item>
      <v-tab-item>
       <div>
        Actual Production Count:
        {{ $store.state.machineData.machineLog.actual_count || 1 }}
       </div>

       <div>
        Rejected Count:
        {{ $store.state.machineData.machineLog.rejected_count || 1 }}
       </div>

       <div>
        Pieces Per Stroke:
        {{ $store.state.machineData.machineLog.pieces_per_stroke || 1 }}
       </div>
       <!-- <v-btn
         @click="getStrokeCount"
         style="margin-left: 5px"
         dark
         x-large
         color="pink"
        >
         Get
        </v-btn> -->
       <!-- </div> -->
       <!-- <v-text-field
        v-model="oeeInfo.rejected_count"
        type="number"
        label="Rejected Count"
       ></v-text-field> -->
      </v-tab-item>
     </v-tabs-items>
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
   isDisabled: false,
   oeeInfoDialog: false,
   oeeInfo: {
    actual_count: 0,
    rejected_count: 0,
    // pieces_per_min: 0,
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
   $vm.isDisabled = true;

   switch (action) {
    case "mark_oeeinfo":
     setTimeout(() => {
      machine.markOeeInfo(item);
      $vm.isDisabled = false;
      $vm.$toast.success("Saved", {
       // optional options Object
      });
     }, 2000);

     break;

    default:
     break;
   }
  },
 },
};
</script>
