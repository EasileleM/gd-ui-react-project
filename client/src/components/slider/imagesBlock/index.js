import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';

function Image(props) {
  return (
    <div className="slider__image-wrapper">
      <img src={props.src} className="slider__image" alt="Main item" />
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
            <Image src={this.props.images[0]}/>
            <Image src={this.props.images[1]}/>
            <Image src={this.props.images[2]}/>
          </div>
        )}
      </Transition>
    )
  }
  
}