<template>
  <v-app>
    <v-app-bar
      app
      color="#43386A"
      dark
    >
    <v-icon @click="$router.go(-1)">mdi-arrow-left-thick</v-icon>
      <div class="d-flex align-center">
   
      </div>

      <v-spacer></v-spacer>


    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
/*eslint-disable*/
// window.ipcRenderer = require("electron").ipcRenderer;
const ipcRenderer = window.require("electron").ipcRenderer;
import * as oee from '../src/core/oee'
export default {
  name: 'App',

  data: () => ({
    //
  }),

  mounted(){
             // Synchronous message emmiter and handler
        //  console.log(ipcRenderer.sendSync('shedule', 'sync ping')) 

        //  // Async message handler
         ipcRenderer.on('shedule', (event, arg) => {
            console.log(arg)
         })
oee.calculation()
         // Async message sender
        //  ipcRenderer.send('asynchronous-message', 'async ping')
  }
};
</script>
