import {FILTER_ACTIONS} from '../actions/types'


const initialState = {
  category: null,
  minPrice: null,
  maxPrice: null,
  brands: [],
  sizes: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
      case FILTER_ACTIONS.CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
      case FILTER_ACTIONS.SIZES:
      return {
        ...state,
        sizes: action.payload,
      };
      case FILTER_ACTIONS.MAXPRICE:
      return {
        ...state,
        maxPrice: action.payload,
      };
      case FILTER_ACTIONS.MINPRICE:
      return {
        ...state,
        minPrice: action.payload,
      };
      case FILTER_ACTIONS.SEARCH:
      return {
        ...state,
        searchTarget: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;