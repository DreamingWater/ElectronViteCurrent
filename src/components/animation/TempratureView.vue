<template>
 <div :id="`${childname}-temprature-container`" class="temprature-container"></div>
</template>

<script  setup>
    import * as echarts from 'echarts';
    import { onMounted, watch } from 'vue';
    import { useTemCurStore } from "@/store/TenCurData";
      // 父子接口
const props = defineProps({
  childname: { type: String, default: 'Laser_One' },
  temperature_value: { type: Number, default: 0 },
});
    const Min_value = 0;  // 最小值
    const Max_value = 60;  // 最大值
    const store = useTemCurStore();       // store
    let myChart;
    onMounted (()=>{
    const this_canvas_name = props.childname + '-temprature-container';
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
// // Assuming you have a store instance called `store`
// watch(() => store.getTargetObject('someName'), (newValue, oldValue) => {
//   // This callback function will be called whenever the value of `getTargetObject` changes
//   console.log('New value:', newValue);
//   console.log('Old value:', oldValue);
// });
  watch(() => store.getLatestTemprature(props.childname),
        (newVal, oldVal) => {
          window.console.log('store changed in temprature');
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
    // watch(() => props.temperature_value,
    //   (newVal, oldVal) => {
    //     series: [
    //           {
    //             data: [
    //               {
    //                 value: props.temperature_value
    //               }
    //             ]
    //           },
    //           {
    //             data: [
    //               {
    //                 value: props.temperature_value
    //               }
    //             ]
    //           }
    //         ]
    //       }
    // );




</script>

<style lang="scss" scoped>
    $height: 150px;
    $width: 150px;
    .temprature-container{
        height:$height;
        width: $width;
    }
</style>