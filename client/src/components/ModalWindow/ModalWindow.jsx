import React from 'react';

import CloseButton from './CloseButton/CloseButton';

import './ModalWindow.scss';

export class ModalWindow extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="modal-window">
        <button className="modal-window__background" onClick={this.props.onClick}></button>
        <div className="modal-window__content">
          <CloseButton onClick={this.props.onClick} />
          {this.props.content}
        </div>
      </div>
    )
  }
}
