import {ITEM_ACTION} from "../action-creators/items/actions";

export const initialState = {
    currentItem: null
};

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEM_ACTION.LOAD:
            return {
                item: action.payload,
            };
        default:
            return state;
    }
};

