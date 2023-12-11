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
    import { ref,onMounted,watch } from 'vue'


      // 父子接口
    const props = defineProps({
      childname: {type:String, default:'Tec_One'},
      property:  {type:String},
    });

    let item_quantity = ref(0);   // 显示的数值
    const isDisabled = ref(false); // 是否失能整个部分
    const minis_tune_range = ref(1); // 调节步长
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
        window.console.log(isDisabled.value)
        return;
      }
      if (isNaN(value) || value < 0) {
        item_quantity.value = 0;
      } else {
        //正常情况
        item_quantity.value = parseFloat(value).toFixed(2); // 两位小数
      }
      // 更新数据到pinia中
      localStorage.setItem(`${props.childname}-${props.property}`,item_quantity.value as number);
    }

    
 </script>


<style lang="scss" scoped>
 .cartWrap {
            border-radius: 3px;
            border:1px solid #b86171;
              display: flex;
              align-items: center;
              .controls {
                font-size: 12px;

                align-items: center;
                //margin-top: 10px;
                //margin-bottom: 10px;
                border: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                height: 100%;
                .itxt {
                  align-items: center;
                  width: 40px;
         
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
                  margin-left: 3px;
                  margin-right: 5px;
                  width: 16px;
                  height: 100%;
                  color: #e69f9f;
                  // cursor: pointer;
                  display: flex;
                  font-size: 16px;
                  align-items: center;
                  justify-content: center;
                //   font-weight: bold;
        
                }
                .cartwrapmins {
                  margin-left: 3px;
                  margin-right: 5px;
                  width: 16px;
                  height: 100%;
                  color: #e69f9f;
                  // cursor: pointer;
                  display: flex;
                  font-size: 16px;
                  align-items: center;
                  justify-content: center;
                //   font-weight: bold;
        
                }
              }
            }
</style>