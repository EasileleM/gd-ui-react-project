import {ITEM_ACTION} from "../action-creators/items/actions";

export const initialState = {
    item: null,
    catalogCards: [],
    nextPage: null,
};

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEM_ACTION.LOAD:
            return {
                item: action.payload,
            };
        case ITEM_ACTION.SET_CATALOG:
            return {
                catalogCards: [...state.catalogCards, ...action.payload.cards],
                nextPage: action.payload.nextPage
            };
        case ITEM_ACTION.CLEAR_CATALOG:
            return {
                catalogCards: [],
                nextPage: true
            };
        default:
            return state;
    }
};

