import React from 'react';

import LoginWindowContentControls from './LoginWindowContentControls/LoginWindowContentControls';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';

import './LoginWindowContent.scss';

export class LoginWindowContent extends React.Component {
  state = {
    currentMode: 'signIn'
  }

  handleOnClick = (mode) => {
    this.setState({ currentMode: mode });
  }

  render() {
    return (
      <div className="login-window-content">
        <LoginWindowContentControls
          currentMode={this.state.currentMode}
          handleOnClick={this.handleOnClick}
        />
        <SignInForm display={this.state.currentMode === 'signIn' ? 'flex' : 'none'} />
        <SignUpForm display={this.state.currentMode === 'signUp' ? 'flex' : 'none'} />
      </div>
    )
  }
}
