/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import SearchResultsMapComponent from 'components/SearchResultsMapComponent.js';

describe('SearchResultsMapComponent', () => {
  let component;

  let enterprisesProp = [{
    'name': 'ReStore',
    'description': 'The ReStores’ shelves are stocked with new and gently...',
    'logo': 'restore.png',
    'offering': 'Bob Smith',
    'website': 'http://google.com',
    'locations': {
      'type': 'MultiPoint',
      'coordinates': [
        [45.425, -75.692]
      ]
    },
    'addresses': [],
    'faxes': [],
    'purposes': ['Helping disadvantaged peoples', 'Raising money for parent company']
  }];

  beforeEach(() => {
    component = shallow(<SearchResultsMapComponent enterprises={enterprisesProp} />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('searchresultsmap-component')).to.equal(true);
  });
});
