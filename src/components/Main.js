require('normalize.css/normalize.css');
require('styles/App.scss');

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
      directory: {},
      config: {}  // FIXME: Should this really be a state?
    };
  }

  /**
   * A wrapper around XMLHttpRequest that uses Promises
   * since they're nicer to work with than callbacks
   *
   * @param {String} url The url to request
   * @return A promise
   */
  http_get(url) {
    var promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };

      xhr.onerror = function() {
        reject(this.statusText);
      };

      xhr.open('GET', url);
      xhr.send();
    });

    return promise;
  }

  /**
   * Get the configuration file
   *
   * @return A promise
   */
  get_config() {
    return this.http_get('config.json');
  }

  /**
   * Parse the configuration file
   */
  parse_config(response) {
    // TODO: Error handling
    var config = JSON.parse(response);

    // TODO: Sanity check / Error handling / Merge, overwrite default values
    this.state.config = config;
  }

  /**
   * Get the list of enterprises from the API endpoint
   *
   * @return A promise
   */
  get_enterprises() {
    return this.http_get(this.state.config.api_root + '/enterprises');
  }

  /**
   * This is called automatically by React. Immediately after the initial render.
   * See: https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount
   */
  componentDidMount() {
    var app = this;

    this
      .get_config()
      .then(function(response) {
        app.parse_config(response);

        return app.get_enterprises();
      })
      .then(function(response) {
        // TODO: Error handling
        var directory = JSON.parse(response);

        app.initializeClientSideSearch(directory);
      })
      .catch(function(/*reason*/) {
        // TODO: Error handling
      });
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
