<template>
 <div style="background: white">
  <v-dialog width="700" v-model="$store.state.dialog.productWidgetDialog">
   <v-card>
    <v-toolbar>
     <v-toolbar-title>Choose Product</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-btn
      icon
      style="color: black"
      dark
      @click="
       $store.commit('setDialog', { key: 'productWidgetDialog', value: false })
      "
     >
      <v-icon>mdi-close</v-icon>
     </v-btn>

     <v-toolbar-items> </v-toolbar-items>
    </v-toolbar>

    <div style="display: flex; justify-content: flex-end; padding: 10px">
     <v-icon style="cursor: pointer" @click="$store.dispatch('GET_PRODUCTS')"
      >mdi-refresh</v-icon
     >
    </div>
    <div style="height: 400px; background: white; padding: 10px; margin: 5px">
     <v-autocomplete
      outlined
      :items="$store.state.db.products"
      attach
      item-text="name"
      return-object
      v-model="name"
      label="Search Products"
      required
      @input="selected = $event"
     >
     </v-autocomplete>

     <div style="text-align: center">
      <v-btn
       @click="submit"
       class="bg-gradient-primary"
       style="color: white; width: 100%"
       >Submit</v-btn
      >
     </div>
    </div>
   </v-card>
  </v-dialog>
 </div>
</template>
<script>
import _ from "lodash";
/*eslint-disable*/
export default {
 data() {
  return {
   name: "",
   selected: {},
  };
 },
 methods: {
  submit() {
   var $vm = this;

   if (!_.isEmpty($vm.selected)) {
    $vm.$confirm("Do You want to change Product?").then(() => {
     $vm.$store.commit("setProduct", $vm.selected);
     $vm.$alert("Successfully Updated");
    });
    return;
   }
   $vm.$alert("Please Select Product First");
  },
  selectProduct(value) {
   var $vm = this;
   $vm.selected = value;
  },
 },
};
</script>
<style lang="scss"></style>
