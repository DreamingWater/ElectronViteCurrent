<template>
  <canvas :id="`${childname}-line-container`"  width="400" height="200" ></canvas>
</template>
 
<script lang="ts" setup>

 import * as echarts from 'echarts';
 import { onMounted,ref, watch,watchEffect, toRefs } from 'vue';
 import { useTemCurStore } from "@/store/TenCurData";
  const store = useTemCurStore();       // store
 let myChart:any;
 const temperature = ref([20, 22, 23, 25, 26, 28, 30, 31, 29, 27, 25, 23]);
const MaxShowListLength = ref(200);   // 最大的显示数据长度


// 父子接口
const props = defineProps({
     childname: { type: String, default: true },
  });

const create_canvas= ()=>{
  const colors = ['#5470C6', '#EE6666'];
  const this_canvas_name = props.childname + '-line-container';
  var chartDom = document.getElementById(this_canvas_name);
  myChart = echarts.init(chartDom);
  var option;
  option = {
  color: colors,
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {},
  grid: {
    top: 70,
    bottom: 50
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              'Current Stability'
            );
          }
        }
      }
    },
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              'Temprature Stability'
            );
          }
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
    },
    {
      type: 'value',

    }
  ],
  series: [
    {
      name: 'Temprature Stability(℃)',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: []
    },
    {
      name: 'Current Stability(mA)',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: [
        13.9, 15.9, 118.7, 148.3, 169.2, 1231.6, 146.6, 155.4, 118.4, 110.3,
        10.7
      ]
    }
  ]
};

option && myChart.setOption(option);
}
// function set_temprature(){
//   // 假设有一个名为temperature的数组保存了新的温度数据
//   const temperature = [20, 22, 23, 25, 26, 28, 30, 31, 29, 27, 25, 23];
//     const this_tempratue_tmp = time.random
//   // 使用setOption方法更新图表数据
//     myChart.setOption({
//       series: [
//         {
//           // 根据series的name属性来确定要更新的数据系列
//           name: 'Temprature Stability(℃)',
//           data: temperature
//         }
//       ]
//     });
// }

function random_data(){
  const this_tempratue_tmp = Math.random() * 40 +10;
  temperature.value.push(this_tempratue_tmp);
  if(temperature.value.length > MaxShowListLength.value){
    temperature.value.shift();  // 当数据过多自动保留最新的MaxShowListLength的数据
  }
  myChart.setOption({
      series: [
        {
          // 根据series的name属性来确定要更新的数据系列
          name: 'Temprature Stability(℃)',
          data: temperature.value as []
        }
      ]
    });
}

onMounted(()=>{
create_canvas();
  // window.console.log('onmounted')
  // create_fake_data();
  // loadCanvasData();
  // setTimeout(() => {
  //   set_temprature();
  //         }, 5000);


  // setInterval(random_data,1000);
 })
//  const { childname } = toRefs(props);

// watchEffect(() => {
//   const ArrayNumber = store.getTargetArrayLength(childname.value);
//   myChart.setOption({
//       series: [
//         {
//           // 根据series的name属性来确定要更新的数据系列
//           name: 'Temprature Stability(℃)',
//           data: store.getTempratureArray(childname.value) as []
//         }
//       ]
//     });
// });

 watch(() => store.getTargetArrayLength(props.childname),
        (newVal, oldVal) => {
          if (myChart !== null && myChart !== undefined)
          {
            myChart.setOption({
            series: [
              {
                // 根据series的name属性来确定要更新的数据系列
                name: 'Temprature Stability(℃)',
                data: store.getTempratureArray(props.childname) as []
              }
            ]
          });
          } 
          }
      );
//  watch(() => store.getTempratureArray(props.childname),
//         (newVal, oldVal) => {
//           window.console.log('store changed in current array');
//           window.console.log(newVal);
          // myChart.setOption({
          //   series: [
          //     {
          //       // 根据series的name属性来确定要更新的数据系列
          //       name: 'Temprature Stability(℃)',
          //       data: newVal as []
          //     }
          //   ]
          // });
//           }
//       );
</script>
<style lang="scss" scoped>
</style>