import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FilterRadio} from './FilterRadio';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../store";

configure({adapter: new Adapter()});


describe('<FilterRadio />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(FilterRadio.prototype, 'componentDidMount');
    const wrapper = shallow(<FilterRadio options={[1,2,3,4]}/>);
    expect(FilterRadio.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('handles click', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterRadio options={[1,2,3,4]}/>);
    wrapper.instance().handleClick({target:{value: 1}});
    expect(wrapper.state().selectedValue).to.equal(1);
    expect(store.dispatch).to.have.property('callCount', 1);
  });

  it('resets filters', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterRadio options={[1,2,3,4]}/>);
    wrapper.instance().resetFilters();
    expect(wrapper.state().selectedValue).to.equal(null);
    expect(store.dispatch).to.have.property('callCount', 1);
  });
});