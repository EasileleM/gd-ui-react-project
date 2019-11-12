import React, { PureComponent } from 'react';

export class Buttons extends PureComponent {
  renderButton(i) {
    if (i === this.props.currentSlide) {
      return <Button class='slider__button_activate' onClick={() => this.props.onClick(i)} />;
    }
    return <Button onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div className="slider__button-container">
        {this.renderButton(0)}
        {this.renderButton(1)}
        {this.renderButton(2)}
      </div>
    )
  }
}

function Button(props) {
  const className = "slider__button " + props.class || "";
  return (
    <button onClick={props.onClick} className={className}></button>
  )
}