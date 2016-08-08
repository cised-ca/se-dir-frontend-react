/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import SearchResultsComponent from 'components/SearchResultsComponent.js';

describe('SearchResultsComponent', () => {
  let component;

  var directoryProp = [],
    searchTextProp = 'restore',
    lunr_indexProp = null;

  beforeEach(() => {
    component = shallow(
      <SearchResultsComponent directory={directoryProp}
        searchText={searchTextProp} lunr_index={lunr_indexProp} />
    );
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('searchresults-component')).to.equal(true);
  });
});
