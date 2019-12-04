import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { EMAIL_REGEX, PASSWORD_REGEX, FIRST_NAME_REGEX, LAST_NAME_REGEX } from '../../../constants/constants';

import { UserInfoInput } from '../../UserInfoInput/UserInfoInput';
import { LoginWindowFormButton } from '../LoginWindowFormButton/LoginWindowFormButton';
import { InvalidFormNotification } from '../InvalidFormNotification/InvalidFormNotification';

import notificationSuccess from '../../../utils/notificationSuccess';
import { signUp } from '../../../utils/signUp';

import { userAuthorize } from '../../../redux/action-creators/user-action-creator';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow-action-creator';

const formErrors = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  confirmPassword: null
};

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstNameValid: null,
      lastNameValid: null,
      emailValid: null,
      passwordValid: null,
      confirmPasswordValid: null
    };
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.emailValid
      && this.state.passwordValid
      && this.state.firstNameValid
      && this.state.lastNameValid
      && this.state.confirmPasswordValid) {
      signUp({
        email: this.state.email, password: this.state.password,
        firstName: this.state.firstName, lastName: this.state.lastName
      })
        .then((res) => {
          this.props.authorize(res.data);
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
      this.setState({ [e.target.name + 'Valid']: null });
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
        if (this.state.confirmPasswordValid !== null) {
          currentStateUpdate.confirmPasswordValid = currentStateUpdate.passwordValid && (this.state.password === this.state.confirmPassword);
        }
        break;
      case 'firstName':
        currentStateUpdate.firstNameValid = FIRST_NAME_REGEX.test(value);
        break;
      case 'lastName':
        currentStateUpdate.lastNameValid = LAST_NAME_REGEX.test(value);
        break;
      case 'confirmPassword':
        if (!this.state.passwordValid) {
          return;
        }
        currentStateUpdate.confirmPasswordValid = this.state.passwordValid !== false && this.state.password === this.state.confirmPassword;
        break;
      default: return;
    }
    this.setState(currentStateUpdate);
  }

  render() {
    let buttonDisabledClass = '';
    if (!(this.state.emailValid
      && this.state.passwordValid
      && this.state.firstNameValid
      && this.state.lastNameValid
      && this.state.confirmPasswordValid)) {
      buttonDisabledClass = 'login-window-content__form-button_disabled';
    }
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
          placeholder={this.props.t('signUpForm.firstName')}
          name="firstName"
          value={this.state.firstName}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.firstNameValid}
          type="text"
          maxLength="140"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.lastName')}
          name="lastName"
          value={this.state.lastName}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.lastNameValid}
          type="text"
          maxLength="140"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.email')}
          name="email"
          value={this.state.email}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.emailValid}
          type="email"
          maxLength="140"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.password')}
          name="password"
          value={this.state.password}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.passwordValid}
          type="password"
          maxLength="140"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.confirmPassword')}
          name="confirmPassword"
          value={this.state.confirmPassword}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.confirmPasswordValid}
          type="password"
          maxLength="140"
        />
        <InvalidFormNotification content={currentError && this.props.t(`signUpForm.${currentError}Error`)} />
        <LoginWindowFormButton additionalClasses={buttonDisabledClass} onSumbit={this.handleOnSubmit} content={this.props.t('signUpForm.signUp')} />
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

export default connect(null, mapDispatchToProps)(withTranslation()(SignUpForm));