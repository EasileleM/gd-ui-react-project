import React from 'react';

import Dots from '../../../assets/dots.svg';
import LoadingDots from '../../../assets/loadingDots.svg';

import './main.scss';

export function ShowMoreButton(props){
  return (
    <button onClick={props.onClick} className='show-more-button'>
      {
        props.loading ? <LoadingDots className="show-more-button__image"/> : <Dots className="show-more-button__image"/>
      }
    </button>
  );
}
