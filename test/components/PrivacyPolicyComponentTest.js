/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import PrivacyPolicyComponent from 'components/PrivacyPolicyComponent.js';

describe('PrivacyPolicyComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(<PrivacyPolicyComponent />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('privacypolicy-component')).to.equal(true);
  });
});
