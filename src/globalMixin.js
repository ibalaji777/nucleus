import Vue from "vue";
import moment from "moment";
import _ from "lodash";
import store from "../src/store/index.js";

Vue.filter("global_date_format", function (value) {
 if (!value) return "";
 value = value.toString();
 return moment(value, store.state.setup.bgDateFormat).format(
  store.state.setup.uiDateFormat
 );
});
Vue.filter("global_time_format", function (value) {
 if (!value) return "";
 value = value.toString();
 return moment(value, store.state.setup.bgTimeFormat).format(
  store.state.setup.uiTimeFormat
 );
});
Vue.mixin({
 computed: {
  globalMachineLive() {
   return this.$store.state.setup.machineLiveData;
  },

  globalRunningProducts() {
   var $vm = this;
   var datasets = _.uniq(
    _.map($vm.$store.state.setup.machineActivities, "product_id")
   );
   var products = _.reduce(
    datasets,
    (result, product_id) => {
     var product =
      _.find(
       $vm.$store.state.db.products,
       (product) => product.id == product_id
      ) || {};
     if (!_.isEmpty(product)) {
      result.push(product);
     }
     return result;
    },
    []
   );
   return {
    count: datasets.length,
    datasets,
    products,
   };
  },
  globalRunningShifts() {
   var $vm = this;
   var datasets = _.uniq(
    _.map($vm.$store.state.setup.machineActivities, "shift_id")
   );
   return {
    count: datasets.length,
    datasets,
   };
  },
  globalRunningEmps() {
   var $vm = this;
   var datasets = _.uniq(
    _.map($vm.$store.state.setup.machineActivities, "emp_id")
   );
   return {
    count: datasets.length,
    datasets,
   };
  },
  globalRunningOn() {
   var $vm = this;
   var datasets = _.filter(
    $vm.$store.state.setup.machineActivities,
    (x) => x.machine_active_status == "ON"
   );
   return {
    count: datasets.count,
    datasets,
   };
  },
  globalRunningOff() {
   var $vm = this;
   var datasets = _.filter(
    $vm.$store.state.setup.machineActivities,
    (x) => x.machine_active_status == "OFF"
   );
   return {
    count: datasets.length,
    datasets,
   };
  },
  globalPlannedStops() {
   var $vm = this;

   var datasets = _.filter(
    $vm.$store.state.setup.machineActivities,
    (x) => x.break_type == "PLANNED" && x.machine_active_status == "OFF"
   );
   return {
    count: datasets.length,
    datasets,
   };
  },

  globalDownTime() {
   var $vm = this;
   var arrangeOrderByTime = _.orderBy(
    $vm.$store.state.setup.machineActivities,
    ["machine_time"],
    ["asc"]
   );
   // console.log("arrangeOrderByTime",arrangeOrderByTime)

   var downTimes = [];
   for (var i = 0; i < arrangeOrderByTime.length; i++) {
    var object = arrangeOrderByTime[i];

    var next = i + 1;
    var objectNext = arrangeOrderByTime[next];
    //  console.log(object)
    //  console.log(objectNext)
    //  console.log(typeof objectNext!='undefined',object.break_type=='UNPLANNED',object.machine_active_status=='OFF')
    //  console.log(typeof objectNext!='undefined'&&object.break_type=='UNPLANNED'&&object.machine_active_status=='OFF')
    if (
     typeof objectNext != "undefined" &&
     object.break_type == "UNPLANNED" &&
     object.machine_active_status == "OFF"
    ) {
     downTimes.push({
      ...object,
      start_time: object.machine_time,
      end_time: objectNext.machine_time,
     });
    }
   }
   // console.log("downTimes",downTimes)
   var takenTime = _.reduce(
    downTimes,
    function (result, x) {
     // console.log()
     return (
      parseFloat(result) +
      parseFloat(
       moment
        .utc(moment(x.end_time, "HH:mm").diff(moment(x.start_time, "HH:mm")))
        .format("mm")
      )
     );
    },
    0
   );
   return {
    count: downTimes.length,
    datasets: downTimes,
    takenTime,
   };
  },
  globalUnPlannedStops() {
   var $vm = this;
   var datasets = _.filter(
    $vm.$store.state.setup.machineActivities,
    (x) => x.break_type == "UNPLANNED" && x.machine_active_status == "OFF"
   );
   return {
    count: datasets.length,
    datasets,
   };
  },
  globalMaxStroke() {
   var $vm = this;
   if ($vm.$store.state.setup.machineActivities.length != 0) {
    var result = _.maxBy(
     $vm.$store.state.setup.machineActivities,
     (x) => x.stroke
    );
    return {
     result: true,
     find: result,
     stroke: result.stroke,
    };
   }
   return {
    result: false,
    find: {},
    stroke: 0,
   };
  },

  guiTimeFormat() {
   var $vm = this;
   return (value) => {
    // console.log("currentTime",value)
    if (!value) return "-";

    return moment(String(value), $vm.$store.state.setup.bgTimeFormat).format(
     $vm.$store.state.setup.uiTimeFormat
    );
   };
  },
  guiDateFormat() {
   var $vm = this;
   return (value) => {
    return moment(String(value), $vm.$store.state.setup.bgDateFormat).format(
     $vm.$store.state.setup.uiDateFormat
    );
   };
  },
  //------------------mixin------
  globalBtnBgColor() {
   return this.$store.state.style.btnBgColor;
  },
  globalStyle() {
   return "color:" + this.$store.state.style.btnTxtColor;
  },
 },
});
