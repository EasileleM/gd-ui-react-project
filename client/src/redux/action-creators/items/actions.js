export const ITEM_ACTION = {
    LOAD: 'LOAD_ITEM',
    SET: 'SET_ITEM'
};

export const setItem = (item) => {
    console.log("here")
    return {
        type: ITEM_ACTION.LOAD,
        payload: item,
    }
};