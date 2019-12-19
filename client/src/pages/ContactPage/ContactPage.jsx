import React from 'react';
import { withTranslation } from 'react-i18next';

import './ContactPage.scss';

import ContactGoogleMap from '../../components/ContactGoogleMap/ContactGoogleMap.jsx';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm.jsx';

export class ContactPage extends React.Component {
  render() {
    return <div className="contact">
      <ContactGoogleMap />
      <FeedbackForm />
    </div>;
  }
}

export default withTranslation()(ContactPage);