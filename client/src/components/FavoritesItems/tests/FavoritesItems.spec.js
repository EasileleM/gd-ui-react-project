import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FavoritesItems} from '../FavoritesItems.jsx';

configure({adapter: new Adapter()});

describe('<FavoritesItems />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(FavoritesItems.prototype, 'componentDidMount');
    const wrapper = mount(<FavoritesItems items={[]} t={key => key}/>);
    expect(FavoritesItems.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('render passed items', () => {
    const items = [
      {_id: 1, colors: 1},
      {_id: 2, colors: 2}
    ]
    const wrapper = shallow(<FavoritesItems items={items} t={key => key}/>);
    expect(wrapper.children()).to.have.lengthOf(items.length);
  });
}); 
