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
          <span>R/Count:{{ global_runTime_production_count }}</span>
          <span>P/Count:{{ global_planned_production_count }}</span>
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
           <td>Stroke</td>
           <td>Duration</td>
           <td>Event/Name</td>
           <td>Event/Desc</td>
           <td>Event/Message</td>
           <td>Event/reason</td>
           <td>Event/type</td>
           <td>Event/action</td>
          </tr>
         </thead>
         <tbody>
          <tr
           @click="selectEditRow(item, index)"
           v-for="(item, index) in global_historyWithoutNull"
           :key="'machineHistory' + index"
           :style="item.machine_status == 'OFF' ? 'background:red' : ''"
          >
           <th>{{ item.operation }}</th>
           <th>{{ guiTimeFormat(item.start_time) }}</th>
           <th>{{ guiTimeFormat(item.end_time) }}</th>
           <th>{{ item.machine_status }}</th>
           <th>
            {{ item.start_stroke }}
           </th>
           <th>{{ item.duration }}</th>
           <th>{{ item.op_name }}</th>
           <th>{{ item.op_desc }}</th>
           <th>{{ item.message }}</th>
           <th>{{ item.reason }}</th>
           <th>{{ item.type }}</th>
           <th>{{ item.action }}</th>
          </tr>
         </tbody>
        </table>
       </div>
      </div>
     </div>

     <!-- <history></history> -->
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
    <v-toolbar>
     <v-btn icon dark @click="editRowDialog = false">
      <v-icon color="black">mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Edit Row</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div
     style="background: linear-gradient(45deg, #0e304a, #ffffff); height: 92vh"
    >
     <!-- {{editRowItem}} -->

     <div v-if="editRowItem">
      <div
       v-if="
        editRowItem.operation == 'signal' &&
        editRowItem.machine_status ==
         $store.state.defaultData.machine_status_off
       "
      >
       <h4 style="color: white">Breaks</h4>
       <div class="breakList">
        <div
         style="background: #cb1b41; color: white"
         @click="machineAction('mark_break', { ...item, id: editRowItem.id })"
         v-for="(item, index) in $store.state.db.breaks"
         :key="'break' + index"
        >
         {{ item.name }}
        </div>
       </div>

       <h4 style="color: white">Downtime</h4>
       <div class="breakList">
        <div
         style="background: #cb1b41; color: white"
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

     <v-btn @click="machineAction('feedDataToServer', feedData)">Save</v-btn>
    </div>
   </v-card>
  </v-dialog>
 </div>
</template>
<script>
/*eslint-disable*/
import * as oeeCore from "../core/oeeCore.js";
import * as machine from "../core/machine.js";
import _ from "lodash";
export default {
 data() {
  return {
   machineData: {
    machineLog: {},
    machineHisotry: [],
   },
   feedDataDialog: false,
   feedData: {
    id: "",
    actual_count: "",
    rejected_count: "",
    pieces_per_stroke: "",
    emp_remarks: "",
   },

   editRowDialog: false,
   editRowItem: {},
   editRowItemIndex: 0,
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
  selectEditRow(value, index) {
   let $vm = this;
   $vm.editRowDialog = true;
   $vm.editRowItem = value;
   $vm.editRowItemIndex = index;
  },

  SheduleOperation(item, action) {
   if (action == "start") machine.startMachineShedule(item);
   if (action == "stop") machine.stopMachineShedule(item);
  },
  machineAction(action, item) {
   var $vm = this;
   switch (action) {
    case "feedDataToServer":
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

     machine
      .feedDataToServer(_.cloneDeep(dataset))
      .then(() => {
       $vm.feedDataDialog = false;
      })
      .catch(() => {
       $vm.feedDataDialog = false;
      });
     break;
    case "start":
     if ($vm.$store.state.isMachineWatcher) {
      $vm.$alert("Already Started.....");
      return;
     }
     $vm.$alert("Started...");
     machine.machineLogIn($vm);
     break;
    case "stop":
     // if (!$vm.$store.state.setup.checkMachine) $vm.$alert("Manually Already Off");
     $vm.$confirm("Do you Want to Logout?").then(() => {
      machine.machineLogOut($vm).then((res) => {
       $vm.feedDataDialog = true;
       $vm.machineData.machineLog = res.data.data.machineLog;
       $vm.machineData.machineHisotry = res.data.data.history;

       $vm.feedData.id = res.data.data.machineLog.id;
       $vm.feedData.actual_count = res.data.data.machineLog.actual_count;
       $vm.feedData.rejected_count = res.data.data.machineLog.rejected_count;
       $vm.feedData.pieces_per_stroke =
        res.data.data.machineLog.pieces_per_stroke;
       $vm.feedData.emp_remarks = res.data.data.machineLog.emp_remarks;

       //  $vm
       //   .$confirm("ARE YOU GOING TO CONTINUE NEW ONE?")
       //   .then(() => {
       //    $vm.feedDataDialog = true;
       //    $vm.machineData.machineLog = res.data.data.machineLog;
       //    $vm.machineData.machineHisotry = res.data.data.history;

       //    $vm.feedData.id = res.data.data.id;
       //    $vm.feedData.actual_count = res.data.data.actual_count;
       //    $vm.feedData.rejected_count = res.data.data.rejected_count;
       //    $vm.feedData.pieces_per_stroke = res.data.data.pieces_per_stroke;
       //    $vm.feedData.emp_remarks = res.data.data.emp_remarks;
       //   })
       //   .catch(() => {
       //    $vm.feedDataDialog = true;

       //    $vm.feedData.id = res.data.data.id;
       //    $vm.feedData.actual_count = res.data.data.actual_count;
       //    $vm.feedData.rejected_count = res.data.data.rejected_count;
       //    $vm.feedData.pieces_per_stroke = res.data.data.pieces_per_stroke;
       //    $vm.feedData.emp_remarks = res.data.data.emp_remarks;
       //   });
      });
      this.$toast.success("Task Completed....", {});
     });
     break;
    case "start_shedule":
     this.$toast.success("Sheduled....", {});
     machine.startMachineShedule(item);
     break;
    case "mark_break":
     machine.markBreak(
      _.cloneDeep($vm.editRowItem),
      $vm.editRowItemIndex,
      item
     );
     $vm.$toast.success("Break Marked Successfully");
     $vm.editRowDialog = false;
     break;
    case "mark_downtime":
     machine.markDownTime(
      _.cloneDeep($vm.editRowItem),
      $vm.editRowItemIndex,
      item
     );
     $vm.$toast.success("Down Time Successfully");
     $vm.editRowDialog = false;

     break;
    case "mark_oeeinfo":
     machine.markOeeInfo(
      _.cloneDeep($vm.editRowItem),
      $vm.editRowItemIndex,
      item
     );
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

.machineLogPanel th,
.machineLogPanel td {
 white-space: nowrap;
}
</style>
