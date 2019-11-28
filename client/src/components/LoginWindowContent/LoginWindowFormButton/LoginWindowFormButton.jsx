import React from 'react';

import './LoginWindowFormButton.scss';

export function LoginWindowFormButton(props) {
  return (
    <button type="submit" className={`login-window-content__form-button ${props.additionalClasses}`}>{props.content}</button>
  )
}