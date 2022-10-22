<template>
    <div>

<div class="topHeader">

<div>
 Time:{{timeFormat($store.state.setup.time)}}
 </div>
 <div>
 Date:{{dateFormat($store.state.setup.date)}}
 </div>
 <div>
 Shift:{{$store.state.setup.shift}}
</div>
<div>
 Operator:{{$store.state.setup.user.name}}
</div>
<div>
 Your Id:{{$store.state.setup.user.userUq}}
</div>
</div>


x
         <time-chart-status></time-chart-status>
    <!-- <stackbar-chart></stackbar-chart>     -->
        <time-chart></time-chart>    

<!-- <time-chart-status></time-chart-status> -->
<div class="oeeContainer">
      <div>
      <percentage-chart :role="'OEE'" :color="$store.state.bgColor.oee" :chartData="10" :title="'OEE'"></percentage-chart>
    </div>

    <div>
      <percentage-chart :role="'AVAILABILITY'" :color="$store.state.bgColor.availability" :chartData="10" :title="'Availability'"></percentage-chart>
    </div>
    <div>
      <percentage-chart :role="'QUALITY'" :color="$store.state.bgColor.quality" :chartData="90" :title="'Quality'"></percentage-chart>
    </div>
    <div>
      <percentage-chart :role="'PERFORMANCE'" :color="$store.state.bgColor.performance" :chartData="80" :title="'Performance'"></percentage-chart>
  </div>


</div>
    </div>
</template>
<script>
import moment from 'moment'

export default {
 data(){
    return{
    time: moment().format("hh:mm:ss a")
} 
 }
 ,methods:{

    timeFormat(string){

        return moment(string).format(this.$store.state.setup.format.time)
    },
        dateFormat(string){

        return moment(string).format(this.$store.state.setup.format.date)
    }
 },
 computed:{
    //    computedTimeFormatted () {
    //     return moment(this.shift.start).format(this.$store.state.setup.format.time)
    //   },

// time(){
//     return moment().format("hh:mm:ss a")
// }
//     // time:{
//     //     get(){

//     //         return moment().format("hh:mm:ss a")
//     //     },set(value){
//     //         console.log(value)
//     //     }
//     // }
 }

}
</script>
<style lang="scss">
.topHeader{
    display:flex;
        justify-content: space-around;
        padding:10px;
}
.topHeader div{
 padding: 10px;
    margin: 5px;
    background: lightcoral;
    color: white;
    box-shadow: 2px 2px 7px 1px black;

}
</style>