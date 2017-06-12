/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import { SearchResultsComponent } from 'components/SearchResultsComponent.js';

describe('SearchResultsComponent', () => {
  let component;

  var searchTextProp = 'restore';

  beforeEach(() => {
    component = shallow(
      <SearchResultsComponent t={key => key} searchText={searchTextProp} />
    );

    component.setState({
      searchResults: {
        enterprises: [
          {
            id: '1'
          }
        ]
      }
    });
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('searchresults-component')).to.equal(true);
  });
});
