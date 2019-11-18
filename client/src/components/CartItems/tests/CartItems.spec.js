import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CartItems} from '../CartItems.jsx';

configure({adapter: new Adapter()});

describe('<CartItems />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(CartItems.prototype, 'componentDidMount');
    const wrapper = mount(<CartItems items={[]} t={key => key}/>);
    expect(CartItems.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
