<template>

    <div :id="`${childname}-switch`"  class="switch">
      <div class="switch__1">
        <input :id="`${childname}-switch-1`" type="checkbox" @change="transValue">
        <!-- <input id="switch-1" type="checkbox" @change="transValue"> -->
        <label :for="`${childname}-switch-1`"></label>
      </div>
    </div>
</template>


<script lang='ts' setup>
    import {ref} from "vue";
    const switchvalue = ref(false);   // 关闭
    const props = defineProps({
     childname: { type: String, default: true },
    });

    const emit = defineEmits(["getValue"])
    // 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
      // 父子接口



    const transValue = () => {
        switchvalue.value = !switchvalue.value;
        // window.console.log('checked');
        emit("getValue", switchvalue.value)
    }
</script>
<style lang="scss" scoped>
$primary-light: #8abdff;
$primary: #6d5dfc;
$primary-dark: #5b0eeb;
$white: #FFFFFF;
$greyLight-1: #E4EBF5;
$greyLight-2: #c8d0e7;
$greyLight-3: #bec8e4;
$greyDark: #9baacf;

/*  SWITCH  */
.switch {
  grid-column: 1/2;
  display: grid;
  grid-template-columns: repeat(2, -webkit-min-content);
  grid-template-columns: repeat(2, min-content);
  grid-gap: 1rem;
  justify-self: center;
}
.switch input {
  display: none;
}


.switch__1 {
  width: 2rem;

  label, .switch__2 label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    box-shadow: 0.3rem 0.3rem 0.6rem $greyLight-2, -0.2rem -0.2rem 0.5rem $white;
    background: rgba(255, 255, 255, 0);
    position: relative;
    cursor: pointer;
    border-radius: 1.6rem;

    &::after, .switch__2 label::after {
      content: "";
      position: absolute;
      left: 0rem;
      width: 1rem;
      height: 1.5rem;
      border-radius: 50%;
      background: $greyDark;
      transition: all 0.4s ease;
    }

    &::before, .switch__2 label::before {
      content: "";
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(330deg, $primary-dark 0%, $primary 50%, $primary-light 100%);
      opacity: 0;
      transition: all 0.4s ease;
    }
  }

  input:checked ~ label::before {
    opacity: 1;
  }

  input:checked ~ label::after {
    left: 57%;
    background: $greyLight-1;
  }
}
</style>