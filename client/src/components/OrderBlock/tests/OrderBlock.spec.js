import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {OrderBlock} from '../OrderBlock.jsx';

configure({adapter: new Adapter()});

describe('<OrderBlock />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(OrderBlock.prototype, 'componentDidMount');
    const wrapper = mount(<OrderBlock t={key => key}/>);
    expect(OrderBlock.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
