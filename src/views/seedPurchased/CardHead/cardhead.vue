
<template>
  <div class="card-box-warpper">
    <TemperatureCard :data_store="seed_purchased_store" :store_getter_key="show_seed_purchased_temperature_seed" />
    <LigerCard :data_store="seed_purchased_store" :store_getter_key="show_seed_purchased_working_status" :name="name"   />
    <EnableOff :module_name="module_name" :name="name" :data_store="seed_purchased_store" :data_package="send_data_package" :store_key="enable_status"/>
  </div>
</template>
<script lang='ts' setup>
    // @ts-nocheck
    import TemperatureCard from "@/components/showContent/TemperatureCard.vue";
    import EnableOff from "@/components/ButtonContent/EnableOff.vue";
    import LigerCard from "@/components/showContent/ligerCard.vue";
    import { ref,onMounted, watch } from 'vue'

    // 父子接口
    const props = defineProps({
      module_name: { type: null, required: true },
      name: { type: String, default: 'None-name' },
    });

    import { useSeedPurchasedStore } from "@/store/seedPurchased";
    import {  SeedPurchasedSettingDataModel,SeedPurchasedGettingDataModel } from '@/types/seedPurchased';

    const seed_purchased_store = useSeedPurchasedStore();       // store


    const show_seed_purchased_temperature_seed:SeedPurchasedGettingDataModel = {
      data_type: 'TemperatureSeed',
    }
    const show_seed_purchased_working_status:SeedPurchasedGettingDataModel = {
      data_type: 'WorkingStatus',
    }
    const enable_status:SeedPurchasedSettingDataModel = {
      data_type: 'EnableStatus',
      value:1,
    }

    const send_data_package = ref([]); // 发送的数据包
</script>

<style lang="scss" scoped>

@charset "UTF-8";
.card-box-warpper {
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  border: dotted 1px rgb(211, 209, 209);
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-content: space-around;
}
</style>



