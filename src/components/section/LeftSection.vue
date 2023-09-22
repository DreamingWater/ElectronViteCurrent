<template>
    <div class="messages-section">
        <div class="left-section-top">
            <DigitalClock />
        </div>
       <div class="left-section-middle">
            <p class="left-section-text">今天也要加油鸭</p>
       </div>
       <div class="left-section-bottom">
        <img src="@/assets/imgs/hurryup.png" class="ponggo-gif" />
       </div>
    </div>

      
</template>
<script setup> 
    import DigitalClock from "@/components/animation/DigitalClockView.vue";
</script>
<style lang="scss" scoped>
    
.messages-section {
  flex-shrink: 0;
  padding-bottom: 32px;
  background-color: var(--projects-section);
  margin-left: 24px;
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: relative;
  overflow: auto;
  transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);
}
.left-section-top{
    // height: 40%;
    margin-top: 20px;
    // margin-left: 10px;
}
.left-section-middle{
    display: flex;
    height: auto;
    p{
        color: rgb(211, 178, 178);
      
        font-style: italic;
        font-family:cursive;
        font-weight: bold;
   
        align-items: center;
        margin: 5px auto;
    }
}
.left-section-bottom {
    bottom: 0px;
    margin-bottom: 0px;
    // width: 100%;
    .ponggo-gif{
        margin: 5px auto;
        border-radius: 8px 8px;
        width: 100%;
       
    }
}

/* 大页面样式 */
@media (min-width: 1501px) {
.left-section-text{
    font-size: 30px;
}
.ponggo-gif{
    max-height: 270px;
}
}

@media (max-width: 1500px) {
    .left-section-text{
        font-size: 25px;
    }
    .ponggo-gif{
    max-height: 220px;
}
}

</style>