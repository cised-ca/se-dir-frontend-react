'use strict';

import React from 'react';
import EnterpriseSummary from './EnterpriseSummaryComponent.js';

import ReactPaginate from 'react-paginate';

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
   * Triggered when changing pages
   */
  handlePageClick(data) {
    // react-paginate uses zero-based index for the pages (starts at page 0)
    // We use 1-based index (start at page 1). Add "1" to whatever the library gives us
    var selected = data.selected + 1;

    // Trigger the search with the current query and the newly selected page
    this.search(this.state.search_text, this.context.config.api_root, selected);
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
              search_results: json,
              search_text: query
            });
          });
        }

        throw new Error('Network error while performing search');
      })
      .catch(function(error) {
        component.context.logger.notify(error);
      });
  }

  render() {
    var component = this,
      jsx = [],
      results = component.state.search_results,
      enterprises = [],
      pagination = null,
      initial_page;

    // We haven't received results from the backend yet
    if (!results) {
      return (<p>Loading...</p>);
    }

    initial_page = this.state.search_results.page - 1;
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

    // Don't show pagination if we only have 1 page
    if (this.state.search_results.pages > 1) {
      pagination = (
        <ReactPaginate breakClassName={'break-me'}
                       pageCount={this.state.search_results.pages}
                       initialPage={initial_page}
                       forcePage={initial_page}
                       disableInitialCallback={true}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick.bind(this)}
                       containerClassName={'pagination'}
                       subContainerClassName={'pages pagination'} />
      );
    }

    return (
      <div className='searchresults-component'>
        <ol key='search-results' className='search-results fade-in'>
          {jsx}
        </ol>

        {pagination}
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
