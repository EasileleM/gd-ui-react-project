import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { closeModalWindow } from '../../../redux/action-creators/modalWindow/actions';

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
        <div className="modal-window__content-top">
          <h2 className="modal-window__header">{props.t(`${props.name}Header`)}</h2>
          <CloseButton onClick={props.close} />
        </div>

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

export default connect(null, mapDispatchToProps)(withTranslation()(ModalWindow));
