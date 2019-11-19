import React, {Component} from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {ProductsContainer} from './ProductsContainer';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as LoadRelated from "../../utils/loadRelated";
import * as NotificationError from '../../utils/notificationError';


configure({adapter: new Adapter()});


describe('<ProductsContainer />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ProductsContainer.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductsContainer products={[{_id: "1"}, {_id: "2"}]} rowSize={3} t={key => key}/>);
    expect(ProductsContainer.prototype.componentDidMount).to.have.property('callCount', 1);
  });
  });