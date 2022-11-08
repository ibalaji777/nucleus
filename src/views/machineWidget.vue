<template>
<v-row justify="center" style="background:white">

<v-dialog
width="700"
v-model="$store.state.dialog.machineWidgetDialog">
<v-card>
    <v-toolbar
dark
color="primary"
>
<v-toolbar-title>Machine</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn
icon
dark
@click="$store.commit('setDialog',{key:'machineWidgetDialog',value:false})"
>
<v-icon>mdi-close</v-icon>
</v-btn>

<v-toolbar-items>
</v-toolbar-items>
</v-toolbar>


<div style="height:400px;background:white;padding:10px;margin:5px"> 

    <v-autocomplete
    outlined
     :items="$store.state.db.products"
     attach
     item-text='name'
     return-object
     v-model="name"
     label="Search Products"
     required
     @change="selectProduct"
     >
    </v-autocomplete>        

<div style="text-align:center">
    <v-btn @click="submit" :style="globalStyle" :color="globalBtnBgColor">Submit</v-btn>
</div>
    </div>
</v-card>
</v-dialog>
</v-row>
</template>
<script>
import _ from 'lodash'
/*eslint-disable*/
export default {
    data(){
        return {
            name:'',
            selected:{}
        }
    },
methods:{
submit(){
var $vm=this;
if(!_.isEmpty($vm.selected))
{

}

},
selectProduct(value){
var $vm=this;
$vm.selected=value
console.log("selected",value)

$vm.$store.commit('setProduct',value)
        }
    }
}
</script>
<style lang="scss">
    
</style>