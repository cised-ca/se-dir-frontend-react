'use strict';

import React from 'react';
import EnterpriseSummary from './EnterpriseSummaryComponent';
import SearchResultsMap from './SearchResultsMapComponent';
import Loading from './LoadingComponent';

import ReactPaginate from 'react-paginate';

import { translate } from 'react-i18next';

class SearchResultsComponent extends React.Component {
  /**
   * Set the default state
   */
  constructor(props) {
    super(props);

    this.state = {
      searchResults: null
    };
  }

  /**
   * Called by React after the initial render.
   */
  componentDidMount() {
    this.search(this.context.config.api_root,
                this.props.searchText,
                this.props.searchLocationText,
                this.props.searchCoords);
  }

  /**
   * Called before receiving new props
   *
   * Ex: when the user performs a new search
   */
  componentWillReceiveProps(nextProps, nextContext) {
    let newSearchText = nextProps.searchText,
      newLocationText = nextProps.searchLocationText,
      newSearchCoords = nextProps.searchCoords,
      currentSearchText = this.props.searchText,
      currentSearchCoords = this.props.searchCoords,
      new_api_root = nextContext.config.api_root,
      current_api_root = this.context.config.api_root;

    if (newSearchText || newSearchCoords) {
      if (newSearchText !== currentSearchText
          || newSearchCoords !== currentSearchCoords
          || new_api_root !== current_api_root) {
        this.search(new_api_root, newSearchText, newLocationText, newSearchCoords);
      }
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
    this.search(this.context.config.api_root, this.state.searchText,
      this.state.searchLocationText, this.state.searchCoords, selected);
  }

  /**
   * Fetch the search results from backend
   */
  search(api_root, searchText, searchLocationText, coords, page) {
    var component = this,
      endpoint;

    if (!api_root) {
      return (<Loading />);
    }

    // If pagination is undefined, return the first page of results
    if (!page) {
      page = 1;
    }

    endpoint = api_root + '/directory?page=' + page + '&offset=0';
    if (searchText) {
      endpoint += '&q=' + searchText;
    }
    if (coords) {
      endpoint += '&at=' + coords;
    }

    fetch(endpoint)
      .then(function(response) {
        if (response.ok) {
          return response.json().then(function(json) {
            component.setState({
              searchResults: json,
              searchText: searchText,
              searchCoords: coords,
              searchLocationText: searchLocationText
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
    const { t } = this.props;

    var component = this,
      jsx = [],
      results = component.state.searchResults,
      enterprises = [],
      pagination = null,
      initial_page;

    // We haven't received results from the backend yet
    if (!results) {
      return (<Loading />);
    }

    initial_page = this.state.searchResults.page - 1;
    enterprises = results.enterprises;

    // If we have no results, show a "no results" message
    if (enterprises.length === 0) {
      jsx.push(
        <li key='no-results' className='search-result'>
          {t('searchResults:noResults')}
        </li>
      );
    } else {
      if (this.state.searchLocationText) {
        jsx.push(
          <p key='results near label'>
            {t('searchResults:resultsNear')} "{this.state.searchLocationText}":
          </p>
        );
      }
      jsx.push(<SearchResultsMap key='mapComponent'
                searchCoords={component.state.searchCoords}
                enterprises={enterprises}/>);
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
    if (this.state.searchResults.pages > 1) {
      pagination = (
        <ReactPaginate breakClassName={'break-me'}
                       pageCount={this.state.searchResults.pages}
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

export { SearchResultsComponent };
export default translate('searchResults')(SearchResultsComponent);
