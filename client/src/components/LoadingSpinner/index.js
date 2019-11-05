import React from 'react';

import loading from '../../assets/loading.svg';
import './main.scss';

export function LoadingSpinner() {
  return (
    <img src={loading} className="loading-spinner" alt="loading"/>
  )
}