import React, { PureComponent } from 'react';

import { Item } from '../Item/index';
import {Link} from "react-router-dom";

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