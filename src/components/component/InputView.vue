<template>
    <div class="cartWrap">
        <div class="controls">
        <a href="javascript:" class="mins" @click="minisValue">-</a>
        <div class="itxt">
            <input autocomplete="off" v-model="item_quantity" @change="onchangeSetValue" />
        </div>
        <a href="javascript:" class="plus" @click="plusValue">+</a>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import { ref,onMounted } from 'vue'
    import { useTemCurSetStore } from "@/store/TenCurSet";
    const store = useTemCurSetStore();       // store
      // 父子接口
      const props = defineProps({
      childname: {type:String, default:'Laser_One'},
      property:  {type:String, default:'current'},
    });

    let item_quantity = ref(1);


      //数量的表单元素的change回调
  function onchangeSetValue(e: any) {
    //通过event事件对象获取用户输入内容[用户输入的内容一定是字符串类型的数据]
    let value = e.target.value * 1;
    handleValue(value);
  }
  function minisValue() {
    handleValue(parseFloat(item_quantity.value)-0.01);
  }
  function plusValue() {
    handleValue(parseFloat(item_quantity.value)+0.01);
  }
  function handleValue(value: number) {
  //用户输入进来非法情况判断

    if (isNaN(value) || value < 0) {
      item_quantity.value = 0;
    } else {
      //正常情况
      item_quantity.value = parseFloat(value).toFixed(2); // 两位小数
    }
    // 更新数据到pinia中
    switch (props.property) {
        case 'current':
            store.SetTempratureCurrentValue(props.childname, undefined, item_quantity.value as number);
            break;
        case 'temprature':
            store.SetTempratureCurrentValue(props.childname, item_quantity.value as number, undefined);
            break;
        default:
            // 未知的消息类型
            break;
    }  
    
  }
   onMounted(()=>{
    const this_value:number = store.getTemCurValue(props.childname, props.property); //默认值
    item_quantity.value = this_value;    // 更新到显示
   })

 </script>


<style lang="scss">
 .cartWrap {
            border-radius: 2px 2px;
            border:1px solid #666;
              display: flex;
              align-items: center;
              .controls {

                //margin-top: 10px;
                //margin-bottom: 10px;
                border: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                height: 100%;
                .itxt {
                  align-items: center;
                  width: 60px;
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
                .plus,
                .mins {
                  width: 30px;
                  height: 100%;
                  color: #e69f9f;
                  cursor: pointer;
                  display: flex;
                  font-size: 24px;
                  align-items: center;
                  justify-content: center;
                //   font-weight: bold;
                }
              }
            }
</style>