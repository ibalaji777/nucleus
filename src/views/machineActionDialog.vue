<template>
 <div>
  <v-dialog
   v-model="$store.state.dialog.machineActionDialog"
   fullscreen
   hide-overlay
   transition="dialog-bottom-transition"
   persistent
  >
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      dark
      style="color: black"
      @click="
       $store.commit('setDialog', { key: 'machineActionDialog', value: false })
      "
     >
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Machine Action</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div style="padding: 10px">
     <div style="display: flex">
      <div style="width: 65%">
       <h4 style="padding: 10px">Shedulers</h4>
       <div class="shedulerList">
        <div
         @click="machineAction('start_shedule', item)"
         v-for="(item, index) in $store.state.db.shedule"
         :key="'shedule' + index"
        >
         {{ item.name }}
        </div>
       </div>
       <!-- {{$store.state.machineData.machineHisotry}} -->
       <!-- <h4>Breaks</h4>
<div class="breakList">
    <div @click="machine_action('mark_break',item)" v-for="(item,index) in $store.state.db.breaks" :key="'break'+index">{{item.name}}</div>
</div> -->
       <div>
        <h2>Machine Current Activity Panel</h2>
        <hr />
        <div class="machineCurrentStatus">
         <div
          style="
           display: flex;
           justify-content: space-between;
           width: 100%;
           padding: 2px;
          "
         >
          <span
           >Log:
           {{ guiTimeFormat($store.state.machineData.machineLog.start_time) }}
          </span>

          <span
           >Dur:{{
            globalScToHrs($store.state.machineData.machineLog.duration)
           }}
          </span>
          <span>R/Time:{{ global_runTime.seconds }}</span>
          <span>P/Time:{{ global_plannedTime.seconds }}</span>
          <span>A/Stroke:{{ global_actual_stroke_count.stroke }}</span>
          <span>A/Count:{{ global_actual_stroke_count.actual_count }}</span>
         </div>
         <div
          style="
           display: flex;
           justify-content: space-between;
           width: 100%;
           padding: 2px;
          "
         >
          <span>
           Type {{ $store.state.machineData.currentHistory.operation }}
          </span>
          <span>
           Start Time :{{
            guiTimeFormat($store.state.machineData.currentHistory.start_time)
           }}
          </span>
          <span>
           AV:{{ global_availibilty }} PER:{{ global_performance }} QA:{{
            global_quality
           }}
          </span>
         </div>
         <!-- End Time :...Running<br> -->
        </div>
       </div>
      </div>
      <!-- {{$store.state.db.breaks}} -->
      <div style="width: 25%; position: relative">
       <div
        style="
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         text-align: center;
        "
       >
        <div v-if="$store.state.setup.checkMachine">
         <wave></wave>
        </div>
        <div v-else>
         <div
          style="
           width: 120px;
           height: 120px;
           background: black;
           position: relative;
          "
         >
          <hr
           style="
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
           "
          />
         </div>
        </div>
       </div>
      </div>
      <div style="width: 10%">
       <div
        class="machineOperation"
        style="
         display: flex;
         flex-direction: column;
         height: 100%;
         justify-content: space-around;
        "
       >
        <div
         @click="machineAction('start')"
         class="opContainer"
         style="background: green; color: white"
        >
         <span class="start alcenter"> start</span>
        </div>
        <div
         @click="machineAction('stop')"
         class="opContainer"
         style="background: red; color: white"
        >
         <span class="stop alcenter"> stop</span>
        </div>
        <div
         @click="
          $store.commit('setDialog', { key: 'oeeSetupDialog', value: true })
         "
         class="opContainer"
         style="background: orange; color: white"
        >
         <span class="alcenter"> Feed</span>
        </div>
       </div>
      </div>
     </div>

     <div class="machinePanel" style="display: flex">
      <div style="width: 100%; border-right: 2px solid white">
       <h2 style="padding: 5px">Machine Logs Panel</h2>
       <hr />
       <div class="machineLogPanel">
        <table style="width: 100%">
         <thead>
          <tr>
           <td>Activity</td>
           <td>Start Time</td>
           <td>End Time</td>
           <td>Machine Status</td>
           <td>Duration</td>
          </tr>
         </thead>
         <tbody>
          <tr
           @click="selectEditRow(item)"
           v-for="(item, index) in $store.state.machineData.machineHisotry"
           :key="'machineHistory' + index"
          >
           <th>{{ item.operation }}</th>
           <th>{{ guiTimeFormat(item.start_time) }}</th>
           <th>{{ guiTimeFormat(item.end_time) }}</th>
           <th>{{ item.machine_status }}</th>
           <th>{{ item.duration }}</th>
          </tr>
         </tbody>
        </table>
       </div>
      </div>
     </div>

     Mode :Demo<br />
     Machine status : {{ $store.state.setup.checkMachine }}<br />
     Embeded status : {{ $store.state.setup.checkEmbededDevice }}<br />
     <!-- Shift Name : {{ $store.state.setup.shiftName }}<br /> -->
     machine live data :
     <pre>{{ $store.state.setup.machineLiveData }}</pre>
     <br />
     <div v-for="(item, index) in shedule" :key="'ss' + index">
      <v-btn @click="SheduleOperation(item, 'start')">start</v-btn>
      {{ item.name }}
      <v-btn @click="SheduleOperation(item, 'stop')">stop</v-btn>
     </div>

     <table>
      <tr>
       <td>
        <h1>Manual</h1>
        <h2>Machine Overall</h2>
        <!-- <v-btn @click="machineAction('manual','overallStart')">Start Machine</v-btn>
            <v-btn @click="machineAction('manual','overallStop')">Stop Machine</v-btn> -->

        <h2>Machine Action</h2>
        <v-btn @click="machineAction('manual', 'start')">Start Machine</v-btn>
        <v-btn @click="machineAction('manual', 'stop')">Stop Machine</v-btn>
       </td>
       <td>
        <h1>Automate</h1>
        <h2>Machine Action</h2>
        <v-btn @click="machineAction('automatic', 'start')"
         >Start Machine</v-btn
        >
        <v-btn @click="machineAction('automatic', 'stop')">Stop Machine</v-btn>
       </td>
      </tr>
     </table>

     <history></history>
    </div>
   </v-card>
  </v-dialog>

  <v-dialog
   v-model="editRowDialog"
   fullscreen
   hide-overlay
   transition="dialog-bottom-transition"
   persistent
  >
   <v-card>
    <v-toolbar dark color="primary">
     <v-btn icon dark @click="editRowDialog = false">
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Edit Row</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div style="padding: 10px">
     <!-- {{editRowItem}} -->

     <div v-if="editRowItem">
      <div
       v-if="
        editRowItem.operation == 'signal' &&
        editRowItem.machine_status ==
         $store.state.defaultData.machine_status_off
       "
      >
       <h4>Breaks</h4>
       <div class="breakList">
        <div
         @click="machineAction('mark_break', { ...item, id: editRowItem.id })"
         v-for="(item, index) in $store.state.db.breaks"
         :key="'break' + index"
        >
         {{ item.name }}
        </div>
       </div>
       <h4>Downtime</h4>
       <div class="breakList">
        <div
         @click="
          machineAction('mark_downtime', { ...item, id: editRowItem.id })
         "
         v-for="(item, index) in $store.state.db.down_time"
         :key="'down_time' + index"
        >
         {{ item.name }}
        </div>
       </div>
      </div>
     </div>
    </div>
   </v-card>
  </v-dialog>

  <v-dialog
   v-model="oeeInfoDialog"
   fullscreen
   hide-overlay
   transition="dialog-bottom-transition"
   persistent
  >
   <v-card>
    <v-toolbar dark color="primary">
     <v-btn icon dark @click="oeeInfoDialog = false">
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Edit Row</v-toolbar-title>
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

     <v-btn @click="machineAction('mark_oeeinfo', oeeInfo)">Save</v-btn>
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
   editRowDialog: false,
   editRowItem: {},
   oeeInfoDialog: false,
   oeeInfo: {
    actual_count: 0,
    rejected_count: 0,
    pieces_per_min: 0,
   },
   shedule: [
    {
     id: 1,
     name: "Tool setting",
     description: "",
     tme: "30",
    },
    {
     id: 2,
     name: "Tool setting 2",
     description: "",
     time: "30",
    },
   ],
  };
 },
 async mounted() {
  var $vm = this;

  let machineData = await $vm.$store.dispatch("MACHINE_DATA");
  console.log(machineData);
  if (machineData) {
   if (machineData.machineLog) {
    $vm.oeeInfo = {
     actual_count: machineData.machineLog.actual_count,
     rejected_count: machineData.machineLog.rejected_count,
     pieces_per_min: machineData.machineLog.pieces_per_min,
    };
   }
  }
 },

 methods: {
  selectEditRow(value) {
   let $vm = this;
   $vm.editRowDialog = true;
   $vm.editRowItem = value;
  },

  SheduleOperation(item, action) {
   if (action == "start") machine.startMachineShedule(item);
   if (action == "stop") machine.stopMachineShedule(item);
  },
  machineAction(action, item) {
   var $vm = this;
   switch (action) {
    case "start":
     if (machine.machineLogIn($vm)) $vm.$alert("Manually started...");
     else $vm.$alert("Machine Already Running...");
     break;
    case "stop":
     // if (!$vm.$store.state.setup.checkMachine) $vm.$alert("Manually Already Off");
     $vm.$confirm("Do you Want to Logout?").then(() => {
      machine.machineLogOut($vm);
      this.$toast.success("Task Completed....", {});
     });
     break;
    case "start_shedule":
     this.$toast.success("Sheduled....", {});
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
<style lang="scss">
.shedulerList {
 position: relative;
 min-height: 200px;
 overflow: auto;
 background: grey;
}
.shedulerList div {
 background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);

 color: white;
 padding: 10px;
 margin-top: 2px;
}
.breakList div {
 background: rgb(235, 164, 33);
 color: white;
 padding: 10px;
 margin-top: 2px;
}
.machineLogPanel {
 max-height: 42vh;
 overflow: auto;
}
.machinePanel {
 background: black;
 color: white;
 min-height: 42vh;
 margin-top: 10px;
}
.machineCurrentStatus {
}

.machineOperation {
 position: relative;
 display: flex;
 flex-direction: column;
}
.machineOperation div {
 width: 80px;
 height: 80px;
 border-radius: 50%;
 margin: 2px 0px;
 box-shadow: 6px 2px 14px black;
}
.machineOperation .start {
 background: green;
}
.machineOperation .stop {
 background: red;
}

.alcenter {
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
.opContainer {
 position: relative;
 width: 100%;
 height: 100%;
 background: red;
}
</style>
