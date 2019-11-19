import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Logo} from './Logo';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('<Logo />', () => {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Logo.prototype, 'componentDidMount');
    const wrapper = shallow(<Logo />);
    expect(Logo.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});