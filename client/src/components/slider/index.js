import React from 'react';

import './main.scss';
import { LoadingSpinner } from '../LoadingSpinner/index';
import { Buttons } from './buttons/index.js';
import { Images } from './Images/index.js';
import { ContentBlock } from './contentBlock/index.js';

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previousSlide: 1,
      currentSlide: 1,
      slidesAmount: 3,
      ready: false
    };
    this.slideTimer = this.switchSlideTimer();
  }

  componentDidMount() {
    this.loadResources(3);
  }

  componentWillUnmount() {
    clearInterval(this.slideTimer);
  }

  async loadResources(amount) {
    const request = await fetch(`https://gd-ui-react-project-server.herokuapp.com/api/slider?amount=${this.state.slidesAmount}`);
    const result = await request.json();
    this.setState({
      ready: true,
      data: result
    })
  }

  switchSlideTimer() {
    return setInterval(() => {
      const nextSlide = 
        this.state.currentSlide === this.state.slidesAmount - 1
        ? 0 : this.state.currentSlide + 1;
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
    clearInterval(this.slideTimer);
    this.slideTimer = this.switchSlideTimer();
  }

  render() {
    if (!this.state.ready) {
      return (<div className="slider">
        <div className="slider__loading">
          <LoadingSpinner />
        </div>
      </div>);
    }
    return (
      <div className="slider">
        <Images
          images={this.state.data.map((item) => item.sliderImg)}
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
            items={this.state.data.map((item) => item.item)}
            switchFrom={this.state.previousSlide}
            switchTo={this.state.currentSlide}
          />
        </div>
      </div>
    )
  }
}

