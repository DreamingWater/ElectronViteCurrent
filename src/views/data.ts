import { ref, computed, unref, Ref } from 'vue';

export enum PageStateEnum {
  Oscillator = 0,
  Temperature= 1,
  Amplifier = 2,
  Others = 3,
}

const current_Page_State = ref(PageStateEnum.Oscillator);

export function useCurrentPageState() {
  function setCurrentPageState(state: number) {
    current_Page_State.value = state;
  }
  const getCurrentPagestate = computed(() => current_Page_State.value);

  return { setCurrentPageState, getCurrentPagestate};
}


