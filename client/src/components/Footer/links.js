import React from 'react';

import './main.scss';

class Links extends React.Component {
  render() {
    return (
      <section className="footer__wrapper footer__wrapper_column-wrap">
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            about us
          </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            contact us
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            support
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            our feed
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            terms and conditions
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            our privacy
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            join us
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="google.com">
            live support
        </a>
        </div>
      </section>
    );
  }
}

export default Links;