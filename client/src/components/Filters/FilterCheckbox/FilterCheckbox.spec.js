import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FilterCheckbox} from './FilterCheckbox';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../store";

configure({adapter: new Adapter()});


describe('<FilterCheckbox />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(FilterCheckbox.prototype, 'componentDidMount');
    const wrapper = shallow(<FilterCheckbox options={[1,2,3,4]}/>);
    expect(FilterCheckbox.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('handles click check', () => {
    const wrapper = shallow(<FilterCheckbox options={[1,2,3,4]}/>);
    wrapper.instance().handleClick({target:{value: 1}});
    expect(wrapper.state().selectedValues.length).to.equal(1);
  });

  it('handles click uncheck', () => {
    const wrapper = shallow(<FilterCheckbox options={[1,2,3,4]}/>);
    wrapper.instance().handleClick({target:{value: 1}});
    wrapper.instance().handleClick({target:{value: 1}});
    expect(wrapper.state().selectedValues.length).to.equal(0);
  });

  it('calls dispatch for brands', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterCheckbox name={"brands"} options={[1,2,3,4]}/>);
    wrapper.instance().handleClick({target:{value: 1}});
    expect(store.dispatch).to.have.property('callCount', 1);
  });

  it('calls dispatch for sizes', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterCheckbox name={"sizes"} options={[1,2,3,4]}/>);
    wrapper.instance().handleClick({target:{value: 1}});
    expect(store.dispatch).to.have.property('callCount', 1);
  });
});