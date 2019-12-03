import React from 'react';

import './CloseButton.scss';

export class CloseButton extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <button onClick={this.props.onClick} tabIndex="1" className="card-window__close-button">✕</button>
    )
  }

}

export default CloseButton;
