<template>
    <div class="temperature-box">
        <form style="--min:2;--max:40;--val:20">
        <input id="temp" type="range" value="20" min="2" max="40"/>
        <label for="temp"> </label>
        <output for="temp">{{ show_temperature_value }}</output>
        </form>
    </div>


</template>
<script  setup>
    import { onMounted,ref,watch } from 'vue';
    import { useAmplifierStore } from "@/store/Amplifier";
    const store = useAmplifierStore();       // store
    const show_temperature_value = ref(20); // 用于显示的温度

    watch(() => store.getTargetTemperature(),
        (newVal, oldVal) => {
          show_temperature_value.value = newVal;   //更新值
          }
      );

</script>


<style lang="scss" scoped>


$fsu: 1.2;
$ff: open sans, sans-serif;
$ext-d: 4.5em;
$mid-d: 3.5em;
$int-d: 3em;
$mov-d: 2.8em;
$t: 0.3s;
$a: 19deg;
$dx: 0.1722; //50% * tan($a);

$track-d: 3.5em;
$track-w: 0.3em;
$track-o: 0.5 * ($ext-d - $track-d);
$track-mr: 0.5 * $track-d - $track-w;
$track-m: radial-gradient(transparent $track-mr, #000 calc(1px + #{$track-mr}));
$track-cp: polygon(
	50% - $dx 0,
	50% 50%,
	50% + $dx 0,
	100% 0,
	100% 100%,
	0 100%,
	0 0
);

$btn-d: 0.5 * ($mid-d - $int-d);

@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");

@mixin sp($dim, $set: -1) {
	$off: calc(50% - 0.5 *#{$dim});

	@if $set != -1 {
		--off: $off;
	}
	@if $set != 0 {
		top: $off;
	}
	@if $set != 1 {
		left: $off;
	}
	width: $dim;
	height: $dim;
}

@mixin track($co: 360deg, $wk: 0) {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	transform: rotate(0.5turn);
	background: conic-gradient(#ff9e23, #ff4900 $co, transparent 0deg);
	background-color: #3a3749;
	@if $wk == 1 {
		-webkit-clip-path: $track-cp;
	}
	clip-path: $track-cp;
}

body {
	overflow: hidden;
	background: #fdfdfd;

	*,
	:after,
	:before {
		box-sizing: inherit;
		position: absolute;
		margin: 0;
		padding: 0;
		border-radius: inherit;
		text-align: center;
		font: inherit;
		content: "";
	}
}
.temperature-box{
  margin-left: 30px;
}
form {
	--ratio: calc((var(--val) - var(--min)) / (var(--max) - var(--min)));
	--co: calc(#{$a} + var(--ratio) * (1turn - 2 *#{$a}));
	box-sizing: border-box;
	@include sp($ext-d);
	border-radius: 50%;
	box-shadow: 0 7px 40px 11px rgba(84, 81, 97, 0.4),
		inset 0 -6px 1px 2px rgba(#000, 0.35);
	background: #6d697f;
	font: 300 #{$fsu * 1em}/ 1 $ff;

	&:before {
		@include sp($mid-d);
		box-shadow: 0 15px 35px 11px rgba(46, 44, 58, 0.6);
		background: #e3e4ed;
	}
}

[id="temp"] {
	&::-webkit-slider-runnable-track,
	&::-webkit-slider-thumb,
	& {
		-webkit-appearance: none;
	}

	top: $track-o;
	left: $track-o;
	width: $track-d;
	height: $track-d;
	background: none; /* fix Chrome white */
	pointer-events: none;

	/* track styles */
	&::-webkit-slider-runnable-track {
		@include track(var(--co), 1);
		-webkit-mask: $track-m;
	}

	&::-moz-range-track {
		@include track();
		mask: $track-m;
	}

	&::-moz-range-thumb {
		opacity: 0;
	}
}

label[for="temp"] {
	right: 0;
	bottom: 0;
	left: 0;
	font: 700 1rem/4 $ff;
	color: #2e2c3a;
	text-transform: uppercase;
}

output[for="temp"] {
	@include sp($int-d);
	box-shadow: 0 15px 35px 5px rgba(96, 93, 111, 0.3);
	background: #f8f9fa;
	line-height: $int-d;
  color: #ff4900;
  font-weight: 500;


	&:after {
		display: inline-block;
		margin-top: -0.375em;
		font-size: 0.675em;
		content: "°";
	}
}

button {
	overflow: hidden;
	@include sp($btn-d, 1);
	left: calc(var(--off) + var(--s) *#{0.5 * ($int-d + $btn-d)});
	border: none;
	background: none;
	color: #b9b6c8;
	border-radius: 0;
	text-indent: $btn-d;
	white-space: nowrap;
	transition: color $t;
	cursor: pointer;

	&:focus,
	&:hover {
		outline: none;
		color: coral;
	}

	&:after {
		@include sp(0.25 * $btn-d);
		border: solid 0 currentcolor;
		border-width: 3px 0 0 3px;
		transform: rotate(calc(45deg + var(--s) * 90deg));
	}
}


</style>