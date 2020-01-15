import React from 'react';

import './main.scss';
import {withTranslation} from "react-i18next";

class Banking extends React.Component {
  render() {
      const t = this.props.t;

      return (
      <section className="footer__mobile footer__wrapper footer__wrapper_column">
        <div className="footer__text footer__text_promoted">
          {t('footer.banking')}
        </div>
        <div className="footer__cards"></div>
      </section>
    );
  }
}

export default withTranslation()(Banking);