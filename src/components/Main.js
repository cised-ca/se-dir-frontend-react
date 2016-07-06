require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/extlib/grids/bootstrap.css');

var lunr = require('lunr');

import React from 'react';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      index: null,
      directory: {}
    };
  }

  /**
   * This is called automatically by React. Immediately after the initial render.
   * See: https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount
   */
  componentDidMount() {
    var app = this; // Cache 'this' so we can use it in xhr callback
    this.serverRequest = new XMLHttpRequest();

    this.serverRequest.onreadystatechange = function(response) {
      if (this.readyState === 4){
        // TODO: Error handling
        var directory = JSON.parse(response.target.response);
        app.initializeClientSideSearch(directory);
      }
    };

    this.serverRequest.open('GET', '/data/directory.json', true);
    this.serverRequest.send();
  }

  /**
   * Initialize the Lunr search
   * @param {Object} directory The CISED directory data
   */
  initializeClientSideSearch(directory) {
    // Init lunr
    var lunr_index = lunr(function() {
      this.field('title', {boost: 10});
      this.field('description');
      this.ref('id');
    });

    // Index enterprises
    directory.enterprises.forEach(function(enterprise, index) {
      lunr_index.add({
        title: enterprise.title,
        description: enterprise.description,
        id: index
      });
    });

    // Save the index and directory data
    this.setState({
      index: lunr_index,
      directory: directory
    });
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
  }

  render() {
    return (
      <div>
        <SearchForm onSearch={this.handleSearch.bind(this)} />
        <SearchResults searchText={this.state.searchText} directory={this.state.directory} lunr_index={this.state.index} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
