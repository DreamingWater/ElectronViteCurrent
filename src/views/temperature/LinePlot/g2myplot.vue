<template>
    <div id="container_container">
        <div id="g2container"></div>
    </div>

</template>

<script lang="ts" setup>
// @ts-nocheck
    import { Line } from "@antv/g2plot";
    import { onMounted } from "vue"; 
    import { TemperatureShowValue, useTemperatureDataStore } from "@/store/TemperatureData";
    import { useTemperatureStore } from "@/store/Temperature";

    const store = useTemperatureDataStore(); // store
    const temperature_setting_store = useTemperatureStore();
    const props = defineProps({
          childname: { type: String, default: true },
        });
   const getData = ()=>{
    const TPV_list = store.getTPVList(props.childname);
    const this_tsv  = temperature_setting_store.getTSVStatus(props.childname);
    // const TPV_list_length = TPV_list.
    let formattedArray = [] // 先清零数组
    for (let i = 0; i < TPV_list.length; i+=1) {

      formattedArray.push({
        index:(i + 1).toString(),
        // y: Math.random() + 0.2,
        // index: i + 1,
        value: TPV_list[i]-this_tsv,
      });
    }
    return formattedArray
   }

    onMounted(()=>{
                  const linePlot = new Line('g2container', {
                        data:  getData(),
                        padding: 'auto',
                        xField: 'index',
                        yField: 'value',
                        height: 320,
                        width: 500,
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

                  }, 1000);
        });

  

</script>

<style lang="scss">
    #container_container{
        // height: 200px;
        // width: 600px;
        margin-top: 20px  !important;
        margin-left: 5px;
    }
</style>