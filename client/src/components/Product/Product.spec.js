import React from 'react';
import { shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Product} from './Product';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as LoadItem from "../../utils/loadItem";
import * as Toastify from "react-toastify";


configure({adapter: new Adapter()});


describe('<Product />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Product.prototype, 'componentDidMount');
    const wrapper = shallow(<Product/>);
    expect(Product.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('calls componentDidMount and loads data', () => {
    const testData = 'test data';
    sandbox.stub(LoadItem, 'default').callsFake(() => {
      return new Promise((resolve) => {
        resolve({data: testData})
      })
    });
    const wrapper = shallow(<Product/>);
    LoadItem.default().finally(() => {
      expect(Product.state.item).to.equal(testData)
    });
  });

  it('calls componentDidMount and loads data with error', () => {
    const testData = 'test data';
    sandbox.stub(LoadItem, 'default').callsFake(() => {
      return new Promise((resolve, reject) => {
        reject(testData)
      })
    });
    let toastType;
    sandbox.stub(Toastify, 'toast').callsFake((mes, type) => {
      toastType = type.type;
    });
    const wrapper = shallow(<Product/>);
    LoadItem.default().finally(() => {
      expect(toastType).to.equal(testData)
    });
  });

  it('updates component state with new props', () => {
    const testData = 'test data';
    const testData2 = 'test data2';
    sandbox.stub(LoadItem, 'default').callsFake((id) => {
      if(id === 0) {
        return new Promise((resolve, reject) => {
          resolve(testData2)
        })
      }
      return new Promise((resolve, reject) => {
        resolve(testData)
      })
    });
    const wrapper = shallow(<Product/>);
    wrapper.setProps({ id: 0 });
    LoadItem.default().finally(() => {
      expect(Product.state.item).to.equal(testData2)
    });
  });

  it('updates component state with new props with error', () => {
    const testData = 'test data';
    const testData2 = 'test data2';
    sandbox.stub(LoadItem, 'default').callsFake((id) => {
      if(id === 0) {
        return new Promise((resolve, reject) => {
          reject(testData2)
        })
      }
      return new Promise((resolve, reject) => {
        resolve(testData)
      })
    });
    const wrapper = shallow(<Product/>);
    wrapper.setProps({ id: 0 });
    LoadItem.default().finally(() => {
      expect(Product.state.item).to.equal(testData)
    });
  });
});