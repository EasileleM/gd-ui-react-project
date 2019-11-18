import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ContentBlock} from '../index';

configure({adapter: new Adapter()});

describe('<ContentBlock />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ContentBlock.prototype, 'componentDidMount');
    const wrapper = shallow(<ContentBlock currentSlide={1} items={[1, 2, 3]} t={key => key}/>);
    expect(ContentBlock.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
