'use strict';

import React from 'react';
import EnterpriseSummary from './EnterpriseSummaryComponent.js';

class SearchResultsComponent extends React.Component {
  /**
   * Set the default state
   */
  constructor(props) {
    super(props);

    this.state = {
      search_results: null
    };
  }

  /**
   * Called by React after the initial render.
   */
  componentDidMount() {
    this.search(this.props.searchText, this.context.config.api_root);
  }

  /**
   * Called before receiving new props
   *
   * Ex: when the user performs a new search
   */
  componentWillReceiveProps(nextProps, nextContext) {
    var current_search_text = this.props.searchText,
      current_api_root = this.context.config.api_root,
      new_search_text = nextProps.searchText,
      new_api_root = nextContext.config.api_root,
      do_search;

    do_search = (new_search_text !== current_search_text || current_api_root !== new_api_root);

    // If the search term or the api root are different than the previous
    // time we received props/context, trigger a new search
    if (do_search) {
      this.search(new_search_text, new_api_root);
    }
  }

  /**
   * Fetch the search results from backend
   */
  search(query, api_root, page) {
    var component = this,
      endpoint;

    if (!api_root) {
      return (<p>Loading...</p>);
    }

    // If pagination is undefined, return the first page of results
    if (!page) {
      page = 1;
    }

    endpoint = api_root + '/directory?page=' + page + '&q=' + query;

    fetch(endpoint)
      .then(function(response) {
        if (response.ok) {
          return response.json().then(function(json) {
            component.setState({
              search_results: json
            });
          });
        }

        throw new Error('Network respsonse was not ok'); // TODO: better err msg.
      })
      .catch(function(error) {
        context.logger.notify(error);
      });
  }

  render() {
    var component = this,
      jsx = [],
      results = component.state.search_results,
      enterprises = [];

    // We haven't received results from the backend yet
    if (!results) {
      return (<p>Loading...</p>);
    }

    enterprises = results.enterprises;

    // If we have no results, show a "no results" message
    if (enterprises.length === 0) {
      jsx.push(<li key='no-results' className='search-result'>No results.</li>);
    }

    // Build list of enterprises
    enterprises.map(function(enterprise) {
      jsx.push(
        <li key={enterprise.id} className='search-result'>
          <EnterpriseSummary enterprise={enterprise} />
        </li>
      );
    });

    return (
      <div className='searchresults-component'>
        <ol key='search-results' className='search-results fade-in'>
          {jsx}
        </ol>
      </div>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

SearchResultsComponent.contextTypes = {
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

export default SearchResultsComponent;
