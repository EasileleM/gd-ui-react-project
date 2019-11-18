import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Images} from '../index';

configure({adapter: new Adapter()});

describe('<Images />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Images.prototype, 'componentDidMount');
    const wrapper = shallow(<Images images={[1, 2, 3]} currentSlide={1} t={key => key}/>);
    expect(Images.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
