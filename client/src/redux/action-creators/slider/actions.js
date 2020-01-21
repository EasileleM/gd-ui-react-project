
export const SLIDER_ACTION = {
    LOAD: 'LOAD_SLIDER_ITEMS',
    SET: 'SET_SLIDER_ITEMS',
};

export const setSliderItem = (sliderData) => {
    return {
        type: SLIDER_ACTION.SET,
        payload: sliderData,
    }
};