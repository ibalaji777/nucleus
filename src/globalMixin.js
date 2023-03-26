/*eslint-disable*/
import Vue from "vue";
import moment from "moment";
import _ from "lodash";
import store from "../src/store/index.js";
import state from "../src/store/state.js";
import * as oeeCore from "../src/core/oeeCore.js";
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
  global_errors() {
   var $vm = this;
   let messages = [];
   if ($vm.$store.state.setup.checkMachine)
    messages.push("Machine Not Started");
   if ($vm.$store.state.setup.selected_product.id)
    messages.push("Select Product Before Start Machine");
   if ($vm.$store.state.setup.selected_employee.id)
    messages.push("Choose Machine Operator");
   if ($vm.$store.state.db.products.length == 0)
    messages.push("Products List is Empty add atleast single product");
   if ($vm.$store.state.db.shifts.length == 0)
    messages.push("Products List is Empty add atleast single product");

   return { count: messages.length, list: messages };
  },

  guiTimeFormat() {
   var $vm = this;
   return (value) => {
    // console.log("currentTime",value)
    if (!value) return "-";

    return moment(
     String(value),
     $vm.$store.state.setup.bgDateTimeFormat
    ).format($vm.$store.state.setup.uiTimeFormat);
   };
  },
  guiDateFormat() {
   var $vm = this;
   return (value) => {
    return moment(String(value)).format($vm.$store.state.setup.uiDateFormat);
   };
  },
  globalBtnBgColor() {
   return this.$store.state.style.btnBgColor;
  },
  globalStyle() {
   return "color:" + this.$store.state.style.btnTxtColor;
  },
  global_products() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   var datasets = _.uniq(_.map(history, "product_id"));
   console.log(datasets, "global_products");
   return {
    count: datasets.length,
    datasets,
   };
  },
  global_shifts() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   var datasets = _.uniq(_.map(history, "shift"));
   return {
    count: datasets.length,
    datasets,
   };
  },

  global_timeChart() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let log = $vm.$store.state.machineData.machineLog;
   let runnedData = _.map(history, (x) => ({
    x: [moment(x.start_time), moment(x.end_time)],
    y: 0,
    label: x.operation,
    count: x.stroke,
   }));
   return {
    start_time: log.start_time,
    end_time: log.end_time,
    chartData: {
     datasets: [
      {
       data: runnedData,
       label: _.map(history, (x) => x.operation),
       backgroundColor: _.map(history, (x) =>
        x.machine_status == state.defaultData.machine_status_off
         ? "red"
         : "green"
       ),
      },
     ],
    },
   };
  },
  global_total_machine_history() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let runnedData = _.filter(
    history,
    (x) => x.operation == state.defaultData.operation_machine
   );
   let seconds = _.sumBy(runnedData, (x) => parseFloat(x.duration || 0));
   return {
    list: runnedData,
    seconds,
    minutes: $vm.globalScToMin(seconds),
   };
  },
  global_total_downtime() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let runnedData = _.filter(
    history,
    (x) => x.machine_status == state.defaultData.machine_status_off
   );
   let seconds = _.sumBy(runnedData, (x) => parseFloat(x.duration || 0));
   return {
    list: runnedData,
    seconds,
    minutes: $vm.globalScToMin(seconds),
   };
  },

  global_total_breaks() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let runnedData = _.filter(
    history,
    (x) => x.operation == state.defaultData.operation_break
   );
   let seconds = _.sumBy(runnedData, (x) => parseFloat(x.duration || 0));
   return {
    list: runnedData,
    seconds,
    minutes: $vm.globalScToMin(seconds),
   };
  },
  global_actual_stroke_count() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let log = $vm.$store.state.machineData.machineLog;

   let stroke = _.sumBy(history, (x) => parseFloat(x.stroke || 0));

   return {
    stroke,
    actual_count: parseFloat(stroke) * parseFloat(log.pieces_per_stroke || 1),
   };
  },
  global_total_shedule() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let runnedData = _.filter(
    history,
    (x) => x.operation == state.defaultData.operation_shedule
   );
   let seconds = _.sumBy(runnedData, (x) => parseFloat(x.duration || 0));
   return {
    list: runnedData,
    seconds,
    minutes: $vm.globalScToMin(seconds),
   };
  },

  globalMachineLive() {
   return this.$store.state.setup.machineLiveData;
  },
  global_plannedTime() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let runnedData = _.filter(
    history,
    (x) => x.operation != state.defaultData.operation_break
   );

   let seconds = _.sumBy(runnedData, (x) => parseFloat(x.duration || 0));
   return {
    seconds,
    minutes: $vm.globalScToMin(seconds),
   };
  },
  global_availibilty() {
   let runTimeMin = this.global_runTime.minutes;
   let plannedTimeMin = this.global_plannedTime.minutes;
   return parseFloat(
    (parseFloat(runTimeMin) / parseFloat(plannedTimeMin)) * 100 || 0
   ).toFixed(2);
  },
  global_performance() {
   var $vm = this;
   let runTimeMin = this.global_runTime.minutes;
   let actualProductionCount =
    $vm.$store.state.machineData.machineLog.actual_count;
   let piaceForMinute = $vm.$store.state.machineData.machineLog.pieces_per_min;
   let theoretical = parseFloat(runTimeMin) * parseFloat(piaceForMinute);
   return parseFloat(
    (parseFloat(actualProductionCount) / parseFloat(theoretical)) * 100 || 0
   ).toFixed(2);
  },
  global_quality() {
   var $vm = this;
   let actualProductionCount =
    $vm.$store.state.machineData.machineLog.actual_count;
   let rejected_count = $vm.$store.state.machineData.machineLog.rejected_count;

   let goodProduct =
    parseFloat(actualProductionCount) - parseFloat(rejected_count);
   return (
    (parseFloat(goodProduct) / parseFloat(actualProductionCount)) * 100 || 0
   ).toFixed(2);
  },
  global_oee() {
   var $vm = this;
   return (
    parseFloat($vm.global_availibilty) *
    parseFloat($vm.global_performance) *
    parseFloat($vm.global_quality)
   );
  },

  global_runTime() {
   return this.globalMachineOnDuration;
  },
  globalMachineOnDuration() {
   var $vm = this;
   let history = $vm.$store.state.machineData.machineHisotry;
   let runnedData = _.filter(
    history,
    (x) => x.machine_status == state.defaultData.machine_status_on
   );

   let seconds = _.sumBy(runnedData, (x) => parseFloat(x.duration || 0));
   return {
    seconds,
    minutes: $vm.globalScToMin(seconds),
   };
  },
  globalScToMin() {
   return (value) => {
    if (value == "") return 0;
    const duration = moment.duration(value, "seconds");
    const minutes = duration.asMinutes();
    return minutes;
   };
  },
  globalScToHrs() {
   return (seconds) => {
    if (seconds == "") return 0;
    const duration = moment.duration(seconds, "seconds");
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
   };
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
  // globalUnPlannedStops() {
  //  var $vm = this;
  //  var datasets = _.filter(
  //   $vm.$store.state.setup.machineActivities,
  //   (x) => x.break_type == "UNPLANNED" && x.machine_active_status == "OFF"
  //  );
  //  return {
  //   count: datasets.length,
  //   datasets,
  //  };
  // },
  // globalMaxStroke() {
  //  var $vm = this;
  //  if ($vm.$store.state.setup.machineActivities.length != 0) {
  //   var result = _.maxBy(
  //    $vm.$store.state.setup.machineActivities,
  //    (x) => x.stroke
  //   );
  //   return {
  //    result: true,
  //    find: result,
  //    stroke: result.stroke,
  //   };
  //  }
  //  return {
  //   result: false,
  //   find: {},
  //   stroke: 0,
  //  };
  // },

  //------------------mixin------
  // globalBreaks() {
  //  var $vm = this;
  //  let list = _.filter(
  //   $vm.$store.state.machineData.machineHisotry,
  //   function (x) {
  //    return x.operation == "break";
  //   }
  //  );
  //  return {
  //   count: list.length,
  //   list,
  //  };
  // },
 },
});
