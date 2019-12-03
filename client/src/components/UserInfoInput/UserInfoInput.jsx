import React from 'react';

import './UserInfoInput.scss';

export class UserInfoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let additionalClasses;
    if (this.props.valid === true) {
      additionalClasses = 'user-info-input_valid';
    }
    else if (this.props.valid === false) {
      additionalClasses = 'user-info-input_invalid';
    }
    else {
      additionalClasses = '';
    }
    return (
      <>
        <label className="user-info-input__label" htmlFor={this.props.name}>this.props.name</label>
        <input
          className={`user-info-input ${additionalClasses}`}
          onChange={(e) => this.props.handleOnChange(e)}
          maxLength={this.props.maxLength}
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.props.value}
          onBlur={this.props.handleOnBlur}
        />
      </>
    );
  }
}