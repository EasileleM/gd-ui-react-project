import * as modalWindowActions from '../actions/modalWindow-action';

export const closeModalWindow = () => {
  return {...modalWindowActions.closeWindow};
}

export const changeModalWindowContent = (content) => {
  return {...modalWindowActions.contentChange, content};
}
