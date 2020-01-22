import {SLIDER_ACTION} from "../action-creators/slider/actions";

export const initialState = {
    sliderData: null,
};

export const sliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SLIDER_ACTION.SET:
            return {
                sliderData: action.payload,
            };
        default:
            return state;
    }
};

