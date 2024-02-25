<template>
  {{ show_value}}
</template>


<script setup lang="ts">
  import {ref, watch} from "vue";
  // 父子接口
  const props = defineProps({
    name:  { type: String, default: 'None-name' },
    proto_type: { type: null, default: 'None-type' },
    data_store: { type: null , required: true},
    store_getter_key:{type:null,required:true},
  });

  const show_value = ref(props.data_store.getTargetParameter(props.store_getter_key));

  // props.data_store.getTargetCurrent(props.CardLabel),
  // watch(() => props.data_store.getTargetTemperature(props.CardLabel),
  //     (newVal, oldVal) => {
  //       this_current.value = newVal;
  //     }
  // );
  watch(() => props.data_store.getTargetParameter(props.store_getter_key),
      (newVal, oldVal) => {
        show_value.value = newVal;
      }
  );

</script>
<style scoped lang="scss">

</style>