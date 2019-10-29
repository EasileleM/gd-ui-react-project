import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';

import Layer1 from '../assets/Layer_1.png';

function Image() {
  return (
    <div className="slider__image-wrapper">
      <img src={Layer1} className="slider__image" alt="Main item" />
    </div>
  )
}

export class Images extends PureComponent {

  

  render() {
    const transitionStyles = {
      entering: { top: (-this.props.switchFrom * 650) },
      entered: { top: (-this.props.switchFrom * 650 / 2) },
      exiting: { top: (-this.props.switchTo * 650 / 2) },
      exited: { top: (-this.props.switchTo * 650) },
    };

    return (
      <Transition in={false} timeout={200}>
        {state => (
          <div className="slider__images" style={transitionStyles[state]}>
            <Image />
            <Image />
            <Image />
          </div>
        )}
      </Transition>
    )
  }
  
}