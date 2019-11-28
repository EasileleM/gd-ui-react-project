import React from 'react';
import { connect } from 'react-redux';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow-action-creator';

import CloseButton from '../CloseButton/CloseButton';

import './ModalWindow.scss';

export function ModalWindow(props) {
  if (!props.currentContent) {
    return null;
  }
  return (
    <div className="modal-window">
      <button className="modal-window__background" onClick={props.close}></button>
      <div className={`modal-window__content ${props.additionalClasses || ''}`}>
        <CloseButton onClick={props.close} />
        {props.currentContent}
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeModalWindow())
  }
};

export default connect(null, mapDispatchToProps)(ModalWindow);
