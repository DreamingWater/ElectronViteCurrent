<template>
  <div class="cartWrap">
    <div class="controls">
      <div class="cartwrapmins">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="" @click="minisValue"><path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"></path></svg>
      </div>
      <div class="itxt">
        <input autocomplete="off" v-model="item_quantity" @change="onchangeSetValue" :disabled="isDisabled"/>
      </div>
      <div class="cartwrapplus">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""  @click="plusValue" :disabled="isDisabled">
          <path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path>
        </svg>
      </div>
      <!-- <a href="javascript:" class="cartwrapplus" @click="plusValue" :disabled="isDisabled"></a> -->
    </div>
  </div>
</template>


<script lang="ts" setup>
// @ts-nocheck
import {reactive, ref, onMounted} from 'vue'

// 父子接口
    const props = defineProps({
      name: {type:String, default:'None-name'},
      data_store: { type: null , required: true},
      store_setting_key:{type:null,required:true},
      store_getter_key:{type:null,required:true},

      proto_type: { type: null, default: 'None-type' },
      step: {type:Number, default:1          },
      disabled: {type:Boolean, default:false },
      precision: {type:Number, default:2     },
      min_value: {type:Number, default:0     },
      max_value: {type:Number, default:100   },
    });

    let item_quantity = ref(0);   // 显示的数值
    const isDisabled = ref(props.disabled); // 是否失能整个部分
    const minis_tune_range = ref(props.step); // 调节步长
    const search_key = reactive(props.store_setting_key);
    //数量的表单元素的change回调
    function onchangeSetValue(e: any) {
      //通过event事件对象获取用户输入内容[用户输入的内容一定是字符串类型的数据]
      let value = e.target.value * 1;
      handleValue(value);
    }
    function minisValue() {
      handleValue(parseFloat(item_quantity.value)-parseFloat(minis_tune_range.value));
    }
    function plusValue() {
      handleValue(parseFloat(item_quantity.value)+parseFloat(minis_tune_range.value));
    }
    function handleValue(value: number) {
      //用户输入进来非法情况判断
      if(isDisabled.value == true){
        return;
      }
      if(value < props.min_value){
        value = props.min_value;
      }
      else if(value > props.max_value){
        value = props.max_value;
      }
        //正常情况
        item_quantity.value = value;
        // 更新数据到pinia中
        save_data_2_store();
    }

    function save_data_2_store(){
      // if(!search_key.value.hasOwnProperty('this_statement')){
      //   console.log('No this_statement as key in store_setting_key')
      // }

      search_key.value = parseFloat(item_quantity.value.toFixed(props.precision)) ;// // 两位小数;)
      console.log(search_key)
      props.data_store.setTargetParameter(search_key);
    }

    onMounted(()=>{
       item_quantity.value = props.data_store.getTargetParameter(props.store_getter_key);
    })


</script>


<style lang="scss" scoped>
.cartWrap {
  border-radius: 3px;
  border:1px solid #b86171;
  display: flex;
  align-items: center;
  .controls {
    font-size: 25px;

    align-items: center;
    //margin-top: 10px;
    //margin-bottom: 10px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .itxt {
      align-items: center;
      width: 120px;

      //border: 1px solid #ddd;
      color: #555;
      text-align: center;
      //font-size: 30px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        text-align: center;


      }
    }
    .cartwrapplus  {
      margin-left: 5px;
      margin-right: 10px;
      width: 30px;
      height: 100%;
      color: #e69f9f;
      // cursor: pointer;
      display: flex;
      font-size: 24px;
      align-items: center;
      justify-content: center;
      //   font-weight: bold;

    }
    .cartwrapmins {
      margin-left: 5px;
      margin-right: 5px;
      width: 30px;
      height: 100%;
      color: #e69f9f;
      // cursor: pointer;
      display: flex;
      font-size: 24px;
      align-items: center;
      justify-content: center;
      //   font-weight: bold;

    }
  }
}
</style>