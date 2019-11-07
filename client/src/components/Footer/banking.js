import React from 'react';
import { Translation } from 'react-i18next';

import './main.scss';

class Banking extends React.Component {
  render() {
    return (
      <Translation>
        {t =>
          <section className="footer__wrapper footer__wrapper_column">
            <div className="footer__text footer__text_promoted">
            {t('footer.banking')}
            </div>
            <div className="footer__cards"></div>
          </section>
        }
      </Translation>
    );
  }
}

export default Banking;