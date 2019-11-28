import { FILTER_ACTIONS } from '../action-types/filterActionTypes';

export const initialState = {
  category: null,
  minPrice: null,
  maxPrice: null,
  brands: [],
  sizes: [],
  searchTarget: null,
  URI: null,
};

export const filterReducer = (state = initialState, action) => {

  // console.log('switch!');
  switch (action.type) {
    case FILTER_ACTIONS.BRANDS:
      return {
        ...state,
        brands: action.payload,
        // URI: updateURI(state),
      };
    case FILTER_ACTIONS.CATEGORY:
      // console.log('category');
      // console.log(state);
      return {
        ...state,
        category: action.payload,
        // URI: updateURI(state, action.payload),
      };
    case FILTER_ACTIONS.SIZES:
      return {
        ...state,
        sizes: action.payload,
        // URI: updateURI(state),
      };
    case FILTER_ACTIONS.MAXPRICE:
      return {
        ...state,
        maxPrice: action.payload,
        // URI: updateURI(state),
      };
    case FILTER_ACTIONS.MINPRICE:
      return {
        ...state,
        minPrice: action.payload,
        // URI: updateURI(state),
      };
    case FILTER_ACTIONS.SEARCH:
      return {
        ...state,
        searchTarget: action.payload,
        // URI: updateURI(state),
      };
    case FILTER_ACTIONS.CLEAR:
      return {
        ...initialState,
      };
    case FILTER_ACTIONS.SET_INITIAL_STATE:
      if (!action.payload) {
        return {
          ...state,
        };
      }
      // console.log('set');
      const newState = parseURI(action.payload);
      return {
        ...state,
        ...newState,
        URI: updateURI(newState),
      };
    default:
      return state;
  }
};

const parseURI = (URI) => {
  const filtersArr = URI.split('&').slice(1);
  const filterValues = filtersArr.map(item => {
    const filter = item.split('=');
    if (filter[0] === 'brands' || filter[0] === 'sizes') {
      filter[1] = filter[1].split(',');
    }
    return filter;
  });
  // console.log(filtersArr);
  // console.log(filterValues);
  // console.log(Object.fromEntries(filterValues));
  return Object.fromEntries(filterValues)
}

const updateURI = (state) =>
  (`/search?filter=true` +
    `${state.sizes ? ("&sizes=" + state.sizes.join(',')) : ""}` +
    `${state.brands ? ("&brands=" + state.brands.join(',')) : ""}` +
    `${state.category ? ("&category=" + state.category) : ""}` +
    `${state.maxPrice ? ("&maxPrice=" + state.maxPrice) : ""}` +
    `${state.minPrice ? ("&minPrice=" + state.minPrice) : ""}` +
    `${state.searchTarget ? ("&searchTarget=" + state.searchTarget) : ""}`);
