import React, { PureComponent } from 'react';

import { Item } from '../item/index';

export class ContentBlock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOffset: { top: (-props.switchFrom * 650) }
    }
  }

  render() {
    setTimeout(() => this.setState({ currentOffset: { top: (-this.props.switchTo * 650) } }));
    return (
      <div className="slider__content-block" style={this.state.currentOffset}>
        <Item data={this.props.items[0]} show={0 === Number(this.props.switchTo)} />
        <Item data={this.props.items[1]} show={1 === Number(this.props.switchTo)} />
        <Item data={this.props.items[2]} show={2 === Number(this.props.switchTo)} />
      </div>
    )
  }
}