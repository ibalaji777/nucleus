<template>
    <div class="home">
        <widget-header></widget-header>
      <h1 style="margin:0;padding:0;text-align:center">Live Status</h1>

                <widget-navbar></widget-navbar>
        <div style="display: flex; padding: 10px; margin: 10px 0; background: cornflowerblue;">
          <div style="width: 100vw;">
                <div style="margin-right: 20px;" >
                    <div class="" style="height:220px" >
                        <time-chart-status v-if="global_timeChart.end_time" :key="JSON.stringify(global_timeChart.chartData)" :startTime="global_timeChart.start_time" :endTime="global_timeChart.end_time" :newData="global_timeChart.chartData"></time-chart-status>
                    </div>
                    <oee-panel></oee-panel>
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
 data(){

    return {
chartData:{
  datasets: [{
    //   label: "T1" + moment(todayStartTime).add(0.5, 'hours'),
      data: [{
        x: moment(todayStartTime).add(0.5, 'hours'),
        y: 0,
            label:'a1',
    count:3 

      }],
      backgroundColor: "red"
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
  ]
}
    }
 },
 mounted(){
var $vm=this;

 $vm.$store.dispatch('GET_PRODUCTS')
 }
};
</script>

<style lang="scss">
.oeeContainer {
 display: flex;
 max-width: 100% !important;
 flex-wrap:wrap;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); 
 border: 2px solid;

}

.timeChart{
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); 
 background: white;

}
.oeeContainer .oeeWidget {
 width: 16vw;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); 

 margin: 15px;
 padding: 1px;
 background: white;
 border-radius: 4%;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); 

}

// .oeeContainer > div {

// }

.toolbar_container {
 display: flex;
 padding: 10px;
}
.toolbar_container > div {
 width: 100px;
 height: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
 color: gray;
 margin: 2px;
 box-shadow: 0px 1px 5px -1px black;
 background: azure;
 font-weight: 600;
 border-radius: 4px;
}
.toolbar_container .center {
 text-align: center;
}
.widgetContainer{
  width:100%;
  display: flex;
  // margin-top:10px;
  justify-content:center;
  

}
.widgetContainer .widget{
 box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    width: 250px;
    /* height: 57px; */
    justify-content: center;
    align-items: center;
    display: flex;

    margin: 1px;
    padding: 13px;
background: #2f4f6f;
    color: white;
    

}
.widgetGroup{
     padding: 10px;
    background: white;
    margin: 3px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 5px 5px 10px #727272, -5px -5px 10px #ffffff;
}
 .widgetGroup:hover{
  background: lightgray;
 }
.widgetGroupContainer{
  display:flex;
}
.widgetTitle{
// background: #f58181;
    padding: 5px;
    // color: white;
    font-weight: 700;
    font-size: 16px;
}
.widgetBlueTitle{
  background: cornflowerblue;
    padding: 5px;
    color: white;
    font-size: 15px;
    text-align: center;

}
body{
    background: #fdfdfd;
}
  
</style>
