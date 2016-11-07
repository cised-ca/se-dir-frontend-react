'use strict';

import React from 'react';
import { Link } from 'react-router';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterpriseSummaryComponent extends React.Component {
  // FIXME: Dupe (component/TemplateComponent.js)
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

      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.responseType = 'text';

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          for (var responseText = xhr.responseText, responseTextLen = responseText.length, binary = '', i = 0; i < responseTextLen; ++i) {
            binary += String.fromCharCode(responseText.charCodeAt(i) & 255);
          }

          resolve(window.btoa(binary));
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

  componentDidMount() {
    var app = this;

    app
      .http_get(app.props.api_root + '/enterprise/' + app.props.enterprise.id + '/logo')
      .then(function(logo) {
        app.setState({
          logo: logo
        });
      });
  }

  render() {
    var enterprise = this.props.enterprise,
      enterprise_description = enterprise.short_description,
      enterprise_logo = null,
      enterprise_link = <Link to={'/enterprise/' + slug(enterprise.name)}>{enterprise.name}</Link>,
      more_info = (
          <div className="enterprise__website">
            <a href={'/enterprise/' + slug(enterprise.name)}>More info</a>
          </div>
      );

    if (this.props.linkto === 'external') {
      enterprise_link = <a href={enterprise.website}>{enterprise.name}</a>;
      enterprise_description = enterprise.description;
      more_info = null;
    }

    if (this.state != null && this.state.logo) {
      enterprise_logo = (
          <img src={'data:image/jpeg;base64,' + this.state.logo} alt={enterprise.name + ' logo'}
            title={enterprise.name + ' logo'} />
      );
    }

    return (
      <div className="enterprise-summary enterprisesummary-component">
        <div className="enterprise__logo">
          {enterprise_logo}
        </div>
        <div className="enterprise__details">
          <h2 className="enterprise__title">
            {enterprise_link}
          </h2>
          <div className="enterprise__description">{enterprise_description}</div>
          {more_info}

          {this.props.children}
        </div>
      </div>
    );
  }
}

EnterpriseSummaryComponent.displayName = 'EnterpriseSummaryComponent';

// Uncomment properties you need
// EnterpriseSummaryComponent.propTypes = {};
// EnterpriseSummaryComponent.defaultProps = {};

export default EnterpriseSummaryComponent;
