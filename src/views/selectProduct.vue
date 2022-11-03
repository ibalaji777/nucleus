<template>
<v-row justify="center">
<v-dialog
v-model="$store.state.dialog.selectProductDialog"
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
@click="$store.commit('setDialog',{key:'selectProductDialog',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>
<v-toolbar-title>Select Product</v-toolbar-title>
<v-spacer></v-spacer>
<v-toolbar-items>
</v-toolbar-items>
</v-toolbar>
<div style="padding:10px;display:flex">

<div  style="width:50vw">
<h4>Machine Detail</h4>
<table class="employeeTable">
    <tr>
        <td>id</td>
        <td>name</td>
        <td>Part No</td>
        <td>Material Code</td>

    <tr>
    <td>{{$store.state.setup.selected_product.id}}</td>
    <td>{{$store.state.setup.selected_product.name}}</td>
    <td>{{$store.state.setup.selected_product.part_no}}</td>
    <td>{{$store.state.setup.selected_product.material_code}}</td>
  </tr>

</table>
</div>
<div style="width:50vw">
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