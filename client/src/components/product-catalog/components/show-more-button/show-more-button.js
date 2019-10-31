import React from 'react';

import './show-more-button.scss';

export class ShowMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  
  render() {
    return (
      <button onClick={this.props.onClick} className='show-more-button'>
        ...
      </button>
    );
  }
}
