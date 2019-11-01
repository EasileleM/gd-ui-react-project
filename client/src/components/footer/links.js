import React from 'react';

import './footer.scss';

class Links extends React.Component {
  render() {
    return (
      <section className="footer__wrapper footer__wrapper_column-wrap">
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            about us
          </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            contact us
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            support
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            our feed
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            terms and conditions
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            our privacy
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            join us
        </a>
        </div>
        <div className="footer__link-wrapper">
          <a className="footer__link" href="#">
            live support
        </a>
        </div>
      </section>
    );
  }
}

export default Links;