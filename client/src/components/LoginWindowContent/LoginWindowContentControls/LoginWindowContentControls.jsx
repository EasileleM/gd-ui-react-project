import React from 'react';

import './LoginWindowContentControls.scss';

export function LoginWindowContentControls(props) {
  return (
    <div className="login-window-content__controls-wrapper">
      <button
        onClick={() => props.handleOnClick('signIn')}
        className={'login-window-content__controls-button'
          + (props.currentMode === 'signIn' ?
          ' login-window-content__controls-button_enabled' : '')}
      > Sign In </button>
      <button
        onClick={() => props.handleOnClick('signUp')}
        className={'login-window-content__controls-button'
          + (props.currentMode === 'signUp' ?
          ' login-window-content__controls-button_enabled' : '')}
      > Sign Up </button>
    </div>
  );
}