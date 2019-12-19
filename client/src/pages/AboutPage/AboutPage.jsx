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
      <SectionHeader title_colored={this.props.t('about.shopInfo.left')} title={this.props.t('about.shopInfo.right')} />
      <div className="about__info-wrapper">
        <p className="about__info">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptates expedita voluptate odit dicta, explicabo, nemo non in itaque eius ipsam necessitatibus commodi praesentium quisquam quae distinctio error labore illo.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptates expedita voluptate odit dicta, explicabo, nemo non in itaque eius ipsam necessitatibus commodi praesentium quisquam quae distinctio error labore illo.
      </p>
        <p className="about__info">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptates expedita voluptate odit dicta.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptates expedita voluptate odit dicta.
      </p>
      </div>
    </div>;
  }
}

export default withTranslation()(AboutPage);
