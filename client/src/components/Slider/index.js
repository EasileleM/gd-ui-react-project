import React from 'react';

import './main.scss';
import { LoadingSpinner } from '../LoadingSpinner/index';
import { Buttons } from './Buttons/Buttons.js';
import { Images } from './Images/index.js';
import { ContentBlock } from './ContentBlock/ContentBlock.js';

import {connect} from "react-redux";
import {loadSliderData} from "../../redux/action-creators/slider/loadSliderData";

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 1,
      slidesAmount: 3,
      ready: false,
    };
  }

  componentDidMount() {
    if(!window.firstRender) {
      this.props.loadSlides(3).then(() => {
        this.setState({ slideTimer: this.switchSlideTimer() });
      });
    }
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
    if (!this.props.sliderData) {
      return (
        <div className="slider">
          <div className="slider__loading">
            <LoadingSpinner />
          </div>
        </div>);
    }else {
      return (
          <div className="slider">
            <Images
                images={this.props.sliderData.map((item) => item.sliderImg)}
                currentSlide={this.state.currentSlide}
            />
            <div className="slider__content">
              <Buttons
                  currentSlide={this.state.currentSlide}
                  onClick={(i) => this.handleOnClick(i)}
              />
              <ContentBlock
                  items={this.props.sliderData.map((item) => item.item)}
                  currentSlide={this.state.currentSlide}
              />
            </div>
          </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sliderData: state.sliderController.sliderData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSlides: (amount) => dispatch(loadSliderData(amount))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider)

