import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CloseButton} from '../CloseButton.jsx';

configure({adapter: new Adapter()});

describe('<CloseButton />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(CloseButton.prototype, 'componentDidMount');
    const wrapper = mount(<CloseButton t={key => key}/>);
    expect(CloseButton.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
