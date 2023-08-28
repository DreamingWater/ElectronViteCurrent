<template>
    <div class="window-footer">
      <!-- 软件logo预留位置 -->
        <div class="designer">
            Designer
        </div>
    </div>
  </template>
  
  <script setup lang="ts">

  </script>
  
  <style rel="stylesheet/scss" lang="scss" scoped>
    .window-footer {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: block;
    position: relative;
    }

    .designer {
    position: absolute;
    right: 10px;
    color: red;
    font-weight: bold;
    font-style: italic;
    }
  </style>
  