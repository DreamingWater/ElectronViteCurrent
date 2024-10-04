<template>
  <div :id="`${name}-temprature-container`" class="temprature-container"></div>
</template>

<script  setup>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

// 父子接口
const props = defineProps({
  name:  { type: String, default: 'None-name' },
  proto_type: { type: null, default: 'None-type' },
  data_store: { type: null , required: true},
  store_getter_key:{type:null,required:true},
});

const Min_value = 0;  // 最小值
const Max_value = 60;  // 最大值

let myChart;
onMounted (()=>{
  const this_canvas_name = props.name + '-temprature-container';
  var dom = document.getElementById(this_canvas_name);
  myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};

  var option;
  option = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: Min_value,
        max: Max_value,
        splitNumber:10,
        itemStyle: {
          color: '#FFAB91',
        },
        progress: {
          show: true,
          width: 10
        },

        pointer: {
          show: true
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          distance: -12,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -5,
          length: 1,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -10,
          color: '#999',
          fontSize: 12
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 10,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 20,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
        data: [
          {
            value: 20
          }
        ]
      },

      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: Min_value,
        max: Max_value,
        itemStyle: {
          color: '#FD7347'
        },
        progress: {
          show: true,
          width: 8
        },

        pointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: 20
          }
        ]
      }
    ]
  };
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
})

// name:  { type: String, default: 'None-name' },
// proto_type: { type: null, default: 'None-type' },
// data_store: { type: null , required: true},
// store_getter_key:{type:null,required:true},

watch(() => props.data_store.getTargetParameter(props.store_getter_key),
    (newVal, oldVal) => {
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: newVal
              }
            ]
          },
          {
            data: [
              {
                value: newVal
              }
            ]
          }
        ]
      });
    }
);

</script>

<style lang="scss" scoped>
$height: 150px;
$width: 150px;
.temprature-container{
  height:$height;
  width: $width;
}
</style>