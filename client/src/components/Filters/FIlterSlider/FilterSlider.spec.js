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
    const wrapper = shallow(<FilterSlider slideIn={true}
                                          maxValue={2}
                                          minValue={0}/>);
    expect(FilterSlider.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});