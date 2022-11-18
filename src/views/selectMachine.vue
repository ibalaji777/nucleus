<template>
<div>
<v-dialog
v-model="$store.state.dialog.selectMachineDialog"
fullscreen
hide-overlay
transition="dialog-bottom-transition"
>
<v-card>
<v-toolbar
dark
color="primary"
>
<v-btn
icon
dark
@click="$store.commit('setDialog',{key:'selectMachineDialog',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>
<v-toolbar-title>Machine Plan</v-toolbar-title>
<v-spacer></v-spacer>
<v-toolbar-items>

</v-toolbar-items>
</v-toolbar>
<div style="padding:10px;">
<h4>Company Detail</h4>
<h5> Name:{{$store.state.setup.selected_company.name}}</h5>
<h5>Email:{{$store.state.setup.selected_company.email}}</h5>
<div  style="width:100vw">
<h4>Machine Detail</h4>
<div style="padding:10px;margin:10px;background:lightgrey;">
<b>Id</b>:{{$store.state.setup.selected_machine.id}}<br>
<b>Code</b>:{{$store.state.setup.selected_machine.code}}<br>
<b>name</b>:{{$store.state.setup.selected_machine.name}}<br>
<b>detail</b>:{{$store.state.setup.selected_machine.detail}}<br>
<b>hours</b>:{{$store.state.setup.selected_machine.hours}}<br>
</div>
<!-- <table class="employeeTable">
    <tr>
        <td>id</td>
        <td>Code</td>
        <td>Name</td>
        <td>Detail</td>
        <td>Planned Time(Hours)</td>

    </tr>
    <tr>
    <td>{{$store.state.setup.selected_machine.id}}</td>
    <td>{{$store.state.setup.selected_machine.code}}</td>
    <td>{{$store.state.setup.selected_machine.name}}</td>
    <td>{{$store.state.setup.selected_machine.detail}}</td>
    <td>{{$store.state.setup.selected_machine.hours}}</td>
  </tr>

</table> -->
<h4>Sheduled Breaks</h4>

<b>Planned Time:</b>{{$store.state.setup.selected_machine.hours}} Hours({{plannedProductionMinutes}}Min)<br>
<b>Total Shedule Break :</b>  {{totalBreak}} minutes
<br>
<b>Planned Production Time :</b>  {{plannedProductionMinutes-totalBreak}}  minutes




</div>

<div style="width:100vw;display:flex">

<div style="padding:10px">
  <h4 style="padding:10px">Breaks</h4>
  <table class="employeeTable">
    <tr>
        <td>Name</td>
        <td>Start Time</td>
        <td>End Time</td>
    </tr>
  <tr v-for="(item,index) in $store.state.db.breaks" :key="'break'+index">
    <td>{{item.name}}</td>
  <td>{{guiTimeFormat(item.start_time)}}</td>
     <td>{{guiTimeFormat(item.end_time)}}</td>  </tr>


</table>
</div>
<div style="padding:10px">

<h4 style="padding:10px">DownTimes</h4>

<table  class="employeeTable">
    <tr>
        <td>Name</td>
        <td>Description</td>
    </tr>
  <tr v-for="(item,index) in $store.state.db.down_time" :key="'break'+index">
    <td>{{item.name}}</td>
        <td>{{item.Description}}</td>
  </tr>

</table>
</div>
</div>
</div>
</v-card>
</v-dialog>
</div>
</template>
<script>
/*eslint-disable*/
import * as oee from '../core/oee.js'
import _ from 'lodash'
import moment from 'moment'
export default {
  data(){
    return {
      currentTime:''
    }
  },
  mounted(){
var $vm=this;

  },
  computed:{

    totalBreak()
    {var $vm=this;
return  _.reduce($vm.$store.state.db.breaks, function(result, x) {
  return result+parseFloat(moment.utc(moment(x.end_time, "HH:mm").diff(moment(x.start_time, "HH:mm"))).format("mm"));
}, 0);

    },
    plannedProductionMinutes(){
var $vm=this;
      return oee.HourToMin($vm.$store.state.setup.selected_machine.hours||0)
    }
  }

}
</script>
<style lang="scss">
  
.employeeTable{

  width:45vw;
  border-collapse: collapse;

}
.employeeTable td,th{
border:1px solid black;
padding:10px;

}
</style>