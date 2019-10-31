import React from 'react';

import './show-more-button.scss';

export class ShowMoreButton extends React.Component {
  constructor() {
    super();
    this.state ={};
  }
  
  render() {
    return (
      <button className='show-more-button'>
        ···
      </button>
    );
  }
}
