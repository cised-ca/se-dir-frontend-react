/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import BannerComponent from 'components/BannerComponent.js';

describe('BannerComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(<BannerComponent />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('banner-component')).to.equal(true);
  });
});
