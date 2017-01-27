/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import EnterpriseMapComponent from 'components/EnterpriseMapComponent.js';
import { Map, Marker } from 'react-leaflet';

describe('EnterpriseMapComponent', () => {

  var enterpriseProp = {
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
  };

  var enterpriseNoLocationProp = {
    'name': 'ReStore',
    'description': 'The ReStores’ shelves are stocked with new and gently...',
    'logo': 'restore.png',
    'offering': 'Bob Smith',
    'website': 'http://google.com',
    'addresses': [],
    'faxes': [],
    'purposes': ['Helping disadvantaged peoples', 'Raising money for parent company']
  };

  var enterpriseTwoLocationProp = {
    'name': 'ReStore',
    'description': 'The ReStores’ shelves are stocked with new and gently...',
    'logo': 'restore.png',
    'offering': 'Bob Smith',
    'website': 'http://google.com',
    'locations': {
      'type': 'MultiPoint',
      'coordinates': [
        [45.425, -75.692],
        [44.425, -74.692]
      ]
    },
    'addresses': [],
    'faxes': [],
    'purposes': ['Helping disadvantaged peoples', 'Raising money for parent company']
  };

  it('should have its component name as default className', () => {
    let component = shallow(
        <EnterpriseMapComponent enterprise={enterpriseProp} />
      );
    expect(component.hasClass('enterprisemap-component')).to.equal(true);
  });

  it('should not have a map', () => {
    let component = shallow(
      <EnterpriseMapComponent enterprise={enterpriseNoLocationProp} />
    );
    expect(component.find(Map)).to.have.length(0);
  });

  it('should have a map centered on one marker', () => {
    let component = shallow(
      <EnterpriseMapComponent enterprise={enterpriseProp} />
    );

    let mapComp = component.find(Map);
    expect(mapComp).to.have.length(1);
    expect(mapComp.prop('bounds')).to.be.undefined;
    expect(mapComp.prop('center')).to.deep.equal([45.425, -75.692]);
    expect(mapComp.find(Marker)).to.have.length(1);
  });

  it('should have a map with two markers', () => {
    let component = shallow(
      <EnterpriseMapComponent enterprise={enterpriseTwoLocationProp} />
    );

    let mapComp = component.find(Map);
    expect(mapComp).to.have.length(1);
    expect(mapComp.prop('bounds')).to.deep.equal([
      [45.425, -75.692],
      [44.425, -74.692]
    ]);
    expect(mapComp.prop('center')).to.be.undefined;
    expect(mapComp.find(Marker)).to.have.length(2);
  });

});
