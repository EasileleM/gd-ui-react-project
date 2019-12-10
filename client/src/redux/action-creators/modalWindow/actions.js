export const MODAL_WINDOW_ACTIONS = {
  CLOSE: 'CLOSE',
  CONTENT_CHANGE: 'CONTENT_CHANGE'
}

export const closeModalWindow = () => {
  return { type: MODAL_WINDOW_ACTIONS.CLOSE };
}

export const changeModalWindowContent = (content) => {
  return { type: MODAL_WINDOW_ACTIONS.CONTENT_CHANGE, content };
}
