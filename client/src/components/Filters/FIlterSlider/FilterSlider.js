import React, {Component} from 'react';
import "./FilterSlider.scss"
import ReactSlider from 'react-slider'
import store from "../../../redux/store";
import {changeMinPriceFilter, changeMaxPriceFilter} from "../../../redux/action-creators/filter/actions";


export class FilterSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxValue: props.maxValue,
      minValue: props.minValue,
      minChosenValue: props.minValue,
      maxChosenValue: props.maxValue,
      minDistanceBetweenThumbs: ((props.maxValue - props.minValue) / 100) * 20
    }
  }

  handleChange = (chosenValues) => {
    const [minChosenValue, maxChosenValue] = chosenValues;
    this.setState({minChosenValue, maxChosenValue});
  };

  handleInputChange = (e) => {
    const value = Number(e.target.value.replace(/\D/g, ''));
    if (Number.isInteger(value)) {
      switch (e.target.name) {
        case "from":
          if (value < this.state.minValue) {
            this.setState({minChosenValue: this.state.minValue});
          } else if (value > this.state.maxChosenValue) {
            this.setState({minChosenValue: this.state.maxChosenValue});
          } else {
            this.setState({minChosenValue: value});
          }
          break;
        case "to":
          if (value > this.state.maxValue) {
            this.setState({maxChosenValue: this.state.maxValue});
          } else if (value < this.state.minChosenValue) {
            this.setState({maxChosenValue: this.state.minChosenValue});
          } else {
            this.setState({maxChosenValue: value});
          }
          break;
        default: break;
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.maxChosenValue !== this.state.maxChosenValue) {
      if (this.state.maxChosenValue === this.state.maxValue) {
        store.dispatch(changeMaxPriceFilter(null));
      } else {
        store.dispatch(changeMaxPriceFilter(this.state.maxChosenValue));
      }
    }
    if (prevState.minChosenValue !== this.state.minChosenValue) {
      if (this.state.minChosenValue === this.state.minValue) {
        store.dispatch(changeMinPriceFilter(null));
      } else {
        store.dispatch(changeMinPriceFilter(this.state.minChosenValue));
      }
    }
  }

  componentDidMount() {
    const minChosenValue = store.getState().filterController.minPrice;
    const maxChosenValue = store.getState().filterController.maxPrice;
    if (minChosenValue && maxChosenValue) {
      this.setState({minChosenValue, maxChosenValue});
    }
  }

  render() {
    return (
        <div className="filter-slider">
          <ReactSlider
              key={`${this.props.slideIn}`}
              className="filter-slider__slider"
              thumbClassName="filter-slider__thumb"
              trackClassName="filter-slider__track"
              value={[this.state.minChosenValue, this.state.maxChosenValue]}
              max={this.state.maxValue}
              min={this.state.minValue}
              onAfterChange={this.handleChange}
              renderThumb={
                (props, state) =>
                    <div {...props}>
                      <div
                          className={this.state.maxChosenValue - this.state.minChosenValue < this.state.minDistanceBetweenThumbs && state.index === 1 ? "filter-slider__tooltip_from-bottom" : "filter-slider__tooltip"}>
                        {state.valueNow}$
                      </div>
                    </div>}
              minDistance={10}
          />
          <div className="filter-slider__inputs-container">
            <label className="filter-slider__input-label">
              <span>From</span>
              <input className="filter-slider__input" name="from" type="text" value={this.state.minChosenValue}
                     onChange={this.handleInputChange}/>
            </label>
            <label className="filter-slider__input-label">
              <span>To</span>
              <input className="filter-slider__input" name="to" type="text" value={this.state.maxChosenValue}
                     onChange={this.handleInputChange}/>
            </label>
          </div>
        </div>
    );
  }
}


export default FilterSlider;