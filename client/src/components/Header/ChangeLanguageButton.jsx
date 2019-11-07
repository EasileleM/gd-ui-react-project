import React, { Component } from 'react';
import i18n from '../../i18n';
import './ChangeLanguageButton.scss';

export class ChangeLanguageButton extends Component {
  constructor() {
    super();
    i18n.changeLanguage(i18n.language);
    this.state = {
      language: i18n.language,
    };
  }

  handleOnClick = (lng) => {
    i18n.changeLanguage(lng);
    this.setState({
      language: lng
    })
  };

  render() {
    if (this.state.language === 'ru') {
      return (
        <button onClick={() => this.handleOnClick('en')} className='change-language-button'>
          ru
        </button>
      );
    }
    return (
      <button onClick={() => this.handleOnClick('ru')} className='change-language-button'>
        en
      </button>
    )
  }
}
