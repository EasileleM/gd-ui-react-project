import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Slider } from '../index';
import * as loadSlides from "../../../utils/loadSlides";
import * as notificationError from "../../../utils/notificationError";

configure({ adapter: new Adapter() });

describe('<Slider />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Slider.prototype, 'componentDidMount');
    const wrapper = shallow(<Slider t={key => key} />);
    expect(Slider.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('fetch and store items without any error', () => {
    const data = { images: 1, items: 1 };
    sandbox.stub(loadSlides, 'default').callsFake(() => {
      return Promise.resolve(data);
    });
    const wrapper = shallow(<Slider t={key => key} />);
    loadSlides.default().finally(() => {
      expect(Slider.state.data).to.be.equal(data);
      expect(Slider.state.ready).to.be.true;
    });
  });

  it('fetch and store items with fetch error', () => {
    const error = { message: 1 };
    sandbox.stub(loadSlides, 'default').callsFake(() => {
      return Promise.reject(error);
    });
    const wrapper = shallow(<Slider t={key => key} />);
    let errorType;
    sandbox.stub(notificationError, 'default').callsFake((mes, type) => {
      errorType = type.type;
    });
    loadSlides.default().finally(() => {
      expect(errorType).to.equal(error)
      expect(wrapper.state().ready).to.not.be.true;
    });
  });
}); 
