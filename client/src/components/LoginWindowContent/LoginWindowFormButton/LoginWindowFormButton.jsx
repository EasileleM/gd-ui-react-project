import React from 'react';

import './LoginWindowFormButton.scss';

export class LoginWindowFormButton extends React.Component {
  render() {
    return (
      <button type="submit" className={`login-window-content__form-button ${this.props.additionalClasses}`}>{this.props.content}</button>
    )
  }
}