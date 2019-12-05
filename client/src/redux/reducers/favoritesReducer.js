import { FAVORITES_ACTIONS } from '../action-creators/favorites-action-creator';

export const initialState = {
  size: 0,
  failure: false,
  items: []
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.UPDATE_ITEMS:
        return {
          ...state,
          items: action.items,
          size: action.size
        }
    case FAVORITES_ACTIONS.FETCH_BEGINS:
      return {
        ...state,
        size: 0
      }
    case FAVORITES_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        items: action.items,
        size: action.size
      }
    case FAVORITES_ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        failure: true,
        error: action.error,
        size: 0
      }
    default:
      return state;
  }
};
