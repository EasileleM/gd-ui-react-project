import React from 'react';

import './SectionHeader.scss';

export class SectionHeader extends React.Component {
  render() {
    return (
      <div
        className={`section-header
          ${this.props.margin ? `section-header_${this.props.margin}` : ''}
        `}
      >
        <div className='section-header__title'>
          <span className='section-header__title section-header__title_colored'>{this.props.title_colored}</span>{this.props.title}
        </div>
        <div className='section-header__description'>
          {this.props.description}
        </div>
      </div>
    );
  }
}