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
      jsx = [],
      enterprises = [];

    // Make sure the lunr index has been built
    if (lunr_index !== null && directory.length !== 0) {
      enterprises = lunr_index.search(query).map(function(result) {
        return directory.filter(function(enterprise) {
          return enterprise.id === result.ref;
        })[0];
      });
    }

    // If we have no results, show a "no results" message
    if (enterprises.length === 0) {
      // TODO: This string should be translatable
      jsx.push(<li key='no-results' className='search-result'>No results.</li>);
    }

    enterprises.map(function(enterprise, index) {
      jsx.push(
        <li key={index} className='search-result'>
          <Enterprise enterprise={enterprise} />
        </li>
      );
    });

    return (
      <ol className='search-results js-search-results'>
        {jsx}
      </ol>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
