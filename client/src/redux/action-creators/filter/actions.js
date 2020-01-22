export const FILTER_ACTIONS = {
  BRANDS: 'BRANDS_FILTER',
  SIZES: 'SIZES_FILTER',
  MAXPRICE: 'MAXPRICE_FILTER',
  MINPRICE: 'MINPRICE_FILTER',
  CATEGORY: 'CATEGORY_FILTER',
  SEARCH: 'SEARCH_FILTER',
  CLEAR: 'CLEAR_FILTER',
  SET_INITIAL_STATE: 'SET_STATE_FILTER',
  SET_AVAILABLE: 'SET_AVAILABLE_FILTER'
};

export const changeSizeFilter = (sizes) => {
  return {
    type: FILTER_ACTIONS.SIZES,
    payload: sizes,
  }
};

export const changeCategoryFilter = (category) => {
  const returnValue = {
    type: FILTER_ACTIONS.CATEGORY,
    payload: category,
  };
  return returnValue;
};

export const changeMaxPriceFilter = (maxPrice) => {
  return {
    type: FILTER_ACTIONS.MAXPRICE,
    payload: maxPrice,
  }
};

export const changeMinPriceFilter = (minPrice) => {
  return {
    type: FILTER_ACTIONS.MINPRICE,
    payload: minPrice,
  }
};

export const changeBrandsFilter = (brands) => {
  return {
    type: FILTER_ACTIONS.BRANDS,
    payload: brands,
  }
};

export const search = (target) => {
  return {
    type: FILTER_ACTIONS.SEARCH,
    payload: target,
  }
};

export const clear = () => {
  return {
    type: FILTER_ACTIONS.CLEAR,
  }
};

export const setInitSearchState = (URI) => {
  return {
    type: FILTER_ACTIONS.SET_INITIAL_STATE,
    payload: URI,
  }
};

export const setAvailableFilters = (filters) => {
  return {
    type: FILTER_ACTIONS.SET_AVAILABLE,
    payload: filters,
  }
};

