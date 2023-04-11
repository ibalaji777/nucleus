<template>
 <div>
  <v-dialog
   fullscreen
   v-model="$store.state.dialog.deviceDialog"
   hide-overlay
   persistent
  >
   <v-card>
    <v-toolbar>
     <v-btn
      icon
      dark
      @click="$store.commit('setDialog', { key: 'deviceDialog', value: false })"
     >
      <v-icon style="color: black">mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>Device Dialog</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>
    <div style="padding: 10px">
     <div>
      <v-row>
       <v-col style="position: relative">
        <img
         class=""
         style="width: 100%; height: auto"
         src="/conn.gif"
         alt=""
        />
       </v-col>
       <v-col>
        <div style="display: flex; flex-direction: column">
         <v-btn color="primary" style="margin: 2px" @click="restartApp"
          >Reset</v-btn
         >

         <v-btn
          color="primary"
          style="margin: 2px"
          @click="embeded('conn_status')"
         >
          Status
         </v-btn>
         <v-btn
          color="primary"
          style="margin: 2px"
          @click="embeded('port_list')"
         >
          Port List
         </v-btn>
         <v-btn color="primary" style="margin: 2px" @click="embeded('port')">
          Port
         </v-btn>
         <v-btn color="primary" style="margin: 2px" @click="embeded('clear')">
          Clear
         </v-btn>
         <v-btn color="primary" style="margin: 2px" @click="embeded('alertOn')"
          >Alert On</v-btn
         >
         <v-btn color="primary" style="margin: 2px" @click="embeded('alertOff')"
          >Alert Off</v-btn
         >
         <v-btn
          color="primary"
          style="margin: 2px"
          @click="embeded('stored_path')"
          >SPort</v-btn
         >
         <v-btn
          color="primary"
          style="margin: 2px"
          @click="embeded('device_check')"
          >Device Check</v-btn
         >
         <v-btn
          color="primary"
          style="margin: 2px"
          @click="embeded('device_detect')"
          >Device Detect</v-btn
         >
         <v-btn color="primary" style="margin: 2px" @click="embeded('set_port')"
          >Set Port</v-btn
         >
        </div>
       </v-col>
      </v-row>
     </div>
    </div>
    <div style="text-align: center">
     selectedPort:<b>{{ selectedPort }}</b>
    </div>
    <div class="portList">
     <div
      v-for="(item, index) in portList"
      :key="'index' + index"
      @click="selectedPort = item.path"
     >
      {{ item.path }}
     </div>
    </div>
    <div style="background: black; color: white; height: 200px; overflow: auto">
     <pre>{{ result }}</pre>
    </div>
    <hr />
   </v-card>
  </v-dialog>
 </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
 data() {
  return {
   selectedPort: "",
   portList: [],

   result: {},
  };
 },
 mounted() {
  ipcRenderer.on("app-restarted", () => {
   window.location.reload();
  });
 },
 methods: {
  restartApp() {
   ipcRenderer.send("restart-app");
  },
  async embeded(action) {
   var $vm = this;

   switch (action) {
    case "conn_status":
     $vm.result = await $vm.$store.dispatch("apiEmbededStatus");
     break;
    case "port_list":
     $vm.result = await $vm.$store.dispatch("apiEmbededPortList");
     $vm.portList = await $vm.result.data.ports;
     break;
    case "port":
     $vm.result = await $vm.$store.dispatch("apiEmbededPort");
     $vm.selectedPort = $vm.result.data.port;
     break;

    case "clear":
     $vm.result = await $vm.$store.dispatch("apiEmbededClear");
     break;

    case "alertOn":
     $vm.result = await $vm.$store.dispatch("apiEmbededAlertOn");
     break;

    case "alertOff":
     $vm.result = await $vm.$store.dispatch("apiEmbededAlertOff");
     break;
    case "stored_path":
     $vm.result = await $vm.$store.dispatch("apiStoredPath");
     break;
    case "device_check":
     $vm.result = await $vm.$store.dispatch("apiDeviceCheck");
     break;
    case "device_detect":
     $vm.result = await $vm.$store.dispatch("apiDeviceDetect");
     break;

    case "set_port":
     $vm.result = await $vm.$store.dispatch("apiSetPort", $vm.selectedPort);
     break;

    default:
     break;
   }
  },
 },
};
</script>
<style lang="scss">
.portList div {
 margin: 10px;
 border: 1px solid sandybrown;
 border-radius: 7px;
 padding: 3px;
 cursor: pointer;
}
.center_ {
 position: absolute;
 height: auto;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
</style>
