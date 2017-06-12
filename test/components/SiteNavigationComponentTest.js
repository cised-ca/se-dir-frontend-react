/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import { SiteNavigationComponent } from 'components/SiteNavigationComponent.js';

describe('SiteNavigationComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SiteNavigationComponent t={key => key} />);
  });

  it('should have its component name as a className', () => {
    expect(component.hasClass('sitenavigation-component')).to.equal(true);
  });
});
