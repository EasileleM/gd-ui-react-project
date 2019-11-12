import React from 'react';
import {SLIDER_HEIGHT} from '../../../constants/index';

function Image(props) {
  return (
    <div className="slider__image-wrapper">
      <img src={props.src} className="slider__image" alt="Main item" />
    </div>
  )
}

export class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.setState({currentOffset: { top: (-this.props.currentSlide * SLIDER_HEIGHT) }});
  }

  componentDidUpdate() {
    const currentOffset = -this.props.currentSlide * SLIDER_HEIGHT;
    if (this.state.currentOffset.top !== currentOffset) {
      this.setState({currentOffset: { top: currentOffset }});
    }
  }

  render() {
    return (
      <div className="slider__images" style={this.state.currentOffset}>
        <Image src={this.props.images[0]} />
        <Image src={this.props.images[1]} />
        <Image src={this.props.images[2]} />
      </div>
    )
  }
}