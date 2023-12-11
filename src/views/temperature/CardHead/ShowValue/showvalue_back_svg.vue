<template>
    <div class="container" :id="`${childname}-${property}-wrapper`">
      <div class="svg">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-v-ea893728="">
          <path fill="currentColor" d="M640 384v64H448a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h320a128 128 0 0 0 128-128V576a128 128 0 0 0-64-110.848V394.88c74.56 26.368 128 97.472 128 181.056v128a192 192 0 0 1-192 192H448a192 192 0 0 1-192-192V576a192 192 0 0 1 192-192h192z"></path>
          <path fill="currentColor" d="M384 640v-64h192a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128H256a128 128 0 0 0-128 128v128a128 128 0 0 0 64 110.848v70.272A192.064 192.064 0 0 1 64 448V320a192 192 0 0 1 192-192h320a192 192 0 0 1 192 192v128a192 192 0 0 1-192 192H384z">
          </path>
        </svg>
      </div>
      <div class="show-area">

        <div class="value">
          12.4
        </div>
        <div class="name">
          <span class="circle">
            <span class="name-text">{{ props.property }}</span>
          </span>
        </div>
      </div>
    </div>
  </template>


<script lang="ts" setup> 
    import { ref } from 'vue'
    const props = defineProps({
        childname: { type: String, default: 'Tec-One' },
        property: { type: String, default: 'TSV' },
    });

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid #000;
  padding: 16px;
  border-radius:5px;
}

.svg {
  margin-bottom: 16px;
}

.show-area {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
}

.name-text {
  color: #ee4d4d;
  font-size: 10px;
}

.value {
  font-size: 24px;
}
</style>