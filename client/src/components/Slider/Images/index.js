import React, { PureComponent } from 'react';

function Image(props) {
  return (
    <div className="slider__image-wrapper">
      <img src={props.src} className="slider__image" alt="Main item" />
    </div>
  )
}

export class Images extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOffset: { top: (-props.switchFrom * 650) }
    }
  }

  render() {
    setTimeout(() => this.setState({currentOffset: { top: (-this.props.switchTo * 650) }}));

    return (
      <div className="slider__images" style={this.state.currentOffset}>
        <Image src={this.props.images[0]} />
        <Image src={this.props.images[1]} />
        <Image src={this.props.images[2]} />
      </div>
    )
  }
}