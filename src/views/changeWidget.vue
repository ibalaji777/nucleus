<template>
    <div style="margin-top:15px;">
        <v-btn dark :style="style" style="margin:0 5px;" :color="globalBtnBgColor" @click="$store.commit('setDialog',{key:'productWidgetDialog',value:true})">Product</v-btn>
        <!-- <v-btn dark :style="globalStyle" :color="globalBtnBgColor" @click="$store.commit('setDialog',{key:'shiftWidgetDialog',value:true})">Shift</v-btn> -->
        <v-btn dark :style="globalStyle" :color="globalBtnBgColor" @click="$store.commit('setDialog',{key:'empLoginWidgetDialog',value:true})">Employee  Login</v-btn>
        <!-- <v-btn dark :style="globalStyle" :color="globalBtnBgColor" @click="$store.commit('setDialog',{key:'machineWidgetDialog',value:true})">Machine</v-btn> -->
    </div>
</template>
<script>
/*eslint-disable*/
export default {
    
    computed:{

        globalBtnBgColor(){

            this.$store.state.style.globalBtnBgColor;
        },
        style(){

            return 'color:'+this.$store.state.style.btnTxtColor;
        }
    }
}
</script>
<style lang="scss">
    
</style>