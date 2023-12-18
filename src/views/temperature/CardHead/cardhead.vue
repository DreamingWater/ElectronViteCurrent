<template>
    <div class="card-box-warpper">
            <ValueShow :childname="CardLabel" property="TPV" :value="TSV_Value"></ValueShow>
            <ValueShow :childname="CardLabel" property="TSV" :value="TPV_Value"></ValueShow>
            <CirlceButton />
        <!-- <div class="left-box"> -->

        <!-- </div> -->
        <!-- <div class="middle-box">
               <div class="status-box">
                <div class="status">
                    {{ working_status }}
                </div> 
            </div>
        </div> -->

    </div>
</template>
<script lang='ts' setup>
    import TemperatureShow from  '@/components/animation/TemperatureShow.vue'
    import CirlceButton from   './CircleButton/circlebutton.vue'
    import ValueShow from './ShowValue/showvalue.vue'
    import { ref,onMounted, watch } from 'vue'
    import { TemperatureShowValue, useTemperatureDataStore } from "@/store/TemperatureData";
    import { useTemperatureStore } from "@/store/Temperature";
    const temperature_setting_store = useTemperatureStore();       // store
    const temperature_data_store = useTemperatureDataStore(); // store
    const TSV_Value = ref(0);
    const TPV_Value = ref(0);
    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: true },
    });

    const show_temperature_value = ref(20); // 用于显示的温度

    watch(() => temperature_data_store.getTPVStatus(props.CardLabel),
        (newVal, oldVal) => {
            TSV_Value.value = newVal;
        }       
      );
    watch(() => temperature_setting_store.getTSVStatus(props.CardLabel),
    (newVal, oldVal) => {
        TPV_Value.value = newVal;
        console.log(`Tsv value updated as ${newVal}`)
    }       
    );
    onMounted(()=>{
        // 设置初始值
        TSV_Value.value = temperature_data_store.getTPVStatus(props.CardLabel);
        TPV_Value.value = temperature_setting_store.getTSVStatus(props.CardLabel);
    })

</script>

<style lang="scss" scoped>

    @charset "UTF-8";
    @import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
    .card-box-warpper {
        width: 100%;
        min-height: 100px;
        border-radius: 10px;
        border: dotted 1px rgb(211, 209, 209);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        justify-content: space-evenly;
    }
</style>

