import React from 'react';

import './main.scss';

export const SectionHeader = ({ title_colored, title, description }) => {
  return (
    <div className='section-header'>
      <div className='section-header__title'>
        <span className='section-header__title section-header__title_colored'>{title_colored}</span>&nbsp;{title}
      </div>
      <div className='section-header__description'>
        {description}
      </div>
    </div>
  );
}