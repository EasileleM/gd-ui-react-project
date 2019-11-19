import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ProductCard } from '../index';

configure({ adapter: new Adapter() });

describe('<ProductCard />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    const data = {sizes: [], colors: [], images: [], _id: 1};
    sandbox.spy(ProductCard.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductCard favoritesItems={[]} product={data} t={key => key} />);
    expect(ProductCard.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 
