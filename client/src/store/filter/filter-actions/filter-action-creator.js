import * as cartActions from './filter-actions';

export const changeSizeFilter = (sizes) => {
  return {
    ...cartActions.changeSizeFilter,
    payload: sizes,
  }
};

export const changeCategoryFilter = (category) => {
  const returnValue =  {
    ...cartActions.changeCategoryFilter,
    payload: category,
  };
  return returnValue;
};

export const changeMaxPriceFilter = (maxPrice) => {
  return {
    ...cartActions.changeMaxPriceFilter,
    payload: maxPrice,
  }
};

export const changeMinPriceFilter = (minPrice) => {
  return {
    ...cartActions.changeMinPriceFilter,
    payload: minPrice
  }
};

export const changeBrandsFilter = (brands) => {
  return {
    ...cartActions.changeBrandsFilter,
    payload: brands,
  }
};

export const search = (target) => {
  return {
    ...cartActions.search,
    payload: target,
  }
};

export const clear = () => {
  return {
    ...cartActions.clear,
  }
};