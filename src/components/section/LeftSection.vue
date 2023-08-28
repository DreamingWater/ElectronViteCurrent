<template>
    <div class="messages-section">
        <div class="left-section-top">
            <DigitalClock />
        </div>
       <div class="left-section-middle">
            <p>Read more, Try more, Receive more.</p>
       </div>
       <div class="left-section-bottom">
        <img src="@/assets/animation/ponggo-cat.gif" class="ponggo-gif" />
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
    margin-top: 20px;
    // margin-left: 10px;
}
.left-section-middle{
    display: flex;
    height: auto;
    p{
        color: red;
        font-size: large;
        font-style: italic;
        align-items: center;
        margin: 5px auto;
    }
}
.left-section-bottom {
    bottom: 0px;
    width: 100%;
    .ponggo-gif{
        border-radius: 8px 8px;
        width: 100%;
    }
}
</style>