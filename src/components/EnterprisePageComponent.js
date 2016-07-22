'use strict';

import React from 'react';

import Enterprise from './EnterpriseComponent.js';

var slug = require('slug');
slug.defaults.mode = 'rfc3986';

require('styles/EnterprisePage.scss');

class EnterprisePageComponent extends React.Component {
  render() {
    var curr_page_slug = this.props.params.slug,
      directory = this.props.directory,
      enterprise,
      jsx;

    enterprise = directory.filter(function(enterprise) {
      return slug(enterprise.name) === curr_page_slug;
    })[0];

    if (directory === null) { // The directory hasn't loaded yet
      jsx = 'Loading...';
    } else if (enterprise === undefined) { // Invalid enterprise slug
      jsx = 'Unknown Enterprise';
    } else { // Display enterprise details
      jsx = <Enterprise enterprise={enterprise} />;
    }

    return (
      <div className="enterprise-details enterprisepage-component">
        {jsx}
      </div>
    );
  }
}

EnterprisePageComponent.displayName = 'EnterprisePageComponent';

// Uncomment properties you need
// EnterprisePageComponent.propTypes = {};
// EnterprisePageComponent.defaultProps = {};

export default EnterprisePageComponent;
