import React from 'react';

import './footer.scss';

class Banking extends React.Component {
  render() {
    return (
      <section>
        <div className="footer__text">
          Payment methods
        </div>
        <div className="footer__cards"></div>
      </section>
    );
  }
}

export default Banking;