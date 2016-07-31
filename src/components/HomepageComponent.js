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
      'directSearch': false,
      'searchText': null
    };
  }

  /**
   * Before the Component is rendered, check if we have a query
   * in the URL (direct link to a search results) and set the
   * state appropriately.
   */
  componentWillMount() {
    var query = this.props.location.query;

    if (query.q) {
      this.setState({
        'directSearch': true,
        'searchText': query.q
      });
    }
  }

  /**
   * Triggered when the search form is submitted
   *
   * @param {String} searchText The text in the search field input box
   */
  handleSearch(searchText) {
    var intro = document.querySelector('.js-intro');

    intro.classList.add('slide-up');

    this.setState({
      searchText: searchText
    });

    this.props.router.push({
      'pathname': '/',
      'query': {'q': searchText}
    });
  }

  render() {
    var intro = null,
      searchResults = null;

    // Show intro if this isn't a direct link to a search
    if (this.state.directSearch === false) {
      intro = (
        <div className='intro js-intro'>
          <h1 className='title'>Ottawa Social Enterprise Directory</h1>

          <p className='tagline'>
            Find goods and services from Ottawa's vibrant social enterprise sector.
          </p>
        </div>
      );
    }

    // If we are performing a search (direct or not), display the results
    if (this.state.searchText !== null) {
      searchResults = (
        <SearchResults searchText={this.state.searchText} directSearch={this.state.directSearch}
          directory={this.props.directory} lunr_index={this.props.index} />
      );
    }

    return (
      <div className='homepage-component'>
        {intro}

        <SearchForm onSearch={this.handleSearch.bind(this)} searchText={this.state.searchText} />

        {searchResults}
      </div>
    );
  }
}

HomepageComponent.displayName = 'HomepageComponent';

// Uncomment properties you need
// HomepageComponent.propTypes = {};
// HomepageComponent.defaultProps = {};

// This is used by the Homepage and Template tests at the moment.
// They don't like wrapped components.
export let HomepageComponentWithoutRouter = HomepageComponent;

export default withRouter(HomepageComponent);
