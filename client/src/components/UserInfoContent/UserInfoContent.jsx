import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { logout } from '../../redux/action-creators/user/logout';
import { closeModalWindow } from '../../redux/action-creators/modalWindow/actions';
import { signUp } from '../../redux/action-creators/user/signUp';

import './UserInfoContent.scss';
import { EMAIL_REGEX, PASSWORD_REGEX, FIRST_NAME_REGEX, LAST_NAME_REGEX } from '../../constants/constants';
import { UserInfoInput } from '../UserInfoInput/UserInfoInput';
import { LoginWindowFormButton } from '../LoginWindowContent/LoginWindowFormButton/LoginWindowFormButton';
import { InvalidFormNotification } from '../LoginWindowContent/InvalidFormNotification/InvalidFormNotification';

import notificationSuccess from '../../utils/notificationSuccess';

const formErrors = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  confirmPassword: null
};

export class UserInfoContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      currentPassword: '',
      firstNameValid: null,
      lastNameValid: null,
      emailValid: null,
      passwordValid: null,
      confirmPasswordValid: null,
      formValid: false,
    };
  }

  handleOnLogout() {
    this.props.logout();
  }

  handleOnChange = (e) => {
    e.preventDefault();
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
          password: this.state.password,
          currentPassword: this.state.currentPassword,
        });
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
    };

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
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.firstName')}
              name="firstName"
              value={this.props.firstName}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              valid={this.state.firstNameValid}
              type="text"
              maxLength="140"
            />
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.lastName')}
              name="lastName"
              value={this.props.lastName}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              valid={this.state.lastNameValid}
              type="text"
              maxLength="140"
            />
          </div>
          <div className="user-info-content__wrapper_line">
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.email')}
              name="email"
              value={this.props.email}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              valid={this.state.emailValid}
              type="email"
              maxLength="140"
            />
          </div>
          <div className="user-info-content__wrapper_line">
            <UserInfoInput
              placeholder={this.props.t('userInfoContent.password')}
              name="password"
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
              value={this.state.currentPassword}
              handleOnChange={this.handleOnChange}
              handleOnBlur={this.handleOnBlur}
              type="password"
              maxLength="140"
            />
          </div>
          <InvalidFormNotification content={currentError && this.props.t(`userInfoContent.${currentError}Error`)} />
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
    saveData: (data) => dispatch(signUp(data)),
    logout: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserInfoContent));