import React from 'react';

import {ReactComponent as Loading} from '../../assets/loading.svg';
import './main.scss';

export function LoadingSpinner() {
  return (
    <Loading className="loading-spinner"/>
  )
}