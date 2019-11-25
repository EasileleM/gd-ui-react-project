import { FAVORITES_ACTIONS } from '../actions/types';
import notificationSuccess from '../../utils/notificationSuccess';

export const initialState = {
  size: 0,
  opened: false,
  loading: false,
  failure: false,
  items: []
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.OPEN:
        if (!(!state.loading && !state.failure && state.size)) {
          notificationSuccess('Список избранного пуст, вы не можете открыть его', 'Favourites is empty, you can\'t open it', '')
        }
      return {
        ...state,
        opened: Boolean(!state.loading && !state.failure && state.size)
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
          opened: Boolean(state.opened && !state.loading && !state.failure && action.items.length)
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
