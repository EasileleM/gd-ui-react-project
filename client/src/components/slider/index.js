import React from 'react';

import './main.scss';
import { Buttons } from './buttons/index.js';
import {Images} from './imagesBlock/index.js';
import {ContentBlock} from './contentBlock/index.js';

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previousSlide: 1,
      currentSlide: 1
    };

    this.switchSlide = this.switchSlideTimer();
  }

  switchSlideTimer() {
    return setInterval(() => {
      const nextSlide = this.state.currentSlide === 2 ? 0 : this.state.currentSlide + 1;
      this.handleOnClick(nextSlide);
    }, 10000);
  }


  handleOnClick(i) {
    if (i === this.state.currentSlide) {
      return;
    }
    this.setState({
      previousSlide: this.state.currentSlide,
      currentSlide: i
    })
    clearInterval(this.switchSlide);
    this.switchSlide = this.switchSlideTimer();
  }

  render() {
    return (
      <div className="slider">
        <Images
          switchFrom={this.state.previousSlide}
          switchTo={this.state.currentSlide}
        />
        <div className="slider__content">
          <Buttons
            switchFrom={this.state.previousSlide}
            switchTo={this.state.currentSlide}
            onClick={(i) => this.handleOnClick(i)}
          />
          <ContentBlock
            switchFrom={this.state.previousSlide}
            switchTo={this.state.currentSlide}
          />
        </div>
      </div>
    )
  }
}

