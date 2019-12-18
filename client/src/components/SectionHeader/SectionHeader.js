import React from 'react';

import './SectionHeader.scss';

export class SectionHeader extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className='section-header'>
        <div className='section-header__title'>
          <span className='section-header__title section-header__title_colored'>{this.props.title_colored}</span>&nbsp;{this.props.title}
        </div>
        {this.props.description ?
        <div className='section-header__description'>
          {this.props.description}
        </div> : null}

      </div>
    );
  }
}