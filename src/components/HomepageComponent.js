'use strict';

import React from 'react';
import { withRouter } from 'react-router';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

require('styles/Homepage.scss');

class HomepageComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };
  }

  /**
   * Triggered when the search form is submitted
   * @param {String} searchText The text in the search field input box
   */
  handleSearch(searchText) {
    /**
     * FIXME: This shouldn't be here, just using
     *        this space as a test
     */
    var intro = document.querySelector('.js-intro'),
      search_results = document.querySelector('.js-search-results');

    intro.classList.add('slide-up');

    window.setTimeout(function() {
      search_results.classList.add('fade-in');
    }, 1000);
    /**
     * End FIXME
     */

    this.setState({
      searchText: searchText
    });

    this.props.router.push({
      'pathname': '/',
      'query': {'q': searchText}
    });
  }

  render() {
    return (
      <div>
        <main>
          <div className="intro js-intro">
            <h1 className="title">Ottawa Social Enterprise MarketPlace</h1>

            <p className="tagline">
              An interactive platform that enables consumers of all types to
              source goods and services from Ottawa's vibrant social enterprise sector.
            </p>
          </div>
        </main>

        <SearchForm onSearch={this.handleSearch.bind(this)} />
        <SearchResults searchText={this.state.searchText} directory={this.props.directory} lunr_index={this.props.index} />
      </div>
    );
  }
}

HomepageComponent.displayName = 'HomepageComponent';

// Uncomment properties you need
// HomepageComponent.propTypes = {};
// HomepageComponent.defaultProps = {};

export default withRouter(HomepageComponent);
