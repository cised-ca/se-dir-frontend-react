/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import EnterprisePageComponent from 'components//EnterprisePageComponent.js';

var slug = require('slug');
slug.defaults.mode = 'rfc3986';

describe('EnterprisePageComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(EnterprisePageComponent, {
      'params': {
        'slug': 'restore'
      },
      'directory': []
    });
  });

  it('should have its component name as default className', () => {
    expect(component.props.className.split(' ').indexOf('enterprisepage-component')).not.to.equal(-1);
  });
});
