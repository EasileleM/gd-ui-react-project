import { MODAL_WINDOW_ACTIONS } from '../action-creators/modalWindow-action-creator';

export const initialState = {
  currentModal: 'none'
};

export const modalWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_WINDOW_ACTIONS.CLOSE:
      return {
        ...state,
        currentModal: 'none'
      };
    case MODAL_WINDOW_ACTIONS.CONTENT_CHANGE:
      return {
        ...state,
        currentModal: action.content,
      };
    default:
      return state;
  }
};
