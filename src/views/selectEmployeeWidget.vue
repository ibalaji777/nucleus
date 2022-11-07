<template>
<v-row justify="center">
<v-dialog
v-model="$store.state.dialog.selectEmployeeWidget"
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
@click="$store.commit('setDialog',{key:'selectEmployeeWidget',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>
<v-toolbar-title>Employee Detail</v-toolbar-title>
<v-spacer></v-spacer>
<v-toolbar-items>
<v-btn
dark
text
@click="$store.commit('setDialog',{key:'selectEmployeeWidget',value:false})"
>
Save
</v-btn>
</v-toolbar-items>
</v-toolbar>
<div style="padding:10px;display:flex">

<div  style="width:50vw">
<table class="employeeTable">
  <tr>
    <td>Name</td>
    <td>{{$store.state.setup.selected_employee.name}}</td>
  </tr>
    <tr>
    <td>Branch</td>
    <td>{{$store.state.setup.selected_employee.branch}}</td>
  </tr>
    <tr>
    <td>Phone</td>
    <td>{{$store.state.setup.selected_employee.phone}}</td>
  </tr>
    <tr>
    <td>Email</td>
     <td>{{$store.state.setup.selected_employee.email}}</td>  </tr>
    <tr>
    <td>Username</td>
    <td>{{$store.state.setup.selected_employee.username}}</td>
  </tr>
    <tr>
    <td>Id Card</td>
    <td>{{$store.state.setup.selected_employee.id_card}}</td>
  </tr>
</table>
</div>

<div style="width:50vw">
  <table class="employeeTable" style="margin:10px 0">
    <tr>
      <td><b>Today Date:</b></td>
      <td>{{$store.state.setup.date}}</td>
    </tr>
    <tr>
      <td><b>Current Time:</b></td>
      <td>{{$store.state.setup.time}}</td>
    </tr>
    <tr>
      <td><b>Running Shift:</b></td>
      <td>{{$store.state.setup.selected_shift.name}}</td>
    </tr>
  </table>
<!-- <b>Today Date:</b>{{$store.state.setup.date}}<br> -->
<!-- <b>Current Time:</b>{{$store.state.setup.time}}<br> -->
<!-- <b>Running Shift:</b>{{$store.state.setup.selected_shift.name}} -->



<!-- {{$store.state.db.shifts}} -->
<table class="employeeTable">
<tr>
 <th>No</th>
<th>Name</th>
<th>Start Time</th>
  <th>End Time</th>
</tr>
<tr  v-for="(shift,index) in $store.state.db.shifts" :key="'shift'+index">
  <td>{{index+1}}</td>
<td>{{shift.name}}</td>
<td>{{shift.start_time}}</td>
 <td>{{shift.end_time}}</td>
</tr>

</table>

</div>
</div>
</v-card>
</v-dialog>
</v-row>
</template>
<script>
export default {
  data(){
    return {
      currentTime:''
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