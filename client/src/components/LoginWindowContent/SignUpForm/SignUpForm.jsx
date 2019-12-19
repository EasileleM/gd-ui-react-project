import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { emailRegex, passwordRegex, minLength, maxLength, onlyLatinRussian } from '../../../utils/rulesForValidation/generalRules';

import { UserInfoInput } from '../../UserInfoInput/UserInfoInput';
import { LoginWindowFormButton } from '../../LoginWindowFormButton/LoginWindowFormButton.jsx';
import { InvalidFormNotification } from '../../InvalidFormNotification/InvalidFormNotification.jsx';

import notificationSuccess from '../../../utils/notificationSuccess';

import { signUp } from '../../../redux/action-creators/user/signUp';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow/actions';

const formErrors = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  confirmPassword: null
};

export class SignUpForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstNameValid: null,
    lastNameValid: null,
    emailValid: null,
    passwordValid: null,
    confirmPasswordValid: null,
    formValid: false
  };

  rulesForFields = {
    email: [emailRegex, minLength(1), maxLength(140)],
    password: [passwordRegex, minLength(8), maxLength(50)],
    confirmPassword: [
      (value) => this.state.password === value,
      () => {
        if (!this.state.passwordValid) {
          return null;
        }
        return true;
      }
    ],
    firstName: [onlyLatinRussian, minLength(1), maxLength(140)],
    lastName: [onlyLatinRussian, minLength(1), maxLength(140)]
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.props.signInStatus === 'pending') {
      return;
    }
    if (this.state.formValid) {
      const data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      };
      this.props.signUp(data);
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


  handleOnMouseOver = () => {
    for (const inputName in this.rulesForFields) {
      if (this.state[inputName + 'Valid'] != null || this.state[inputName]) {
        this.checkValidity(inputName, this.state[inputName]);
      }
    }
  }

  checkValidity(name, value) {
    let currentStateUpdate = {
      [name + 'Valid']: true
    };
    for (const rule of this.rulesForFields[name]) {
      const result = rule(value);
      if (!result) {
        currentStateUpdate[name + 'Valid'] = result;
        break;
      }
    }
    if (name === 'password') {
      if (this.state.confirmPasswordValid !== null) {
        currentStateUpdate.confirmPasswordValid =
          currentStateUpdate.passwordValid
          && (this.state.password === this.state.confirmPassword);
      }
    }
    this.setState(currentStateUpdate, () => {
      this.setState({
        formValid:
          this.state.emailValid && this.state.passwordValid
          && this.state.firstNameValid && this.state.lastNameValid
          && this.state.confirmPasswordValid
      });
    });
  }

  render() {
    let buttonDisabledClass = '';

    if (!this.state.formValid) {
      buttonDisabledClass = 'login-window-content__form-button_disabled';
    }
    else if (this.props.signUpStatus === 'pending') {
      buttonDisabledClass = 'login-window-content__form-button_loading';
    }

    let currentError = null;

    for (const key of Object.keys(formErrors)) {
      if (this.state[key + 'Valid'] === false) {
        currentError = key;
        break;
      }
    }

    return (
      <form style={{ display: this.props.display }}
        onSubmit={this.handleOnSubmit}
        method="POST"
        className="login-window-content__form">
        <UserInfoInput
          placeholder={this.props.t('signUpForm.firstName')}
          name="firstName"
          value={this.state.firstName}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.firstNameValid}
          type="text"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.lastName')}
          name="lastName"
          value={this.state.lastName}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.lastNameValid}
          type="text"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.email')}
          name="email"
          value={this.state.email}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.emailValid}
          type="email"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.password')}
          name="password"
          value={this.state.password}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.passwordValid}
          type="password"
        />
        <UserInfoInput
          placeholder={this.props.t('signUpForm.confirmPassword')}
          name="confirmPassword"
          value={this.state.confirmPassword}
          handleOnChange={this.handleOnChange}
          handleOnBlur={this.handleOnBlur}
          valid={this.state.confirmPasswordValid}
          type="password"
        />
        <InvalidFormNotification content={currentError && this.props.t(`signUpForm.${currentError}Error`)} />
        <LoginWindowFormButton
          additionalClasses={buttonDisabledClass}
          onSumbit={this.handleOnSubmit}
          content={this.props.t('signUpForm.signUp')}
          onMouseOver={this.handleOnMouseOver}
        />
      </form>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    signUpStatus: store.userController.signUpStatus
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow()),
    signUp: (data) => dispatch(signUp(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SignUpForm));