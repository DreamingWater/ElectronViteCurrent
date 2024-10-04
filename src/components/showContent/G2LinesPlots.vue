<template>
  <div class="table-container">
    <div class="container_container">
      <div :id="`${name}-${proto_type}-g2linescontainer`" ref="chartContainer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { Line } from "@antv/g2plot";
import { onMounted ,ref} from "vue";
const chartContainer = ref(null);
const props = defineProps({
  name: { type: String, default: 'None-name' },
  proto_type: { type: null, default: 'None-type' },
  data_store: { type: null , required: true},
  store_target_key: { type: Array, required: true},
  store_target_ele_name:{type: Array, required: true},
});
// store_target_List_getter_key:{type:null,required:true},
// store_baseline_getter_key:{type:null,required:false},

const getData = () => {
  let formattedArray = props.store_target_key.flatMap((key, index) => {
    const data_list = props.data_store.getTargetParameter(key);
    const series_name = props.store_target_ele_name[index];
    return data_list.map((value, i) => ({
      index: (i + 1).toString(),
      value: value,
      series: series_name
    }));
  });
  return formattedArray;
}

onMounted(() => {
  const container = chartContainer.value;
  container.style.width = '100%';
  container.style.height = '250px';

  const linePlot = new Line(`${props.name}-${props.proto_type}-g2linescontainer`, {
    data: getData(),
    padding: 'auto',
    xField: 'index',
    yField: 'value',
    seriesField: 'series', // Specify the field for multiple lines
    height: 250,
    width: 550,
    forceFit: true,
    xAxis: {
      nice: true, // 设置 X 轴自动缩放
    },
    yAxis: {
      nice: true, // 设置 Y 轴自动缩放


    },
    point: {},
    legend: {
      position: 'top',
    },
  });
  linePlot.render();
  setInterval(() => {
    const updatedData = getData();
    const updatedMinValue = Math.min(...updatedData.map(d => d.value));
    const updatedMaxValue = Math.max(...updatedData.map(d => d.value));
    linePlot.update({
      data: updatedData,
      yAxis: {
        min: updatedMinValue,
        max: updatedMaxValue,
      },
    });
  }, 1500);
});
</script>

<style lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
}
.g2line_title {
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  color: #d39994;
  font-style: italic;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.container_container {
  margin: 5px auto;
}
</style>