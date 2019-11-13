import React from 'react';

import CloseButton from './CloseButton/CloseButton';

import './ModalWindow.scss';

export function ModalWindow(props) {
  return (
    <div className="modal-window">
      <button className="modal-window__background" onClick={props.onClick}></button>
      <div className="modal-window__content">
        <CloseButton onClick={props.onClick} />
        {props.content}
      </div>
    </div>
  )
}
