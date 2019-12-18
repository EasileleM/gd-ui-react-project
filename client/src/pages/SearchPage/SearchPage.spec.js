import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {SearchPage} from './SearchPage';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<SearchPage />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(SearchPage.prototype, 'componentDidMount');
    const fakeProps = {search: ""}
    const wrapper = shallow(<SearchPage location={fakeProps}/>);
    expect(SearchPage.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});