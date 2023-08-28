<template>
    <!-- <div class="mycomponents"> -->
      <div class="circle">
      <span class="circle__btn">
        <ion-icon class="pause" name="pause"></ion-icon>
        <ion-icon class="play" name="play"></ion-icon>
      </span>
      <span class="circle__back-1"></span>
      <span class="circle__back-2"></span>
    </div>
  <!-- </div> -->
</template>

<script setup>
    import { circleWaveAnimation } from './circlewave'
    import { onMounted } from 'vue';
    onMounted(()=>{
        console.log('onmountd');
        circleWaveAnimation();
    })
</script>


<style scoped lang="scss">
$primary-light: #8abdff;
$primary: #6d5dfc;
$primary-dark: #5b0eeb;
$white: #FFFFFF;
$greyLight-1: #E4EBF5;
$greyLight-2: #c8d0e7;
$greyLight-3: #bec8e4;
$greyDark: #9baacf;

$circle-width: 1.8rem;
$circle-height: 1.8rem;
$circle-btn-width: 1.8rem;
$circle-btn-height: 1.8rem;
$circle-btn-font-size: 2rem;

/* PLAY BUTTON */
.circle {
  grid-column: 2/3;
  grid-row: 4/6;
  width: $circle-width;
  height: $circle-height;
  justify-self: center;
  border-radius: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
}

.circle__btn {
  grid-row: 1/2;
  grid-column: 1/2;
  width: $circle-btn-width;
  height: $circle-btn-height;
  display: flex;
  margin: 0.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: $circle-btn-font-size;
  color: $primary;
  z-index: 300;
  background: $greyLight-1;
  box-shadow: 0.3rem 0.3rem 0.6rem $greyLight-2, -0.2rem -0.2rem 0.5rem $white;
  cursor: pointer;
  position: relative;

  &.shadow {
    box-shadow: inset 0.2rem 0.2rem 0.5rem $greyLight-2, inset -0.2rem -0.2rem 0.5rem $white;
  }

  .play {
    position: absolute;
    opacity: 0;
    transition: all 0.2s linear;

    &.visibility {
      opacity: 1;
    }
  }

  .pause {
    position: absolute;
    transition: all 0.2s linear;

    &.visibility {
      opacity: 0;
    }
  }
}

.circle__back-1, .circle__back-2 {
  grid-row: 1/2;
  grid-column: 1/2;
  width: $circle-btn-width;
  height: $circle-btn-height;
  border-radius: 50%;
  filter: blur(1px);
  z-index: 100;
}

.circle__back-1 {
  box-shadow: 0.4rem 0.4rem 0.8rem $greyLight-2, -0.4rem -0.4rem 0.8rem $white;
  background: linear-gradient(to bottom right, $greyLight-2 0%, $white 100%);
  animation: waves 4s linear infinite;

  &.paused {
    animation-play-state: paused;
  }
}

.circle__back-2 {
  box-shadow: 0.4rem 0.4rem 0.8rem $greyLight-2, -0.4rem -0.4rem 0.8rem $white;
  animation: waves 4s linear 2s infinite;

  &.paused {
    animation-play-state: paused;
  }
}

@keyframes waves {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>