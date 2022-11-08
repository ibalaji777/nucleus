<template>
<v-dialog
v-model="$store.state.dialog.productWidgetDialog">
 <v-select
     :items="$store.state.db.products"
     attach
     item-text='name'
     item-value='id'
     v-model="name"
     label="Search Products"
     required>
    </v-select>        
</v-dialog>
</template>
<script>
export default {
    data(){
        return {
            name:''
        }
    }
}
</script>
<style lang="scss">
    
</style>