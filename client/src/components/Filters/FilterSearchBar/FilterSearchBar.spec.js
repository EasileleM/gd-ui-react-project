import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FilterSearchBar} from './FilterSearchBar';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

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
});