import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ItemCardSmall} from '../index';
import { BrowserRouter as Router } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<ItemCardSmall />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ItemCardSmall.prototype, 'componentDidMount');
    const wrapper = mount(<Router><ItemCardSmall item={{colors: 1, sizes: 1, images: 1, rating: 2}} t={key => key}/></Router>);
    expect(ItemCardSmall.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
