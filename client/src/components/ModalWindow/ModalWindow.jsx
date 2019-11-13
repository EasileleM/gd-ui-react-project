import React from 'react';

import CloseButton from './CloseButton/CloseButton';

import './ModalWindow.scss';

export function ModalWindow(props) {
  return (
    <div className="card-window">
      <button className="card-window__background" onClick={props.onClick}></button>
      <div className="card-window__content">
        <CloseButton onClick={props.onClick} />
        {props.content}
      </div>
    </div>
  )
}
