import React from 'react';

import { ReactComponent as EyeShow } from "../../assets/eyeShow.svg";
import { ReactComponent as EyeHide } from "../../assets/eyeHide.svg";

import './UserInfoInput.scss';

export class UserInfoInput extends React.Component {
  state = {
    hide: true
  };

  render() {
    let additionalClasses = '';
    if (this.props.valid === true) {
      additionalClasses = 'user-info-input_valid';
    }
    else if (this.props.valid === false) {
      additionalClasses = 'user-info-input_invalid';
    }
    return (
      <>
        <label className="user-info-input-label" htmlFor={this.props.name}>{this.props.name}</label>
        <div className={`user-info-input-wrapper`}>
          <input
            className={`user-info-input ${additionalClasses} ${this.props.additionalClasses || ''}`}
            onChange={this.props.handleOnChange ? (e) => this.props.handleOnChange(e) : (() => { })}
            maxLength={this.props.maxLength}
            type={this.state.hide ? this.props.type : 'text'}
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.props.value}
            onBlur={this.props.handleOnBlur ? (e) => this.props.handleOnBlur(e) : (() => { })}
          />
          {
            this.props.type === 'password' &&
            (this.state.hide ?
              <EyeShow onClick={() => this.setState({ hide: !this.state.hide })} className="user-info-input-wrapper__show-password" /> :
              <EyeHide onClick={() => this.setState({ hide: !this.state.hide })} className="user-info-input-wrapper__show-password" />)
          }
        </div>

      </>
    );
  }
}