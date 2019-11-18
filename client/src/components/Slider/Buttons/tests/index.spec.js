import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Buttons} from '../index';

configure({adapter: new Adapter()});

describe('<Buttons />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Buttons.prototype, 'componentDidMount');
    const wrapper = shallow(<Buttons currentSlide={1} t={key => key}/>);
    expect(Buttons.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('calls renderButton', () => {
    console.log(Buttons.prototype.renderButton)
    sandbox.spy(Buttons.prototype, 'componentDidMount');
    const wrapper = shallow(<Buttons currentSlide={1} t={key => key}/>);
    expect(Buttons.prototype.renderButton).to.have.property('callCount', 1);
  });
}); 
