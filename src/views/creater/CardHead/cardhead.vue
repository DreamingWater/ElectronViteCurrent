<template>
    <div class="card-box-warpper">
            <ValueShow :childname="CardLabel" property="Reg" :value="Register_Value"></ValueShow>
            <ValueShow :childname="CardLabel" property="Vol" :value="Voltage_Value"></ValueShow>
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

    import CirlceButton from   './CircleButton/circlebutton.vue'
    import ValueShow from '@/components/animation/Ringvalue.vue'
    import { ref,onMounted, watch } from 'vue'
    import { OscillatorDataState, useOscillatorDataStore } from "@/store/CreaterData";
    const oscillator_data_store = useOscillatorDataStore(); // store
    const Register_Value = ref(0);
    const Voltage_Value = ref(0);
    // 父子接口
    const props = defineProps({
      CardLabel: { type: String, default: 'Creater' },
    });



    watch(() => oscillator_data_store.getVoltageStatus(props.CardLabel),
        (newVal, oldVal) => {
            Voltage_Value.value = newVal;
        }       
      );
    watch(() => oscillator_data_store.getResistanceStatus(props.CardLabel),
    (newVal, oldVal) => {
        Register_Value.value = newVal;
    }       
    );
    onMounted(()=>{
        // 设置初始值
        Register_Value.value = oscillator_data_store.getResistanceStatus(props.CardLabel);
        Voltage_Value.value = oscillator_data_store.getVoltageStatus(props.CardLabel);
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

