/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
// import createComponent from 'helpers/shallowRenderHelper';

import EnterpriseSummaryComponent from 'components//EnterpriseSummaryComponent.js';

describe('EnterpriseSummaryComponent', () => {
  let component;

  var enterpriseProp = {
    'name': 'ReStore',
    'description': 'The ReStores’ shelves are stocked with new and gently ' +
      'used renovation supplies donated by homeowners and businesses. ' +
      'Everything is available to the public at deeply discounted prices.',
    'logo': 'restore.png',
    'offering': 'Bob Smith',
    'website': 'http://google.com',
    'locations': [],
    'addresses': [],
    'faxes': [],
    'phones': [
      {
        'number': '27777777777',
        'public': true,
        'tags': ['main']
      }
    ],
    'emails': [
      {
        'email': 'test1@test.com',
        'public': true,
        'tags': ['main']
      }
    ],
    'purposes': ['Helping disadvantaged peoples', 'Raising money for parent company']
  };

  var componentOptions = {
    context: {
      config: {
        api_root: ""
      }
    }
  };

  beforeEach(() => {
    component = shallow(<EnterpriseSummaryComponent enterprise={enterpriseProp} />, componentOptions);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('enterprisesummary-component')).to.equal(true);
  });
});
