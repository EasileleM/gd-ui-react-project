import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FavoritesItems} from '../FavoritesItems.jsx';
import ReactDOM from "react-dom";
import App from "../../../App";

configure({adapter: new Adapter()});

describe('<FavoritesItems />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FavoritesItems close={()=>{}} items={[]} t={key => key} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('render passed items', () => {
    const items = [
      {_id: 1, colors: 1},
      {_id: 2, colors: 2}
    ];
    const wrapper = shallow(<FavoritesItems items={items} t={key => key}/>);
    expect(wrapper.children()).to.have.lengthOf(items.length);
  });
}); 
