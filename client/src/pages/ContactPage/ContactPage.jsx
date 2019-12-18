import React from 'react';

import './ContactPage.scss';
import ContactGoogleMap from '../../components/ContactGoogleMap/ContactGoogleMap.jsx';

export default class ContactPage extends React.Component {
  render() {
    return <div className="contact">
      <ContactGoogleMap />
    </div>;
  }
}
