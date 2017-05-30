/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import LocationDisambiguationComponent from 'components/LocationDisambiguationComponent.js';

describe('LocationDisambiguationComponent', () => {
  let component;

  let locations = [
    {
      'placeName': 'Omineca and Yellowhead (Smithers)',
      'latitude': '55.9964',
      'longitude': '-126.8574'
    },
    {
      'placeName': 'Smiths Falls',
      'latitude': '44.9001',
      'longitude': '-76.0161'
    }];

  beforeEach(() => {
    component = shallow(<LocationDisambiguationComponent locations={locations} />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('locationdisambiguation-component')).to.equal(true);
  });
});
