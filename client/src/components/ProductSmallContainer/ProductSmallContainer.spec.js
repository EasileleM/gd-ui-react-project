import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {ProductSmallContainer} from './ProductSmallContainer';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as LoadCard from "../../utils/loadCard";
import * as NotificationError from "../../utils/notificationError";


configure({adapter: new Adapter()});


describe('<ProductsSmallContainer />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ProductSmallContainer.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductSmallContainer t={key => key}/>);
    expect(ProductSmallContainer.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('loads cards no errors', async () => {
    sandbox.stub(LoadCard, 'default').callsFake(() => {
      return new Promise(resolve => resolve({data: {items: [{_id: 1}, {_id: 2}]}}))
    });
    const wrapper = shallow(<ProductSmallContainer t={key => key}/>);
    await flushPromises();
    expect(wrapper.state().ready).to.equal(true);
  });

  it('loads cards with errors', async () => {
    sandbox.stub(LoadCard, 'default').callsFake(() => {
      return new Promise((resolve, reject) => reject({}))
    });
    sandbox.stub(NotificationError, 'default')
    const wrapper = shallow(<ProductSmallContainer t={key => key}/>);
    await flushPromises();
    expect(NotificationError.default).to.have.property('callCount', 1);
  });
});