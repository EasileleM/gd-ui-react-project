import React from 'react';

import dots from '../../../assets/dots.svg';
import loadingDots from '../../../assets/loadingDots.svg';

import './main.scss';

export function ShowMoreButton(props){
  let buttonImage = dots;
  if (!props.ready) {
    buttonImage = loadingDots;
  }
  return (
    <button onClick={props.onClick} className='show-more-button'>
      <img src={buttonImage} className="show-more-button__image" alt="loading"/>
    </button>
  );
}
