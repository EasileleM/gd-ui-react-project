import React from 'react';
import { withTranslation } from 'react-i18next';

import './AboutPage.scss';

import { SectionHeader } from '../../components/SectionHeader/SectionHeader.jsx';
import { PictureWithHeader } from '../../components/PictureWithHeader/PictureWithHeader.jsx';

import aboutImageHeader from '../../assets/aboutImageHeader.jpeg';
import PersonBlock from '../../components/PersonBlock/PersonBlock';

export class AboutPage extends React.Component {
  render() {
    return <div className="about">
      <PictureWithHeader headerLeft={this.props.t('about.team.header.left')} headerRight={this.props.t('about.team.header.right')} image={aboutImageHeader} />
      <PersonBlock />
      <SectionHeader title_colored={this.props.t('about.gd.header.left')} title={this.props.t('about.gd.header.right')} />
      <div className="about__info-wrapper">
        <p className="about__info">
          {this.props.t('about.gd.text')}
        </p>
      </div>
      <SectionHeader title_colored={this.props.t('about.shopInfo.header.left')} title={this.props.t('about.shopInfo.header.right')} />
      <div className="about__info-wrapper">
        <p className="about__info">
          {this.props.t('about.shopInfo.text')}
        </p>
      </div>
    </div>;
  }
}

export default withTranslation()(AboutPage);
