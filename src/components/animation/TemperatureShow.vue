<template>
    <div class="temperature-box">
        <form style="--min:2;--max:40;--val:20">
        <input id="temp" type="range" value="20" min="2" max="40"/>
        <label for="temp"> </label>
        <output for="temp">20</output>
        </form>
    </div>


</template>

<script lang="ts">
</script>

<style lang="scss" scoped>

@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");

@keyframes float {
  to {
    transform: translateY(0.75em);
  }
}
.temperature-box {
    height: 100%;
    width: 100%;
    
}

.temperature-box *,
.temperature-box :after,
.temperature-box :before {
//   box-sizing: inherit;
  position: absolute;
//   margin: 0;
//   padding: 0;
//   border-radius: inherit;
  text-align: center;
//   font: inherit;
  content: "";
}

form {
  --ratio: calc((var(--val) - var(--min)) / (var(--max) - var(--min)));
  --co: calc(19deg + var(--ratio) * (1turn - 2 *19deg));
//   box-sizing: border-box;
  top: calc(50% - 0.5 *4em);
  left: calc(50% - 0.5 *4em);
  width: 4em;
  height: 4em;
  border-radius: 50%;
  box-shadow: 0 7px 40px 11px rgba(141, 138, 152, 0.4), inset 0 -6px 1px 2px rgba(0, 0, 0, 0.35);
  background: rgb(199, 191, 239);
  font: 300 1.2em/ 1 open sans, sans-serif;
}
form:before {
  top: calc(50% - 0.5 *3em);
  left: calc(50% - 0.5 *3em);
  width: 3em;
  height: 3em;
  box-shadow: 0 15px 35px 11px rgba(46, 44, 58, 0.6);
  background: #e3e4ed;
}

[id="temp"] {
  top: 0.25em;
  left: 0.25em;
  width: 3.5em;
  height: 3.5em;
  background: none;
  /* fix Chrome white */
  pointer-events: none;
  /* track styles */
}
[id="temp"]::-webkit-slider-runnable-track, [id="temp"]::-webkit-slider-thumb, [id="temp"] {
  -webkit-appearance: none;
}
[id="temp"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: rotate(0.5turn);
  background: conic-gradient(#ff9e23, #ff4900 var(--co), transparent 0deg);
  background-color: #3a3749;
  -webkit-clip-path: polygon(32.78362% 0, 50% 50%, 67.21638% 0, 100% 0, 100% 100%, 0 100%, 0 0);
  clip-path: polygon(32.78362% 0, 50% 50%, 67.21638% 0, 100% 0, 100% 100%, 0 100%, 0 0);
  -webkit-mask: radial-gradient(rgba(0, 0, 0, 0) 1.45em, #000000 calc(1px + 1.45em));
}
[id="temp"]::-moz-range-track {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: rotate(0.5turn);
  background: conic-gradient(#ff9e23, #ff4900 360deg, transparent 0deg);
  background-color: #3a3749;
  clip-path: polygon(32.78362% 0, 50% 50%, 67.21638% 0, 100% 0, 100% 100%, 0 100%, 0 0);
  mask: radial-gradient(rgba(0, 0, 0, 0) 1.45em, #000000 calc(1px + 1.45em));
}
[id="temp"]::-moz-range-thumb {
  opacity: 0;
}

label[for="temp"] {
  right: 0;
  bottom: 0;
  left: 0;
  font: 700 1rem/4 open sans, sans-serif;
  color: #2e2c3a;
  text-transform: uppercase;
}

output[for="temp"] {
  top: calc(50% - 0.5 *2em);
  left: calc(50% - 0.5 *2em);
  width: 2em;
  height: 2em;
  box-shadow: 0 15px 35px 5px rgba(96, 93, 111, 0.3);
  background: #f8f9fa;
  line-height: 2em;
}
// output[for="temp"]:before {
//   top: calc(50% - 0.5 *2.5em);
//   left: calc(50% - 0.5 *2.5em);
//   width: 2.5em;
//   height: 2.5em;
//   border-radius: 0;
//   transform: rotate(calc(var(--co) - 0.5turn)) translatey(calc(-0.85em - 0.36em));
//   background: linear-gradient(90deg, rgba(0, 0, 0, 0) calc(50% - 2px), #ffffff calc(50% - 1px), #ffffff calc(50% + 1px), rgba(0, 0, 0, 0) calc(50% + 2px)) 50% 0.36em/ 100% 0.36em no-repeat, radial-gradient(rgba(255, 158, 35, 0.65), rgba(255, 158, 35, 0) 70%) 50% 0/100% 1.08em no-repeat;
//   color: var(--c, #fff);
//   text-shadow: 1px 3px 3px var(--c, #302e38);
//   font: 600 1rem / 2.5em open sans, sans-serif;
//   transition: 0.3s;
//   transition-property: color, text-shadow;
//   counter-reset: temp var(--val);
//   content: counter(temp);
// }
form:not(:hover) input:not(:focus) ~ output[for="temp"]:before {
  --c: transparent;
}
output[for="temp"]:after {
  display: inline-block;
  margin-top: -0.375em;
  font-size: 0.675em;
  content: "°";
}


</style>