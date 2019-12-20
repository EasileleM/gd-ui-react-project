import React from 'react';
import './InvalidFormNotification.scss';

export function InvalidFormNotification(props) {
  return (
    <p
      className={`login-window-content__form-error-notification ${props.additionalClasses || ''}`}>
      {props.content}
    </p>
  );
}