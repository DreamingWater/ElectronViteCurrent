<template>
    <div class="window-footer">
      <!-- 软件logo预留位置 -->
        <div class="designer">
            Designed by 大设施研究院
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    
  </script>
  
  <style rel="stylesheet/scss" lang="scss" scoped>
      .window-footer {
        width: 100%;
        height: 30px;
        background-color: #eaeeef;
        display: block;
        position: relative;
        border-radius: 2px 2px;
      }

      .designer {
        position: absolute;
        right: 10px;
        color: red;
        font-weight: bold;
        font-style: italic;
        font-family:'lemon';
      }
  </style>
  