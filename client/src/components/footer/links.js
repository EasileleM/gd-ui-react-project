import React from 'react';

import './footer.scss';

class Links extends React.Component {
  render() {
    return (
      <section className="footer__wrapper footer__wrapper_column-wrap">
        <a className="footer__link" href="#">
          about us
        </a>
        <a className="footer__link" href="#">
          contact us
        </a>
        <a className="footer__link" href="#">
          support
        </a>
        <a className="footer__link" href="#">
          our feed
        </a>
        <a className="footer__link" href="#">
          terms and conditions
        </a>
        <a className="footer__link" href="#">
          our privacy
        </a>
        <a className="footer__link" href="#">
          join us
        </a>
        <a className="footer__link" href="#">
          live support
        </a>
      </section>
    );
  }
}

export default Links;