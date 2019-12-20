import React from 'react';
import { withTranslation } from 'react-i18next';

import './FeedbackForm.scss';

import { emailRegex, minLength, maxLength, onlyLatinRussian } from '../../utils/rulesForValidation/generalRules';
import notificationSuccess from '../../utils/notificationSuccess';
import sendFeedback from '../../utils/sendFeedback';
import TextAreaInput from '../TextAreaInput/TextAreaInput.jsx';

import { UserInfoInput } from '../UserInfoInput/UserInfoInput.jsx';
import { LoginWindowFormButton } from '../LoginWindowFormButton/LoginWindowFormButton.jsx';
import { InvalidFormNotification } from '../InvalidFormNotification/InvalidFormNotification';
import { SectionHeader } from '../SectionHeader/SectionHeader.jsx';

const formErrors = {
  email: null,
  feedback: null,
  name: null
};

export class FeedbackForm extends React.Component {
  state = {
    email: '',
    feedback: '',
    name: '',
    nameValid: null,
    emailValid: null,
    feedbackValid: null
  };

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  rulesForFields = {
    email: [emailRegex, minLength(1), maxLength(140)],
    feedback: [minLength(5), maxLength(400)],
    name: [onlyLatinRussian, minLength(1), maxLength(140)]
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
    this.setState(currentStateUpdate, () => {
      this.setState({
        formValid:
          this.state.emailValid && this.state.feedbackValid && this.state.nameValid
      });
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.formValid) {
      const data = {
        feedback: this.state.feedback,
        email: this.state.email,
        name: this.state.name
      };
      sendFeedback(data)
        .then(() => {
          notificationSuccess('Спасибо за ваш отзыв!', 'Thanks you for feedback!', '');
        });
    }
    else {
      notificationSuccess('Заполните форму.', 'Fill the form.', '');
    }
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

    return <form
      onSubmit={this.handleOnSubmit}
      method="POST"
      className="feedback-form">
      <SectionHeader
        additionalClass="section-header_margin-small"
        title_colored={this.props.t('leave-feedback-left')}
        title={this.props.t('leave-feedback-right')} />
      <UserInfoInput
        placeholder={this.props.t('FeedbackForm.name')}
        type="text"
        name="name"
        value={this.state.name}
        handleOnChange={this.handleOnChange}
        valid={this.state.nameValid}
        additionalClasses="user-info-input_width-auto"
        handleOnBlur={this.handleOnBlur}
      />
      <UserInfoInput
        placeholder={this.props.t('FeedbackForm.email')}
        type="email"
        name="email"
        value={this.state.email}
        handleOnChange={this.handleOnChange}
        valid={this.state.emailValid}
        additionalClasses="user-info-input_width-auto"
        handleOnBlur={this.handleOnBlur}
      />
      <TextAreaInput
        handleOnChange={this.handleOnChange}
        value={this.state.feedback}
        name="feedback"
        placeholder={this.props.t('FeedbackForm.feedback')}
        valid={this.state.feedbackValid}
        handleOnBlur={this.handleOnBlur}
      />
      <InvalidFormNotification
        additionalClasses="login-window-content__form-error-notification_centered"
        content={currentError && this.props.t(`FeedbackForm.${currentError}Error`)} />
      <LoginWindowFormButton
        additionalClasses={`${buttonDisabledClass} login-window-content__form-button_width-auto login-window-content__form-button_margin-top`}
        content={this.props.t('FeedbackForm.button')}
        onMouseOver={this.handleOnMouseOver} />
    </form>;
  }
}


export default withTranslation()(FeedbackForm);