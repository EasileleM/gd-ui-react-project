import { FAVORITES_ACTIONS } from '../actions/types';

const initialState = {
  size: 0,
  opened: false,
  loading: false,
  failure: false,
  items: []
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.OPEN:
      return {
        ...state,
        opened: !state.loading && !state.failure && state.size
      }
    case FAVORITES_ACTIONS.CLOSE:
      return {
        ...state,
        opened: false
      }
    case FAVORITES_ACTIONS.UPDATE_ITEMS:
        return {
          ...state,
          items: action.items,
          size: action.items.length,
          opened: state.opened && !state.loading && !state.failure && action.items.length
        }
    case FAVORITES_ACTIONS.FETCH_BEGINS:
      return {
        ...state,
        opened: false,
        loading: true,
        size: 0
      }
    case FAVORITES_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        items: action.items,
        size: action.size,
        loading: false
      }
    case FAVORITES_ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true,
        error: action.error,
        size: 0
      }
    default:
      return state;
  }
};

export default favoritesReducer;