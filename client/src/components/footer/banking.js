import React from 'react';

import './footer.scss';

class Banking extends React.Component {
  render() {
    return (
      <section className="footer__wrapper footer__wrapper_column">
        <div className="footer__text footer__text_promoted">
          Payment Methods
        </div>
        <div className="footer__cards"></div>
      </section>
    );
  }
}

export default Banking;