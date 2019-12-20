import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AdsBlock} from './AdsBlock';

configure({adapter: new Adapter()});

describe('<AdsBlock />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(AdsBlock.prototype, 'componentDidMount');
    const wrapper = shallow(<AdsBlock t={key => key}/>);
    expect(AdsBlock.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
