export const ITEM_ACTION = {
    LOAD: 'LOAD_ITEM',
    SET: 'SET_ITEM',
    LOAD_CATALOG: 'LOAD_CATALOG_ITEMS',
    SET_CATALOG: 'SET_CATALOG_ITEMS',
    CLEAR_CATALOG: 'CLEAR_CATALOG_ITEMS',
};

export const setItem = (item) => {
    return {
        type: ITEM_ACTION.LOAD,
        payload: item,
    }
};

export const setCatalog = (cards, nextPage) => {
    return {
        type: ITEM_ACTION.SET_CATALOG,
        payload: {cards, nextPage},
    }
};

export const clearCatalog = () => {
    return {
        type: ITEM_ACTION.CLEAR_CATALOG,
    }
};