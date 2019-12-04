import React, {Component} from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {ProductCatalogRow} from './ProductCatalogRow';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as LoadRelated from "../../utils/loadRelated";
import * as NotificationError from '../../utils/notificationError';


configure({adapter: new Adapter()});


describe('<ProductCatalogRow />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ProductCatalogRow.prototype, 'componentDidMount');
    const wrapper = mount(<ProductCatalogRow t={key => key}/>);
    expect(ProductCatalogRow.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('loads related no errors', async () => {
    sandbox.stub(LoadRelated, 'default').callsFake(() => {
      return new Promise(resolve => resolve({data: {items: []}}))
    });
    const wrapper = shallow((<ProductCatalogRow id={1} t={key => key}/>));
    await flushPromises()
    expect(wrapper.state().ready).to.equal(true)

  });

  it('loads related with errors', async () => {
    sandbox.stub(LoadRelated, 'default').callsFake(() => {
      return new Promise((resolve, reject) => reject({}))
    });
    sandbox.stub(NotificationError, 'default')
    const wrapper = shallow((<ProductCatalogRow id={1} t={key => key}/>));
    await flushPromises()
    expect(NotificationError.default).to.have.property('callCount', 1);
  });

});