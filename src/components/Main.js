require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };
  }
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
  }
  render() {
    return (
        <div>
        <SearchForm onSearch={this.handleSearch.bind(this)} />
        <SearchResults searchText={this.state.searchText} />
        </div>
        );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
