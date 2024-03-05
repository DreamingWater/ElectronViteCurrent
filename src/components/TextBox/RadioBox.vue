<template>
  <div class="container">
    <div class="tabs">
      <input
          type="radio"
          v-for="(item, index) in radioList"
          :key="index"
          :id="`${name}-radio-${index+1}`"
          :value="valueList[index]"
          v-model="checked_value"
          name="tabs"
      >
      <label
          class="tab"
          v-for="(item, index) in radioList"
          :key="index"
          :for="`${name}-radio-${index+1}`"
      >
        {{ item }}
      </label>
      <span class="glider"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch, onMounted, reactive} from 'vue'

  const props = defineProps({
    name: {type: String, default: 'None-name'},
    data_store: {type: null, required: true},
    store_setting_key: {type: null, required: true},
    store_getter_key: {type: null, required: true},

    radioList:{type:Array, default:['制冷', '双向', '制热']},
    valueList:{type:Array, default:[2,0,1]},// 0 双向； 1 制热；2 单制冷
  })
  const search_key = props.store_setting_key;
  const checked_value = ref(props.data_store.getTargetParameter(props.store_getter_key));
  // const radioCount:number = ref(3);  // 输入框的数量
  watch(checked_value, (newValue) => {
    search_key.value = newValue;
    props.data_store.setTargetParameter(search_key);
  });
</script>

<style scoped lang="scss">
$radioCount : 3;
  .tabs {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    padding: 0.25rem;
    border-radius: 99px;
  }

  .tabs * {
    z-index: 2;
  }

  .container input[type="radio"] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    font-size: .8rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
  }



  .container input[type="radio"]:checked + label {
    color: #185ee0;
  }

  .container input[type="radio"]:checked + label > .notification {
    background-color: #185ee0;
    color: #fff;
    margin: 0px;
  }



@for $i from 1 through $radioCount {
  .container input[type="radio"]:nth-child(#{$i}):checked ~ .glider {
    transform: translateX((100%)*($i - 1));
  }
}

//@for $i from 1 through var(--radioCount) {
//  .container input[type="radio"]:nth-child(#{$i}):checked ~ .glider {
//    transform: translateX((100%)*($i - 1));
//  }
//}
  .glider {
    position: absolute;
    display: flex;
    height: 30px;
    width: 50px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
  }

  @media (max-width: 700px) {

    .tabs {
      transform: scale(0.6);
    }
  }

</style>