import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FilterSearchBar} from './FilterSearchBar';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../store";

configure({adapter: new Adapter()});


describe('<FilterSearchBar />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(FilterSearchBar.prototype, 'componentDidMount');
    const wrapper = shallow(<FilterSearchBar />);
    expect(FilterSearchBar.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('should clear search and dispatch value', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterSearchBar />);
    wrapper.instance().clearSearch();
    expect(wrapper.state().searchValue).to.equal('');
    expect(store.dispatch).to.have.property('callCount', 1);
  });

  it('should handle change of search value', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterSearchBar />);
    wrapper.instance().handleChange({target: {value: "test"}});
    expect(wrapper.state().searchValue).to.equal('test');
  });

  it('should handle search by dispatching value', () => {
    sandbox.spy(store, "dispatch");
    const wrapper = shallow(<FilterSearchBar />);
    wrapper.instance().handleSearch();
    expect(store.dispatch).to.have.property('callCount', 1);

  });
});