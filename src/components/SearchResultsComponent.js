'use strict';

import React from 'react';
import Enterprise from './EnterpriseComponent.js';

require('styles/SearchResults.scss');

class SearchResultsComponent extends React.Component {
  render() {
    var directory = this.props.directory,
      lunr_index = this.props.lunr_index,
      list,
      lunr_results,
      enterprises = [];

    // Make sure the lunr index has been built
    if (lunr_index !== null && directory.enterprises !== null) {
      lunr_results = lunr_index.search(this.props.searchText);
      list = directory.enterprises;

      lunr_results.forEach(function(result) {
        // Array indexes are zero-based, enterprise ids aren't
        enterprises.push(list[result.ref - 1]);
      });
    }

    return (
      <div className='search-results js-search-results'>
      {
        enterprises.map(function(enterprise, index) {
          return <Enterprise key={index} enterprise={enterprise} />;
        })
      }
      </div>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
