/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import SearchFormComponent from 'components/SearchFormComponent.js';

describe('SearchFormComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SearchFormComponent />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('searchform-component')).to.equal(true);
  });
});
