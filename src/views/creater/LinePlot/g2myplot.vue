<template>
    <div id="container_container">
        <div id="g2container"></div>
    </div>

</template>

<script lang="ts" setup>
// @ts-nocheck
    import { Line } from "@antv/g2plot";
    import { onMounted } from "vue"; 

    import { OscillatorDataState, useOscillatorDataStore } from "@/store/CreaterData";
    
    const store = useOscillatorDataStore(); // store
 
    const props = defineProps({
          childname: { type: String, default: true },
        });
   const getData = ()=>{
    const Voltage_list = store.getVoltageList(props.childname);
    let formattedArray = [] // 先清零数组
    // const min_value = Math.min(Voltage_list);
    for (let i = 0; i < Voltage_list.length; i+=1) {

      formattedArray.push({
        index:(i + 1).toString(),
        // y: Math.random() + 0.2,
        // index: i + 1,
        value: Voltage_list[i],
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