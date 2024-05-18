<template>
  <div class="project-box-wrapper">
    <div class="section_card">
      <ShowInput
          v-for="(item, index) in shown_setting_power_wavelength"
          :key="index"
          :name="item.name"
          :data_store="seed_purchased_store"
          :show_data="item.show_data"
          :set_data="item.set_data"
          :max_value="item.max_value"
          :min_value="item.min_value"
          :precision="item.precision"
      />
      <div class="card-button">
        <SendAirPlane :name="name" proto_type='send-button' :module_name="module_name" :data_store="seed_purchased_store" :data_package="packaged_setting_power_wavelength"/>
      </div>
    </div>
  </div>
</template>


<script lang='ts' setup>
  // @ts-nocheck
  import { ref } from 'vue' ;
  import SendAirPlane from "@/components/ButtonContent/SendAirPlane.vue";
  import ShowInput from "@/components/Items/ShowInput.vue";
  import { shown_setting_power_wavelength, packaged_setting_power_wavelength} from '@/views/seedPurchased/setParams'

  import { useSeedPurchasedStore } from "@/store/seedPurchased";
    const seed_purchased_store = useSeedPurchasedStore();       // store


  const props = defineProps({
    module_name: { type: null, required: true },
    name: { type: String, default: 'none-Name' },
  });



</script>

<style lang="scss" scoped>

  @charset "UTF-8";

  button, a {
    cursor: pointer;
  }
  .project-box-wrapper {
    margin: 5px;
    padding: 20px 5px;
    transition: 0.2s;
    .section_card{

      margin: 5px;
      padding: 10px 5px;
      border-radius: 5px;
      background-color: #f0f8ff;
      .card-item-input {
        margin-top: 5px;
        background-color: #f0f8f8;
        padding: 5px 5px;
        border-radius: 3px;
        align-items: center;
        justify-content: space-between;

        display: flex;
        .title{
          font-size: 16px;
          color: rgb(250, 138, 138);
          justify-content: center;
          text-align: center;

        }
        .current_value{
          font-size: 12px;
          font-family: 'Courier New', Courier, monospace;
          font-style: italic;
        }
        .value{
          margin-left: 10px;
        }

      }

      .card-button{
        margin-top: 45px;
      }
    }
  }
</style>

