import React, { Component } from 'react';
import "./ErrorPage.scss"
import i18n from '../../i18n';

class ErrorPage extends Component {

  render() {
    let message = '';
    if (i18n.language === 'ru') {
      if (this.props.error === 404) {
        message = 'Страница не найдена.'
      }
      if (this.props.error === 400) {
        message = 'Неверный запрос.'
      }
      if (this.props.error === 500) {
        message = 'Сервер недоступен, попробуйте вернуться позднее.'
      }
    } else {
      if (this.props.error === 404) {
        message = 'Page you\'re looking for is nowhere to be found.'
      }
      if (this.props.error === 400) {
        message = 'Bad request.'
      }
      if (this.props.error === 500) {
        message = 'Server is not available, try to reconnect later.'
      }
    }
    return (
      <div className="error-page">
        <h1 className="error-page__header">{this.props.error}</h1>
        <p className="error-page__paragraph">{message}</p>
      </div>
    );
  }
}

export default ErrorPage;