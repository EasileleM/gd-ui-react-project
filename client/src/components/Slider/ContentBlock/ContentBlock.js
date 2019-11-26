import React from 'react';
import {SLIDER_HEIGHT} from '../../../constants/constants';

import Item from '../Item/index';

export class ContentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.setState({ currentOffset: { top: (-this.props.currentSlide * SLIDER_HEIGHT) } });
  }

  componentDidUpdate() {
    const currentOffset = -this.props.currentSlide * SLIDER_HEIGHT;
    if (this.state.currentOffset.top !== currentOffset) {
      this.setState({ currentOffset: { top: currentOffset } });
    }
  }

  render() {
    return (
      <div className="slider__content-block" style={this.state.currentOffset}>
        <Item data={this.props.items[0]} show={0 === Number(this.props.currentSlide)} />
        <Item data={this.props.items[1]} show={1 === Number(this.props.currentSlide)} />
        <Item data={this.props.items[2]} show={2 === Number(this.props.currentSlide)} />
      </div>
    )
  }
}