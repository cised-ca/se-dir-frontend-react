'use strict';

import React from 'react';

import SiteNavigation from './SiteNavigationComponent';
import i18n from '../i18n';

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
  setup_error_logger(config) {
    var logger;

    logger = new airbrakeJs({
      projectId: config.logger.api_key,
      projectKey: config.logger.api_key,
      reporter: 'xhr',
      host: config.logger.host
    });

    return logger;
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
        let logger = app.state.logger;

        // If we have a logger in the configs, set it up
        // otherwise it will default to the browser's console.error()
        if (config.logger) {
          logger = app.setup_error_logger(config);
        }

        let currentLocale = config.defaultLocale || 'en';

        // If we have locales in the config, figure out which language to
        // display to the user based on the current url
        if (config.locales) {
          let currentUrl = window.location.href;

          for (let i = 0; i < config.locales.length; i += 1) {
            let locale = config.locales[i];
            let pattern = new RegExp('^' + locale.prefix, 'i');

            if (currentUrl.search(pattern) !== -1) {
              currentLocale = locale.locale;
              break;
            }
          }
        }

        i18n.changeLanguage(currentLocale);

        app.setState(
          {
            config: config,
            logger: logger
          }
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
