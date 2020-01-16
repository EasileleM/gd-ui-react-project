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

  handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    document.location.reload();
  }

  render() {
    return (
        <label>
          <select value={i18n.language} onChange={this.handleChange}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="gr">ελληνικά</option>
            <option value="fr">Français</option>
          </select>
        </label>
    )
  }
}

export default ChangeLanguageButton;