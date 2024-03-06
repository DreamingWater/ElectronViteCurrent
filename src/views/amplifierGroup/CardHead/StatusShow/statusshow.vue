<template>
  {{ working_status }}
</template>

<script setup lang="ts">

// @ts-nocheck
    import {ref, watch,onMounted} from "vue";
    const StatusArray = ['Perfect well' , 'An Error Check!!!']
    const working_status = ref('')

    const props = defineProps({
      name: { type: String, default: 'None-name' },
      data_store: { type: null , required: true},
      store_getter_key: { type: null, required: true },
    });

    const transform_status = (status_value:number)=>{
      if(status_value!== 0 ){
         return StatusArray[1];
      }
      else if(status_value === 0){
        return  StatusArray[0];
      }
    };
    onMounted(()=>{
      const status_value:number = props.data_store.getTargetParameter(props.store_getter_key);
      working_status.value = transform_status(status_value);
    });

    // 监听status参数，如果不为正常就显示错误，具体错误我不管
    watch(() => props.data_store.getTargetParameter(props.store_getter_key),
        (newVal, oldVal) => {
          working_status.value =  transform_status(newVal);
    });


</script>



<style scoped lang="scss">

</style>