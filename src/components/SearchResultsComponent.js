'use strict';

import React from 'react';
import EnterpriseRow from './EnterpriseRowComponent.js';

require('lunr');
require('styles/SearchResults.scss');

class SearchResultsComponent extends React.Component {
  render() {
    var directory = this.props.directory,
      lunr_index = this.props.lunr_index,
      list,
      lunr_results,
      jsx = [],
      enterprises = [];

    // Make sure the lunr index has been built
    if (lunr_index !== null && directory.enterprises !== null) {
      lunr_results = lunr_index.search(this.props.searchText);
      list = directory.enterprises;

      lunr_results.forEach(function(result) {
        // Array indexes are zero-based, enterprise ids aren't
        enterprises.push(list[result.ref - 1]);
      });

      // FIXME: The number of cols is hard-coded here. And the relevant class
      //        name is in EnterpriseRowComponent. It would be nice to make
      //        this easier to configure.
      enterprises.reduce(function(rows, enterprise, index) {
        if (index % 4 === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(enterprise);
        return rows;
      }, []).map(function(row, index) {
        jsx.push(<EnterpriseRow key={index} row={row} />);
      });
    }

    return (
      <div className='search-results js-search-results'>
        {jsx}
      </div>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
