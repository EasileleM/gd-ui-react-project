import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { logout } from '../../redux/action-creators/user/logout';
import { closeModalWindow } from '../../redux/action-creators/modalWindow/actions';
import { changeInfo } from '../../redux/action-creators/user/changeInfo';

import './UserInfoContent.scss';
import { emailRegex, passwordRegex, minLength, maxLength, onlyLatinRussian } from '../../utils/rulesForValidation/generalRules';
import { UserInfoInput } from '../UserInfoInput/UserInfoInput';
import { LoginWindowFormButton } from '../LoginWindowFormButton/LoginWindowFormButton.jsx';
import { InvalidFormNotification } from '../InvalidFormNotification/InvalidFormNotification.jsx';

import notificationSuccess from '../../utils/notificationSuccess';

const formErrors = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  confirmPassword: null
};

export class UserInfoContent extends React.Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    password: '',
    confirmPassword: '',
    currentPassword: '',
    firstNameValid: true,
    lastNameValid: true,
    emailValid: true,
    passwordValid: true,
    confirmPasswordValid: true,
    formValid: false,
  };

  rulesForFields = {
    email: [emailRegex, minLength(0), maxLength(140)],
    password: [passwordRegex, minLength(8), maxLength(30)],
    confirmPassword: [
      (value) => this.state.password === value,
      () => {
        if (!this.state.passwordValid) {
          return null;
        }
        return true;
      }
    ],
    firstName: [onlyLatinRussian, minLength(0), maxLength(140)],
    lastName: [onlyLatinRussian, minLength(0), maxLength(140)]
  }

  handleOnLogout() {
    this.props.logout();
  }

  handleOnChange = (e) => {
    e.preventDefault();//todo fix for autosuggest
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.formValid) {
      this.props
        .saveData({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          newPassword: this.state.password,
          oldPassword: this.state.currentPassword,
        });
    }
    else {
      notificationSuccess('Заполните форму', 'Fill the form', '');
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
    let currentError = null;
    for (const key of Object.keys(formErrors)) {
      if (this.state[key + 'Valid'] === false) {
        currentError = key;
        break;
      }
    }

    return (
      <div className="user-info-content">
        <button onClick={() => this.handleOnLogout()} className="user-info-content__logout-button">{this.props.t('logout')}</button>
        <p className="user-info-content__greetings">{`${this.props.t('welcome')}, ${this.props.firstName}!`}</p>
        <form style={{ display: this.props.display }} onSubmit={this.handleOnSubmit} method="POST" className="user-info-content__form">
          <div className="user-info-content__wrapper_line">
            <div className="user-info-content__wrapper_labeled">
              <label className="user-info-content__text">
                {this.props.t('userInfoContent.firstName')}
              </label>
              <UserInfoInput
                placeholder={this.props.t('userInfoContent.firstName')}
                name="firstName"
                value={this.state.firstName}
                handleOnChange={this.handleOnChange}
                handleOnBlur={this.handleOnBlur}
                valid={this.state.firstNameValid}
                type="text"
                maxLength="140"
              />
            </div>
            <div className="user-info-content__wrapper_labeled">
              <label className="user-info-content__text">
                {this.props.t('userInfoContent.lastName')}
              </label>
              <UserInfoInput
                placeholder={this.props.t('userInfoContent.lastName')}
                name="lastName"
                id="lastName"
                value={this.state.lastName}
                handleOnChange={this.handleOnChange}
                handleOnBlur={this.handleOnBlur}
                valid={this.state.lastNameValid}
                type="text"
                maxLength="140"
              />
            </div>
          </div>
          <div className="user-info-content__wrapper_line">
            <div className="user-info-content__wrapper_labeled">
              <label className="user-info-content__text">
                {this.props.t('userInfoContent.email')}
              </label>
              <UserInfoInput
                placeholder={this.props.t('userInfoContent.email')}
                name="email"
                id="email"
                value={this.state.email}
                handleOnChange={this.handleOnChange}
                handleOnBlur={this.handleOnBlur}
                valid={this.state.emailValid}
                type="email"
                maxLength="140"
              />
            </div>
          </div>
          <div className="user-info-content__wrapper_line">
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.password')}
              name="password"
              id="password"
              value={this.state.password}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              valid={this.state.passwordValid}
              type="password"
              maxLength="140"
            />
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.confirmPassword')}
              name="confirmPassword"
              id="confirmPassword"
              value={this.state.confirmPassword}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              valid={this.state.confirmPasswordValid}
              type="password"
              maxLength="140"
            />
          </div>
          <div className="user-info-content__wrapper_line">
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.currentPassword')}
              name="currentPassword"
              id="currentPassword"
              value={this.state.currentPassword}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              type="password"
              maxLength="140"
            />
          </div>
          <div className="user-info-content__message">
            <InvalidFormNotification content={currentError && this.props.t(`userInfoContent.${currentError}Error`)} />
          </div>
          <LoginWindowFormButton additionalClasses={buttonDisabledClass} onSumbit={this.handleOnSubmit} content={this.props.t('userInfoContent.save')} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.userController.firstName,
    lastName: state.userController.lastName,
    email: state.userController.email,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow()),
    saveData: (data) => dispatch(changeInfo(data)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserInfoContent));