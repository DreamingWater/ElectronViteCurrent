




<template>
  <div class="container">
  <div class="components">
    
    <!-- <div class="switch">
      <div class="switch__1">
        <input id="switch-1" type="checkbox">
        <label for="switch-1"></label>
      </div>
      
      <div class="switch__2">
        <input id="switch-2" type="checkbox" checked>
        <label for="switch-2"></label>
      </div>
    </div> -->
    
    <!-- <div class="clock">
      <div class="hand hours"></div>
      <div class="hand minutes"></div>
      <div class="hand seconds"></div>
      <div class="point"></div>
      <div class="marker">
        <span class="marker__1"></span>
        <span class="marker__2"></span>
        <span class="marker__3"></span>
        <span class="marker__4"></span>
      </div>
    </div> -->
    
    
    <div class="icon">
      <div class="icon__home">
        <ion-icon name="home"></ion-icon></div>
      <div class="icon__account">
        <ion-icon name="person"></ion-icon></div>
      <div class="icon__settings">
        <ion-icon name="settings"></ion-icon></div>
    </div>
    
    <div class="slider">
      <div class="slider__box">
        <span class="slider__btn" id="find"></span>
        <span class="slider__color"></span>
        <span class="slider__tooltip">50%</span>
      </div>
    </div>
  </div>
  <a href="https://dribbble.com/myacode" class="dribbble" target="_blank"><ion-icon name="logo-dribbble"></ion-icon></a>
</div>
</template>


<style>
:root {
  --primary-light: #8abdff;
  --primary: #6d5dfc;
  --primary-dark: #5b0eeb;
  --white: #FFFFFF;
  --greyLight-1: #E4EBF5;
  --greyLight-2: #c8d0e7;
  --greyLight-3: #bec8e4;
  --greyDark: #9baacf;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
  overflow-y: scroll;
  background: var(--greyLight-1);
}
@media screen and (min-width: 900px) {
  html {
    font-size: 75%;
  }
}

/*  SWITCH  */
/* .switch {
  grid-column: 1/2;
  display: grid;
  grid-template-columns: repeat(2, -webkit-min-content);
  grid-template-columns: repeat(2, min-content);
  grid-gap: 3rem;
  justify-self: center;
}
.switch input {
  display: none;
}
.switch__1, .switch__2 {
  width: 6rem;
}
.switch__1 label, .switch__2 label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  background: rgba(255, 255, 255, 0);
  position: relative;
  cursor: pointer;
  border-radius: 1.6rem;
}
.switch__1 label::after, .switch__2 label::after {
  content: "";
  position: absolute;
  left: 0.4rem;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: var(--greyDark);
  transition: all 0.4s ease;
}
.switch__1 label::before, .switch__2 label::before {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(330deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
  opacity: 0;
  transition: all 0.4s ease;
}
.switch input:checked ~ label::before {
  opacity: 1;
}
.switch input:checked ~ label::after {
  left: 57%;
  background: var(--greyLight-1);
}
 */


/*  CLOCK  */
/* .clock {
  grid-column: 2/3;
  grid-row: 1/3;
  width: 12rem;
  height: 12rem;
  justify-self: center;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.clock .hand {
  position: absolute;
  transform-origin: bottom;
  bottom: 6rem;
  border-radius: 0.2rem;
  z-index: 200;
}
.clock .hours {
  width: 0.4rem;
  height: 3.2rem;
  background: var(--greyLight-3);
}
.clock .minutes {
  width: 0.4rem;
  height: 4.6rem;
  background: var(--greyDark);
}
.clock .seconds {
  width: 0.2rem;
  height: 5.2rem;
  background: var(--primary);
}
.clock .point {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--primary);
  z-index: 300;
}
.clock .marker {
  width: 95%;
  height: 95%;
  border-radius: 50%;
  position: relative;
  box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white);
}
.clock .marker::after {
  content: "";
  width: 60%;
  height: 60%;
  position: absolute;
  box-shadow: inset 1px 1px 1px var(--greyLight-2), inset -1px -1px 1px var(--white);
  border-radius: 50%;
  top: 20%;
  left: 20%;
  filter: blur(1px);
}
.clock .marker__1, .clock .marker__2, .clock .marker__3, .clock .marker__4 {
  position: absolute;
  border-radius: 0.1rem;
  box-shadow: inset 1px 1px 1px var(--greyLight-2), inset -1px -1px 1px var(--white);
}
.clock .marker__1, .clock .marker__2 {
  width: 0.2rem;
  height: 0.6rem;
  left: 5.6rem;
}
.clock .marker__3, .clock .marker__4 {
  width: 0.6rem;
  height: 0.2rem;
  top: 5.6rem;
}
.clock .marker__1 {
  top: 2%;
}
.clock .marker__2 {
  top: 98%;
  transform: translateY(-0.6rem);
}
.clock .marker__3 {
  left: 2%;
}
.clock .marker__4 {
  left: 98%;
  transform: translateX(-0.6rem);
} */



/*  ICONS  */
.icon {
  grid-column: 3/4;
  grid-row: 4/5;
  display: flex;
  justify-content: space-between;
}
.icon__account, .icon__home, .icon__settings {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  color: var(--greyDark);
  transition: all 0.5s ease;
}
.icon__account:active, .icon__home:active, .icon__settings:active {
  box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white);
  color: var(--primary);
}
.icon__account:hover, .icon__home:hover, .icon__settings:hover {
  color: var(--primary);
}

/*  RANGE-SLIDER  */
.slider {
  grid-column: 3/4;
  grid-row: 5/6;
  align-self: center;
  display: flex;
  flex-direction: column;
}
.slider__box {
  width: 100%;
  height: 1rem;
  cursor: pointer;
  box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white);
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider__btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--white);
  position: absolute;
  box-shadow: 0px 0.1rem 0.3rem 0px var(--greyLight-3);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider__btn:hover ~ .slider__tooltip {
  opacity: 1;
}
.slider__btn::after {
  content: "";
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white);
}
.slider__color {
  height: 100%;
  width: 50%;
  position: absolute;
  left: 0;
  z-index: 100;
  border-radius: inherit;
  background: var(--primary);
  background: linear-gradient(-1deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%);
}
.slider__tooltip {
  position: absolute;
  top: 2.6rem;
  height: 2.5rem;
  width: 3rem;
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: var(--primary);
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  opacity: 0;
  transition: opacity 0.3s ease;
}



</style>