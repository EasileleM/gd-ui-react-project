import React from 'react';

import './LoginWindowFormButton.scss';

export class LoginWindowFormButton extends React.Component {
  render() {
    return (
      <button
        type="submit"
        className={`login-window-content__form-button
        ${this.props.additionalClasses}`}
        onMouseOver={this.props.onMouseOver}
      >
        {this.props.content}
      </button>
    )
  }
}