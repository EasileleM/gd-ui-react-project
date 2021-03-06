import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

import icon from "../../assets/Mail_Ico_.png";

import "./Newsletter.scss";
import sendEmail from "../../utils/sendEmail";
import i18n from '../../i18n';

export class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (!event.target.checkValidity()) {
      event.target.validate();
      event.preventDefault();
    } else {
      sendEmail({email: this.state.value}).then(res => {
        if (res.status === 201) {
          let message = "Sucessfully send";
          if (i18n.language === 'ru') {
            message = "Отправлено";
          }
          (() => {toast(message, {type: toast.TYPE.INFO})}
          )();
          this.setState({value: ""});
        } else {
          let message = "Can't send";
          if (i18n.language === 'ru') {
            message = "Ошибка при отправке";
          }
          (() => toast(message, {type: toast.TYPE.ERROR}))();
        }
      }).catch(err => {
        let message = "Can't send";
        if (i18n.language === 'ru') {
          message = "Ошибка при отправке";
        }
        (() => toast(message, {type: toast.TYPE.ERROR}))();
      });
      event.preventDefault();
    }
  }

  componentDidMount() {
  }

  render() {
    return (
        <div className="Newsletter">
          <div className="Newsletter__text">
            <h2 className="Newsletter__heading">{this.props.t('newsLetter.header')}</h2>
            <p className="Newsletter__paragraph">{this.props.t('newsLetter.description')}</p>
          </div>

          <form className="Newsletter__form"
                onSubmit={this.handleSubmit}>
            <picture>
              <img src={icon} alt="icon of an envelope"/>
            </picture>
            <input name="email" type="email"
                   className="Newsletter__input"
                   value={this.state.value}
                   onChange={this.handleChange}
                   placeholder={this.props.t('newsLetter.placeholder')}/>
            <input type="submit" className="Newsletter__button" value={this.props.t('newsLetter.join')}/>
          </form>
        </div>
    );
  }
}

export default withTranslation()(Newsletter)