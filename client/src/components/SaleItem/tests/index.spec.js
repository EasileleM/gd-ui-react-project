import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SaleItem} from '../index';

configure({adapter: new Adapter()});

describe('<SaleItem />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(SaleItem.prototype, 'componentDidMount');
    const wrapper = mount(<SaleItem t={key => key}/>);
    expect(SaleItem.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
