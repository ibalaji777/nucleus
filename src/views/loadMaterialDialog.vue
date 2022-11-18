<template>
<div >
<v-dialog
v-model="$store.state.dialog.loadMaterialDialog"
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
@click="$store.commit('setDialog',{key:'loadMaterialDialog',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>
<v-toolbar-title><h4>Load Materials</h4></v-toolbar-title>
<v-spacer></v-spacer>
<v-toolbar-items>
</v-toolbar-items>
</v-toolbar>
<div>


<h4>Loaded Materials Count:{{globalRunningProducts.count}}</h4>
<div style="display:flex;justify-contente:space-around" v-for="(item,index) in loadMaterials" :key="'loadmaterial'+index">
<div>{{index+1}}</div>
<div>{{item.name}}</div>
<div>{{item.part_no}}</div>
<div>{{item.other_detail}}</div>
<div>{{item.material_code}}</div>
</div>

</div>
</v-card>
</v-dialog>
</div>
</template>
<script>
/*eslint-disable*/
import moment from 'moment'
export default {
  data(){
    return {
   loadMaterials:[]
   }
  },
  mounted(){
    var $vm=this;


  }

}
</script>
<style lang="scss">
 
</style>