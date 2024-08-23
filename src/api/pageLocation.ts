import { ref, computed, unref, Ref } from 'vue';


export const PageModulesNames = {
    'Oscillator' : 'Oscillator',
    'TemperaturePPLN': 'TemperaturePPLN',
    'Amplifier' : 'Amplifier',
    'SeedPurchased' : 'SeedPurchased',
    'Others' : 'Others',
    'Manager' : 'Manager',
    'WaterCooling' : 'WaterCooling',
}

export enum PageLocationStateEnum {
    Oscillator = 0,
    TemperaturePPLN= 1,
    Amplifier = 2,
    SeedPurchased = 3,
    Others = 4,
    Manager = 5,
    WaterCooling = 6,
}

const Page_Location_State = ref(PageLocationStateEnum.Oscillator);

export function usePageLocationState() {
    function setCurrentPageLocationState(state: number) {
        Page_Location_State.value = state;
    }
    const getCurrentPageLocationState = computed(() => Page_Location_State.value);

    return { setCurrentPageLocationState, getCurrentPageLocationState};
}


