import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Navigation } from '../navigation';
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Navigation.prototype, 'componentDidMount');
    const wrapper = shallow(<Navigation location={1} t={key => key} />);
    expect(Navigation.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
