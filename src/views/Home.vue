<template>
 <div class="home">
  
<widget-header></widget-header>
<div style="display:flex;padding:10px;margin:25px 0;background:cornflowerblue">

<div style="width:77vw;">
    <div style="margin-right:20px">
      <div class="timeChart">
<time-chart-status2></time-chart-status2>
</div>
<oee-panel></oee-panel>
</div>
</div>
<div style="width:19vw">

<widget-navbar></widget-navbar>
</div>
</div>
 </div>
</template>
<script>
/*eslint-disable*/
// import io from 'socket.io-client'


export default {
 name: "Home",
 mounted(){
//   const socket = io("http://127.0.0.1:4444");

//   socket.on("readData", async (data) => {

// console.log("socket",data)
//  })
 }
};
</script>

<style lang="scss">
.oeeContainer {
 display: flex;
 max-width: 100% !important;
 flex-wrap:wrap;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); 
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

    width: 250px;
    /* height: 57px; */
    justify-content: center;
    align-items: center;
    display: flex;

    margin: 1px;
    padding: 13px;


}
.widgetGroup{
 padding:10px;
 background: white;
 margin:2px;
 box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%); 
 cursor:pointer;
 }
 .widgetGroup:hover{
  background: lightgray;
 }
.widgetGroupContainer{
  display:flex;
}
.widgetTitle{
background: #f58181;
    padding: 5px;
    color: white;
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
