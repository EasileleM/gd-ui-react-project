import React from 'react';

import './PictureWithHeader.scss';

export function PictureWithHeader({ headerLeft, headerRight, image }) {
  return <div style={{ backgroundImage: `url(${image})` }} className="picture-width-header">
    <div className="picture-width-header__content">
      <h2 className="picture-width-header__header">
        {headerLeft}<span className="picture-width-header__header_colored">{headerRight}</span>
      </h2>
    </div>
  </div>
}