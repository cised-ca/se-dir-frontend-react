'use strict';

import React from 'react';
import Enterprise from './EnterpriseComponent.js';

require('styles/SearchResults.scss');

class SearchResultsComponent extends React.Component {
  render() {
    var _this = this,
      directory = _this.props.directory,
      query = _this.props.searchText,
      lunr_index = _this.props.lunr_index,
      enterprises = [];

    // Make sure the lunr index has been built
    if (lunr_index !== null && directory.length !== 0) {
      enterprises = lunr_index.search(query).map(function(result) {
        return directory.filter(function(enterprise) {
          return enterprise.id === result.ref;
        })[0];
      });
    }

    return (
      <ol className='search-results js-search-results'>
      {
        enterprises.map(function(enterprise, index) {
          return (
            <li key={index} className='search-result'>
              <Enterprise enterprise={enterprise} />
            </li>
          );
        })
      }
      </ol>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
