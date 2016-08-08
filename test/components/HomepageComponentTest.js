/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import { HomepageComponentWithoutRouter } from 'components/HomepageComponent.js';
import SearchForm from 'components/SearchFormComponent.js';

describe('HomepageComponent', () => {
  let component;

  var locationProp = {
    'query': ''
  };

  beforeEach(() => {
    component = shallow(
      <HomepageComponentWithoutRouter location={locationProp} />
    );
  });

  it('should render one <SearchForm /> component', () => {
    expect(component.find(SearchForm)).to.have.length(1);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('homepage-component')).to.equal(true);
  });
});
