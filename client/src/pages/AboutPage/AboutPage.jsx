import React from 'react';
import { withTranslation } from 'react-i18next';

import './AboutPage.scss';

import { SectionHeader } from '../../components/SectionHeader/SectionHeader.jsx';

export class AboutPage extends React.Component {
  render() {
    return <div className="contact">
      <SectionHeader
        additionalClass="section-header_margin-small"
        title_colored={this.props.t('about.our-team-left')}
        title={this.props.t('about.our-team-right')} />
        <SectionHeader
        additionalClass="section-header_margin-small"
        title_colored={this.props.t('about.our-mentors-left')}
        title={this.props.t('about.our-mentors-right')} />
    </div>;
  }
}

export default withTranslation()(AboutPage);