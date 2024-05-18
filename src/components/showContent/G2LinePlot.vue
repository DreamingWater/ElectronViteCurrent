<template>
  <div class="table-container">
    <div class="g2line_title">Error changes chart</div>
    <div class="container_container">
      <div :id="`${name}-${proto_type}-g2container`"></div>
    </div>
  </div>

</template>

<script lang="ts" setup>
  // @ts-nocheck
  import { Line } from "@antv/g2plot";
  import { onMounted } from "vue";


  const props = defineProps({
    name: { type: String, default: 'None-name' },
    proto_type: { type: null, default: 'None-type' },
    data_store: { type: null , required: true},
    store_target_List_getter_key:{type:null,required:true},
    store_baseline_getter_key:{type:null,required:false},
  });
  const getData = ()=>{
    const target_list = props.data_store.getTargetParameter(props.store_target_List_getter_key);
    const baseline_value  = props.data_store.getTargetParameter(props.store_baseline_getter_key);
    let formattedArray = [] // 先清零数组
    for (let i = 0; i < target_list.length; i+=1) {
      formattedArray.push({
        index:(i + 1).toString(),
        // y: Math.random() + 0.2,
        // index: i + 1,
        value: target_list[i]-baseline_value,
      });
    }
    return formattedArray
  }

  onMounted(()=>{
    const linePlot = new Line(`${props.name}-${props.proto_type}-g2container`, {
      data:  getData(),
      padding: 'auto',
      xField: 'index',
      yField: 'value',
      height: 320,
      width: 550,
      forceFit: true,
      // seriesField: 'name',
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
      let formattedArray = getData();
      linePlot.changeData(formattedArray);

      // // 计算数据的极差
      // const values = formattedArray.map(item => item.value);
      // const maxValue = Math.max(...values);
      // const minValue = Math.min(...values);
      // const data_range = maxValue - minValue;
      // console.log(`${maxValue} - ${minValue} = data_range is ${data_range}`)

    }, 1500);
  });



</script>

<style lang="scss">
.table-container{
  display: flex;
  flex-direction: column;
}
.g2line_title{

  font-size: 18px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  color: #d39994;
  font-style: italic;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
.container_container{
  // height: 200px;
  // width: 600px;
  margin-top: 20px  !important;
  margin-left: 5px;
}
</style>