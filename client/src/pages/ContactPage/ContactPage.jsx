import React from 'react';
import { withTranslation } from 'react-i18next';

import './ContactPage.scss';

import { SectionHeader } from '../../components/SectionHeader/SectionHeader.jsx';
import ContactGoogleMap from '../../components/ContactGoogleMap/ContactGoogleMap.jsx';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm.jsx';

export class ContactPage extends React.Component {
  render() {
    return <div className="contact">
      <ContactGoogleMap />
      <SectionHeader
        additionalClass="section-header_margin-small"
        title_colored={this.props.t('leave-feedback-left')}
        title={this.props.t('leave-feedback-right')} />
      <FeedbackForm />
    </div>;
  }
}

export default withTranslation()(ContactPage);