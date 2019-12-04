import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Chooser} from './Chooser';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<Chooser />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Chooser.prototype, 'componentDidMount');
    const wrapper = shallow(<Chooser sizes={["s", "m", "l"]} t={key => key}/>);
    expect(Chooser.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});