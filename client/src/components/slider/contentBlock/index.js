import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';

import { Item } from '../item/index';

export class ContentBlock extends PureComponent {
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
          <div className="slider__content-block" style={transitionStyles[state]}>
            <Item data={this.props.items[0]} show={0 === Number(this.props.switchTo)}/>
            <Item data={this.props.items[1]} show={1 === Number(this.props.switchTo)}/>
            <Item data={this.props.items[2]} show={2 === Number(this.props.switchTo)}/>
          </div>
        )}
      </Transition>
    )
  }
}