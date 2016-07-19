'use strict';

import React from 'react';

import SiteNavigation from './SiteNavigationComponent.js';

var lunr = require('lunr');

require('styles//Template.scss');

class TemplateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      index: null,
      directory: [],
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
    return this.http_get('/config.json');
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
    return this.http_get(this.state.config.api_root + '/directory');
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
    directory.forEach(function(enterprise) {
      lunr_index.add({
        name: enterprise.name,
        description: enterprise.description,
        id: enterprise.id
      });
    });

    // Save the index and directory data
    this.setState({
      index: lunr_index,
      directory: directory
    });
  }

  render() {
    /* Copy state information from this component to the child component's properties */
    var childWithProps = React.cloneElement(this.props.children, this.state);

    return (
      <div>
        {/* Every page will have the navigation component */}
        <SiteNavigation />

        {/* The router will decide what to render here based on the URL we're at */}
        {childWithProps}
      </div>
    );
  }
}

TemplateComponent.displayName = 'TemplateComponent';

// Uncomment properties you need
// TemplateComponent.propTypes = {};
// TemplateComponent.defaultProps = {};

export default TemplateComponent;
