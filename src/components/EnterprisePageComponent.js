'use strict';

import React from 'react';

import Enterprise from './EnterpriseComponent.js';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterprisePageComponent extends React.Component {
  /**
   * Set the default state
   */
  constructor(props) {
    super(props);

    this.state = {
      enterprise: null
    };
  }

  componentDidMount() {
    this.fetchEnterprise();
  }

  fetchEnterprise() {
    var component = this,
      url  = this.context.config.api_root + '/enterprise/' + this.props.params.id;

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json().then(function(json) {
            component.setState({
              enterprise: json
            });
          });
        }
      });
  }

  render() {
    var enterprise = this.state.enterprise,
      jsx = null;

    if (!this.state.enterprise) {
      jsx = 'Loading...';
    } else {
      jsx = <Enterprise enterprise={enterprise} />;
    }

    return (
      <div className="enterprisepage-component page">
        {jsx}
      </div>
    );
  }
}

EnterprisePageComponent.displayName = 'EnterprisePageComponent';

EnterprisePageComponent.contextTypes = {
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

export default EnterprisePageComponent;
