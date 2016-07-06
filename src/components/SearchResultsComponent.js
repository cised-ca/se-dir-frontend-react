'use strict';

import React from 'react';

require('lunr');
require('styles//SearchResults.scss');

class SearchResultsComponent extends React.Component {
  render() {
    var list = this.props.directory.enterprises,
      lunr_results = this.props.lunr_index.search(this.props.searchText),
      jsx = [],
      enterprise;

    lunr_results.forEach(function(result, index) {
      enterprise = list[result.ref];
      jsx.push(
        <li key={index} className='search-result organization'>
          <h2 key={index + 'title'} className="organization__title">{enterprise.title}</h2>
          <div key={index + 'description'} className="organization__description">{enterprise.description}</div>
          <div key={index + 'website'} className="organization__website"><a key={index + 'link'} href={enterprise.website}>Website</a></div>
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
