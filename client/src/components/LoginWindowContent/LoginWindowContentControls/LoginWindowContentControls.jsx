import React from 'react';
import { withTranslation } from 'react-i18next';

import './LoginWindowContentControls.scss';

export function LoginWindowContentControls(props) {
  return (
    <div className="login-window-content__controls-wrapper">
      <button
        onClick={() => props.handleOnClick('signIn')}
        className={'login-window-content__controls-button'
          + (props.currentMode === 'signIn' ?
            ' login-window-content__controls-button_enabled' : '')}
      > {props.t('signInForm.signIn')} </button>
      <button
        onClick={() => props.handleOnClick('signUp')}
        className={'login-window-content__controls-button'
          + (props.currentMode === 'signUp' ?
            ' login-window-content__controls-button_enabled' : '')}
      > {props.t('signUpForm.signUp')} </button>
    </div>
  );
}

export default withTranslation()(LoginWindowContentControls);