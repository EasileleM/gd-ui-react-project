import {FILTER_ACTIONS} from "../action-types/filterActionTypes";

export const changeSizeFilter = {
  type: FILTER_ACTIONS.SIZES,
};

export const changeCategoryFilter = {
  type: FILTER_ACTIONS.CATEGORY,
};

export const changeMaxPriceFilter = {
  type: FILTER_ACTIONS.MAXPRICE,
};

export const changeMinPriceFilter = {
  type: FILTER_ACTIONS.MINPRICE,
};

export const changeBrandsFilter = {
  type: FILTER_ACTIONS.BRANDS,
};

export const search = {
  type: FILTER_ACTIONS.SEARCH,
};

export const clear = {
  type: FILTER_ACTIONS.CLEAR,
};