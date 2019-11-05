import React from 'react';

import './main.scss';

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
