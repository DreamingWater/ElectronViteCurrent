import { ref, computed, unref, Ref } from 'vue';

export enum PageLocationStateEnum {
    Oscillator = 0,
    Temperature= 1,
    Amplifier = 2,
    Others = 3,
}

const Page_Location_State = ref(PageLocationStateEnum.Oscillator);

export function usePageLocationState() {
    function setCurrentPageLocationState(state: number) {
        Page_Location_State.value = state;
    }
    const getCurrentPageLocationState = computed(() => Page_Location_State.value);

    return { setCurrentPageLocationState, getCurrentPageLocationState};
}

