<!--<template>-->
<!--  <select  v-model="selectedPort" required class="port_select">-->
<!--    <option v-for="port in portList" :value="port">{{ port }}</option>-->
<!--  </select>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--  // @ts-nocheck-->
<!--  import { ref, onMounted, watch,computed,unref } from 'vue';-->

<!--  const props = defineProps({-->
<!--    name: { type: String, default: 'None-name' },-->
<!--    proto_type: { type: null, default: 'None-type' },-->
<!--    data_store: { type: null , required: true},-->
<!--    store_target_key:{type:null,required:true},-->
<!--  });-->
<!--  -->
<!--  const portList= ref([]);  // replace with your actual port list-->
<!--  const selectedPort = ref('');-->
<!--  -->
<!--  watch(() => props.data_store.getTargetParameter(props.store_target_key),-->
<!--      (newVal, oldVal) => {-->
<!--       // 从store获取options数据-->
<!--        setValidPorts();-->
<!--        //设置默认选项-->
<!--        setDefaultPort();-->
<!--      }-->
<!--  );-->

<!--</script>-->



<!--<style scoped lang="scss">-->
<!--  .port_select {-->
<!--    height: 25px;-->
<!--    min-width: 80px;-->
<!--  }-->
<!--</style>-->