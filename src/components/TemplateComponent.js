'use strict';

import React from 'react';

import SiteNavigation from './SiteNavigationComponent.js';

require('es6-promise/auto');

var airbrakeJs = require('airbrake-js'),
  lunr = require('lunr');

class TemplateComponent extends React.Component {
  getChildContext() {
    return {
      'logger': this.state.logger
    };
  }

   /**
   * Set the initial state
   *
   * Called by React before the inital rendering
   */
  componentWillMount() {
    this.setState({
      searchText: '',
      index: null,
      directory: null,
      config: {},  // FIXME: Should this really be a state?
      logger: {
        /* eslint-disable no-console */
        notify: function(msg) { console.error(msg); }
        /* eslint-enable no-console */
      }
    });
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
      var xhr = new XMLHttpRequest(),
        errmsg = 'xhr request to ' + url + ' failed: ';

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject(errmsg + this.status + ' ' + this.statusText);
        }
      };

      xhr.onerror = function() {
        var statusText = this.statusText;

        if (this.status === 0 && statusText === '') {
          statusText = 'Unsent.';
        }

        reject(errmsg + this.status + ' ' + statusText);
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
   *
   * @param {String} JSON response
   */
  parse_config(response) {
    var config;

    try {
      // TODO: Sanity check / Error handling / Merge, overwrite default values
      config = JSON.parse(response);
      this.state.config = config;
    } catch(e) {
      // Add some context to the default error message
      e.message = 'Cannot parse configuration file: ' + e.message;
      throw(e);
    }
  }

  /**
   * Send errors to a logging system
   */
  setup_error_logger() {
    var config = this.state.config;

    // Setup error logger if configured. Otherwise, we'll fallback to the console
    if (config.logger) {
      this.state.logger = new airbrakeJs({
        projectId: config.logger.api_key,
        projectKey: config.logger.api_key,
        reporter: 'xhr',
        host: config.logger.host
      });
    }
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
   * Get/parse config and directory data.
   *
   * Called by React after the initial render.
   */
  componentDidMount() {
    var app = this;

    this
      .get_config()
      .then(function(config_str) {
        app.parse_config(config_str);
        app.setup_error_logger();

        return app.get_enterprises();
      })
      .then(function(directory_str) {
        var directory;

        // Convert the JSON string into an object
        try {
          directory = JSON.parse(directory_str);
        } catch(e) {
          // Add context to the default error message
          e.message = 'Unable to parse directory JSON: ' + e;
          throw(e);
        }

        app.initializeClientSideSearch(directory);
      })
      .catch(function(reason) {
        app.state.logger.notify(reason);
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
    directory.forEach(function(enterprise, index) {
      lunr_index.add({
        name: enterprise.name,
        description: enterprise.description,
        id: enterprise.id
      });

      // Make sure enterprise.website starts with http(s)://
      // otherwise the links are relative to the current url we're on
      if (enterprise.website && enterprise.website.search(/^https?:\/\//) === -1) {
        directory[index].website = 'http://' + enterprise.website;
      }
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
      <div className='template-component'>
        {/* Every page will have the navigation component */}
        <SiteNavigation />

        {/* The router will decide what to render here based on the URL we're at */}
        <main className='main'>
          {childWithProps}
        </main>
      </div>
    );
  }
}

TemplateComponent.displayName = 'TemplateComponent';

TemplateComponent.childContextTypes = {
  'logger': React.PropTypes.object
};

// Uncomment properties you need
// TemplateComponent.propTypes = {};
// TemplateComponent.defaultProps = {};

export default TemplateComponent;
