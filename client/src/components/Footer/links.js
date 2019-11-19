import React from 'react';
import { Translation } from 'react-i18next';

import './main.scss';

class Links extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Translation>
        {t =>
          <section className="footer__mobile footer__wrapper footer__wrapper_links">
            <div className="footer__wrapper_column">
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.about')}
                </a>
              </div>
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.contact')}
                </a>
              </div>
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.support')}
                </a>
              </div>
            </div>
            <div className="footer__wrapper_column">
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.feed')}
                </a>
              </div>
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.terms')}
                </a>
              </div>
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.privacy')}
                </a>
              </div>
            </div>
            <div className="footer__wrapper_column">
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.join')}
                </a>
              </div>
              <div className="footer__link-wrapper">
                <a className="footer__link" href="google.com">
                  {t('footer.live')}
                </a>
              </div>
            </div>
          </section>
        }
      </Translation>
    );
  }
}

export default Links;