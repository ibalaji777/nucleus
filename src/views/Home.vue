<template>
 <div class="home">
  <widget-header></widget-header>
  <h4 style="margin: 0; padding: 0; text-align: center">Machine/info</h4>

  <widget-navbar></widget-navbar>
  <div style="display: flex; padding: 10px; margin: 10px 0">
   <div style="width: 100vw">
    <div style="margin-right: 20px">
     <div
      class=""
      style="margin-top: 12px; background: white; height: 220px; padding: 10px"
     >
      <main-chart-panel></main-chart-panel>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>
<script>
/*eslint-disable*/
var moment = require("moment");
var todayStartTime = new moment("2022-10-19 08:00:00 am");

export default {
 name: "Home",
 data() {
  return {
   chartData: {
    datasets: [
     {
      //   label: "T1" + moment(todayStartTime).add(0.5, 'hours'),
      data: [
       {
        x: moment(todayStartTime).add(0.5, "hours"),
        y: 0,
        label: "a1",
        count: 3,
       },
      ],
      backgroundColor: "red",
     },
     // {
     //   label: "T2" + moment(todayStartTime).add(2, 'hours'),
     //   data: [{
     //     x: moment(todayStartTime).add(2, 'hours'),
     //     y: 0,
     //         label:'a2',
     // count:5

     //   }],
     //   backgroundColor: "blue"
     // },
     // {
     //   label: "T3" + moment(todayStartTime).add(3, 'hours'),
     //   data: [{
     //     x: moment(todayStartTime).add(3, 'hours'),
     //     y: 0,
     //         label:'a3',
     // count:8

     //   }],
     //   backgroundColor: "orange"
     // },
    ],
   },
  };
 },
 mounted() {
  var $vm = this;

  $vm.$store.dispatch("GET_PRODUCTS");
 },
};
</script>
