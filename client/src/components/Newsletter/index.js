import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import icon from "../../assets/Mail_Ico_.png";

import "./main.scss";

export class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.sendData = this.props.sendData;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        if (!event.target.checkValidity()) {
            event.target.validate();
            event.preventDefault();
        } else {
            this.sendData();
            event.preventDefault();
        }
    }

    render() {
        return (
            <Translation>
                {t =>
                    <div className="Newsletter">
                        <div className="Newsletter__text">
                            <h2 className="Newsletter__heading">{t('newsLetter.header')}</h2>
                            <p className="Newsletter__paragraph">{t('newsLetter.description')}</p>
                        </div>

                        <form className="Newsletter__form"
                            onSubmit={this.handleSubmit}>
                            <picture>
                                <img src={icon} alt="icon of an envelope" />
                            </picture>
                            <input name="email" type="email" className="Newsletter__input" value={this.state.value}
                                onChange={this.handleChange}
                                placeholder={t('newsLetter.placeholder')} />
                            <input type="submit" className="Newsletter__button" value={t('newsLetter.join')} />
                        </form>
                    </div>
                }
            </Translation>
        );
    }
}
