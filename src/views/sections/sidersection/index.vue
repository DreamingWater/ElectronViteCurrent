<template>
    <!-- <circlewave /> -->
    <div class="app-sidebar">
        <a href="" class="app-sidebar-link active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" /></svg>
        </a>
        <!-- <a href="" class="app-sidebar-link active"> -->
          <router-link to="/serial" class="app-sidebar-link active"> 
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-v-ea893728="">
            <path fill="currentColor" d="M640 384v64H448a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h320a128 128 0 0 0 128-128V576a128 128 0 0 0-64-110.848V394.88c74.56 26.368 128 97.472 128 181.056v128a192 192 0 0 1-192 192H448a192 192 0 0 1-192-192V576a192 192 0 0 1 192-192h192z"></path><path fill="currentColor" d="M384 640v-64h192a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128H256a128 128 0 0 0-128 128v128a128 128 0 0 0 64 110.848v70.272A192.064 192.064 0 0 1 64 448V320a192 192 0 0 1 192-192h320a192 192 0 0 1 192 192v128a192 192 0 0 1-192 192H384z">
            </path>
          </svg>
        </router-link>
        <!-- </a> -->
    </div>
</template>
  
  <script lang="ts" setup>
    import circlewave from '@/components/animation/circlewave.vue';
  </script>
  
  <style rel="stylesheet/scss" lang="scss" scoped>
.app-sidebar {
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app-sidebar-link {
  color: var(--main-color);
  color: var(--link-color);
  margin: 16px 0;
  transition: 0.2s;
  border-radius: 50%;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-sidebar-link:hover {
  background-color: var(--link-color-hover);
  color: var(--link-color-active);
}
.app-sidebar-link.active {
  background-color: var(--link-color-active-bg);
  color: var(--link-color-active);
}
  </style>
  