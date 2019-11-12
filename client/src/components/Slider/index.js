import React from 'react';

import './main.scss';
import { LoadingSpinner } from '../LoadingSpinner/index';
import { Buttons } from './Buttons/index.js';
import { Images } from './Images/index.js';
import { ContentBlock } from './ContentBlock/index.js';
import loadSlides from "../../utils/loadSlides";

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 1,
      slidesAmount: 3,
      ready: false
    };
  }

  componentDidMount() {
    loadSlides(3).then(res => {
      this.setState({
        ready: true,
        data: res.data
      })
    }).catch((error) => {
      error.notify();
    });
    this.setState({ slideTimer: this.switchSlideTimer() });
  }

  componentWillUnmount() {
    clearTimeout(this.state.slideTimer);
  }

  switchSlideTimer() {
    return setTimeout(() => {
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
    clearTimeout(this.state.slideTimer);
    const newTimer = this.switchSlideTimer();
    this.setState({ slideTimer: newTimer, currentSlide: i })
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="slider">
          <div className="slider__loading">
            <LoadingSpinner />
          </div>
        </div>);
    }
    return (
      <div className="slider">
        <Images
          images={this.state.data.map((item) => item.sliderImg)}
          currentSlide={this.state.currentSlide}
        />
        <div className="slider__content">
          <Buttons
            currentSlide={this.state.currentSlide}
            onClick={(i) => this.handleOnClick(i)}
          />
          <ContentBlock
            items={this.state.data.map((item) => item.item)}
            currentSlide={this.state.currentSlide}
          />
        </div>
      </div>
    )
  }
}

