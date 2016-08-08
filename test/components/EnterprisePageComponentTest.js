/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import EnterprisePageComponent from 'components/EnterprisePageComponent.js';

var slug = require('slug');
slug.defaults.mode = 'rfc3986';

describe('EnterprisePageComponent', () => {
  let component;

  var directoryProp = [],
    paramsProp = {
      'slug': 'restore'
    };

  beforeEach(() => {
    component = shallow(
      <EnterprisePageComponent directory={directoryProp} params={paramsProp} />
    );
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('enterprisepage-component')).to.equal(true);
  });
});
