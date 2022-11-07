<template>
    <div style="margin: 10px 0;">
        <div class="widgetContainer" style="margin: 10px 0;border:2px solid #334999">
            <div @click="$store.commit('setDialog',{key:'selectMachineDialog',value:true})" class="widgetGroup" style="width: 32vw;">
                <h5 class="widgetTitle">Planned Production Time</h5>
                <div class="widgetGroupContainer">
                    <div class="widget">
                        <div class="widgetHeader">Planned Time</div>
                        :
                        <div class="widgetContent">{{$store.state.setup.selected_machine.hours}} Hrs</div>
                    </div>
                    <div class="widget">
                        <div class="widgetHeader">Breaks</div>
                        :
                        <div class="widgetContent">{{totalBreak}} Min</div>
                    </div>
                </div>
            </div>
            <div @click="$store.commit('setDialog',{key:'selectEmployeeWidget',value:true})" class="widgetGroup" style="width: 32vw;">
                <h5 class="widgetTitle">User Detail</h5>
                <div class="widgetGroupContainer">
                    <div class="widget">
                        <div class="widgetHeader">Username</div>
                        :<br />
                        <div class="widgetContent">{{$store.state.setup.selected_employee.username}}</div>
                    </div>
                    <div class="widget">
                        <div class="widgetHeader">
                            Shift
                        </div>
                        :
                        <div class="widgetContent">{{$store.state.setup.selected_shift.name}}</div>
                    </div>
                </div>
            </div>

            <div @click="$store.commit('setDialog',{key:'selectProductDialog',value:true})" class="widgetGroup" style="width: 32vw;">
                <h5 class="widgetTitle">Item/Product</h5>
                <div class="widgetGroupContainer">
                    <div class="widget">
                        <div class="widgetHeader">Part No</div>
                        :
                        <div class="widgetContent">{{$store.state.setup.selected_product.part_no}}</div>
                    </div>
                    <div class="widget">
                        <div class="widgetHeader">Material Code</div>
                        :
                        <div class="widgetContent">{{$store.state.setup.selected_product.material_code}}</div>
                    </div>
                </div>
            </div>
        </div>

        <select-employee-widget></select-employee-widget>
        <select-machine></select-machine>
        <select-product></select-product>
    </div>
</template>
<script>
/*eslint-disable*/
import * as oee from '../core/oee.js'
import _ from 'lodash'
import moment from 'moment'


export default {
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
    .widgetHeader{
      text-align:center;
      font-weight:900;
      font-size:16px;
      
    }
    .widgetContent{
      font-weight:500;
      font-size:16px;
      
    }
</style>