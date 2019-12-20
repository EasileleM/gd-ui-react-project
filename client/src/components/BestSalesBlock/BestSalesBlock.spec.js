import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BestSalesBlock} from './BestSalesBlock';

configure({adapter: new Adapter()});

describe('<BestSalesBlock />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<BestSalesBlock t={key => key}/>);
  });
});
