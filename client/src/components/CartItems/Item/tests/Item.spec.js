import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Item } from '../Item.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<Item />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    const data = { generalData: { color: 1, images: 1, sizes: 1 } };
    sandbox.spy(Item.prototype, 'componentDidMount');
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    expect(Item.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
