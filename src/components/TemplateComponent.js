'use strict';

import React from 'react';

import SiteNavigation from './SiteNavigationComponent.js';

require('es6-promise/auto');

var airbrakeJs = require('airbrake-js');

class TemplateComponent extends React.Component {
  getChildContext() {
    return {
      'config': this.state.config,
      'logger': this.state.logger
    };
  }

  /**
   * Set the initial state
   */
  constructor(props) {
    super(props);

    this.state = {
      config: {},
      logger: {
        /* eslint-disable no-console */
        notify: function(msg) { console.error(msg); }
        /* eslint-enable no-console */
      }
    };
  }

  /**
   * Get the configuration file
   *
   * @return A promise
   */
  get_config() {
    return fetch('/config.json')
      .then(function(response) {
        if (!response.ok) {
          return Promise.reject(response.statusCode);
        }
        return response.json();
      })
      .catch(err => {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.log('GOT ERR loading config' + err);
      });
  }

  /**
   * Send errors to a logging system
   */
  setup_error_logger() {
    var config = this.state.config,
      logger;

    if (config.logger) {
      logger = new airbrakeJs({
        projectId: config.logger.api_key,
        projectKey: config.logger.api_key,
        reporter: 'xhr',
        host: config.logger.host
      });

      this.setState({
        logger: logger
      });
    }
  }

  /**
   * Get/parse config data.
   *
   * Called by React after the initial render.
   */
  componentDidMount() {
    var app = this;

    app
      .get_config()
      .then(function(config) {
        app.setState(
          {
            config: config
          },
          app.setup_error_logger
        );
      })
      .catch(function(reason) {
        app.state.logger.notify(reason);
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
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

export default TemplateComponent;
