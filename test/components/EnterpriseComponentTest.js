/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import EnterpriseComponent from 'components/EnterpriseComponent.js';

describe('EnterpriseComponent', () => {
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

  beforeEach(() => {
    component = shallow(<EnterpriseComponent enterprise={enterpriseProp} />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('enterprise-component')).to.equal(true);
  });
});
