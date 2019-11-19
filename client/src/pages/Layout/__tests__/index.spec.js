import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Layout } from '../Layout';

configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Layout.prototype, 'componentDidMount');
    const wrapper = shallow(<Layout t={key => key} />);
    expect(Layout.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
