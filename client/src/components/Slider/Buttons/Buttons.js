import React from 'react';

export class Buttons extends React.Component {
  renderButton(i) {
    if (i === this.props.currentSlide) {
      return <Button additionalClass='slider__button_activate' onClick={() => this.props.onClick(i)} />;
    }
    return <Button onClick={() => this.props.onClick(i)} />;
  }

  componentDidMount(){}

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

export function Button(props) {
  const className = "slider__button " + props.additionalClass || "";
  return (
    <button onClick={props.onClick} className={className}></button>
  )
}