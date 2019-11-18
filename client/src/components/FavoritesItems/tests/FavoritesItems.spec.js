import React from 'react';
import {mount} from 'enzyme';
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
}); 
