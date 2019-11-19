import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FilterSlider} from './FilterSlider';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<FilterSlider />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(FilterSlider.prototype, 'componentDidMount');
    const [minValue, maxValue] = [0,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    expect(FilterSlider.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('should handle change from slider', () => {
    const [minValue, maxValue] = [0,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const [minTestValue, maxTestValue] = [1,2];
    wrapper.instance().handleChange([minTestValue, maxTestValue]);
    expect(wrapper.state().maxChosenValue).to.equal(maxTestValue);
    expect(wrapper.state().minChosenValue).to.equal(minTestValue);
  });

  it('should set minChosenValue to minValue', () => {
    const [minValue, maxValue] = [5,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const testValue = "0";
    wrapper.instance().handleInputChange({target: {name: "from", value: testValue}});
    expect(wrapper.state().minChosenValue).to.equal(minValue);
  });

  it('should set minChosenValue', () => {
    const [minValue, maxValue] = [0,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const testValue = "5";
    wrapper.instance().handleInputChange({target: {name: "from", value: testValue}});
    expect(wrapper.state().minChosenValue).to.equal(Number(testValue));
  });

  it('should set minChosenValue to maxChosenValue', () => {
    const [minValue, maxValue] = [0,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const [minTestValue, maxTestValue] = [1,2];
    wrapper.instance().handleChange([minTestValue, maxTestValue]);
    const testValue = "5";
    wrapper.instance().handleInputChange({target: {name: "from", value: testValue}});
    expect(wrapper.state().minChosenValue).to.equal(maxTestValue);
  });

  it('should set maxChosenValue to maxValue', () => {
    const [minValue, maxValue] = [5,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const testValue = "11";
    wrapper.instance().handleInputChange({target: {name: "to", value: testValue}});
    expect(wrapper.state().maxChosenValue).to.equal(maxValue);
  });

  it('should set maxChosenValue', () => {
    const [minValue, maxValue] = [0,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const testValue = "5";
    wrapper.instance().handleInputChange({target: {name: "to", value: testValue}});
    expect(wrapper.state().maxChosenValue).to.equal(Number(testValue));
  });

  it('should set maxChosenValue to minChosenValue', () => {
    const [minValue, maxValue] = [0,10];
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={maxValue}
                                          minValue={minValue}/>);
    const [minTestValue, maxTestValue] = [5,9];
    wrapper.instance().handleChange([minTestValue, maxTestValue]);
    const testValue = "3";
    wrapper.instance().handleInputChange({target: {name: "to", value: testValue}});
    expect(wrapper.state().maxChosenValue).to.equal(minTestValue);
  });
});