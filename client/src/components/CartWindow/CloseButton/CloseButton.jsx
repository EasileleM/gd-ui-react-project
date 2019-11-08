import React from 'react';

import './CloseButton.scss';

export function CloseButton(props) {
  return (
    <div className="card-window__close-button-wrapper">
      <button onClick={() => props.handleOnClick()} tabIndex="1" className="card-window__close-button">✕</button>
    </div>
  )
}