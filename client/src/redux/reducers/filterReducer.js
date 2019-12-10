import { FILTER_ACTIONS } from '../action-creators/filter/actions';

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

  let filters = {};
  switch (action.type) {
    case FILTER_ACTIONS.BRANDS:
      filters = {
        ...state,
        brands: action.payload,
      };
      return {
        ...filters,
        URI: updateURI(filters),
      };
    case FILTER_ACTIONS.CATEGORY:
      filters = {
        ...state,
        category: action.payload,
      };
      return {
        ...filters,
        URI: updateURI(filters),
      };
    case FILTER_ACTIONS.SIZES:
      filters = {
        ...state,
        sizes: action.payload,
      };
      return {
        ...filters,
        URI: updateURI(filters),
      };
    case FILTER_ACTIONS.MAXPRICE:
      filters = {
        ...state,
        maxPrice: action.payload,
      };
      return {
        ...filters,
        URI: updateURI(filters),
      };
    case FILTER_ACTIONS.MINPRICE:
      filters = {
        ...state,
        minPrice: action.payload,
      };
      return {
        ...filters,
        URI: updateURI(filters),
      };
    case FILTER_ACTIONS.SEARCH:
      filters = {
        ...state,
        searchTarget: action.payload,
      };
      return {
        ...filters,
        URI: updateURI(filters),
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
      const newState = parseURI(action.payload);
      filters = {
        ...state,
        ...newState,
      };
      return {
        ...filters,
        URI: updateURI(filters),
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
  return Object.fromEntries(filterValues)
};

const updateURI = (state) => {
  const URI = `/search?filter=true` +
    `${state.sizes.length ? ("&sizes=" + state.sizes.join(',')) : ""}` +
    `${state.brands.length ? ("&brands=" + state.brands.join(',')) : ""}` +
    `${state.category ? ("&category=" + state.category) : ""}` +
    `${state.maxPrice ? ("&maxPrice=" + state.maxPrice) : ""}` +
    `${state.minPrice ? ("&minPrice=" + state.minPrice) : ""}` +
    `${state.searchTarget ? ("&searchTarget=" + state.searchTarget) : ""}`;
  if (URI === `/search?filter=true`) {
    return `/search`;
  }
  return URI;
};
