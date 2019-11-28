import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../constants/constants';

import { UserInfoInput } from '../../UserInfoInput/UserInfoInput';
import { LoginWindowFormButton } from '../LoginWindowFormButton/LoginWindowFormButton';
import { InvalidFormNotification } from '../InvalidFormNotification/InvalidFormNotification';

import notificationSuccess from '../../../utils/notificationSuccess';
import { signIn } from '../../../utils/signIn';

import { userAuthorize } from '../../../redux/action-creators/user-action-creator';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow-action-creator';


const formErrors = {
  email: 'Incorrect email.',
  password: 'Incorrect password. Password should contain minimum eight characters, at least one letter, one number and one special character.'
};

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: null,
      passwordValid: null
    };
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.emailValid && this.state.passwordValid) {
      signIn({email: this.state.email, password: this.state.password})
        .then((res) => {
          this.props.authorize(res);
          this.props.close();
          notificationSuccess('Добро пожаловать!', 'Welcome!', '');
        })
        .catch((err) => {
          notificationSuccess('Вот незадача...', 'Tough luck...', '');
        })
    }
    else {
      notificationSuccess('Заполните форму.', 'Fill the form.', '');
    }
  }

  handleOnBlur = (e) => {
    e.preventDefault();
    if (!e.target.value.length) {
      return;
    }
    this.checkValidity(e.target.name, e.target.value);
  }

  checkValidity(name, value) {
    let currentStateUpdate = {};
    switch (name) {
      case 'email':
        currentStateUpdate.emailValid = EMAIL_REGEX.test(value);
        break;
      case 'password':
        currentStateUpdate.passwordValid = PASSWORD_REGEX.test(value);
        break;
      default: return;
    }
    this.setState(currentStateUpdate);
  }

  render() {
    let currentError = null;
    for (const key of Object.keys(formErrors)) {
      if (this.state[key + 'Valid'] === false) {
        currentError = key;
        break;
      }
    }
    return (
      <form style={{ display: this.props.display }} onSubmit={this.handleOnSubmit} method="POST" className="login-window-content__form">
        <UserInfoInput
          placeholder="Email"
          name="email"
          value={this.state.email}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.emailValid}
          type="email"
          maxLength="140"
        />
        <UserInfoInput
          placeholder="Password"
          name="password"
          value={this.state.password}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.passwordValid}
          type="password"
          maxLength="140"
        />
        <InvalidFormNotification content={formErrors[currentError] || ''} />
        <Link to='/404' onClick={this.props.close} className="login-window-content__form-password-link">Forgot password?</Link>
        <LoginWindowFormButton additionalClasses="login-window-content__form-button_none-margin-top" content="Sign In" />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      close: () => dispatch(closeModalWindow()),
      authorize: (data) => dispatch(userAuthorize(data))
  }
};

export default connect(null, mapDispatchToProps)(SignInForm);