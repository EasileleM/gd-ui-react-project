import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SaleItem } from "../SaleItem";
import * as notificationError from "../../../utils/notificationError";
import * as loadItemSales from "../../../utils/loadItemSales";

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

  it('fetch and store items without any error', () => {
    const data = { colors: 1, sizes: 1};
    sandbox.stub(loadItemSales, 'default').callsFake(() => {
      return Promise.resolve(data);
    });
    const wrapper = shallow(<SaleItem t={key => key} />);
    loadItemSales.default().finally(() => {
      expect(SaleItem.state.data).to.be.equal(data);
      expect(SaleItem.state.ready).to.be.true;
    });
  });

  it('fetch and store items with fetch error', () => {
    const error = { message: 1 };
    sandbox.stub(loadItemSales, 'default').callsFake(() => {
      return Promise.reject(error);
    });
    const wrapper = shallow(<SaleItem t={key => key} />);
    let errorType;
    sandbox.stub(notificationError, 'default').callsFake((mes, type) => {
      errorType = type.type;
    });
    loadItemSales.default().finally(() => {
      expect(errorType).to.equal(error)
      expect(wrapper.state().ready).to.not.be.true;
    });
  });
}); 
