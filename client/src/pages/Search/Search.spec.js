import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Search} from './Search';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<Search />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Search.prototype, 'componentDidMount');
    const wrapper = shallow(<Search />);
    expect(Search.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});