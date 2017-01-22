'use strict';

import React from 'react';

import Enterprise from './EnterpriseComponent.js';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterprisePageComponent extends React.Component {
  render() {
    var curr_page_slug = this.props.params.slug,
      directory = this.props.directory,
      enterprise,
      jsx;

    if (directory === null) { // The directory hasn't loaded yet
      jsx = 'Loading...';
    } else {
      enterprise = directory.filter(function(enterprise) {
        return slug(enterprise.name) === curr_page_slug;
      })[0];

      if (enterprise === undefined) { // Invalid enterprise slug
        jsx = 'Unknown Enterprise';
      } else { // Display enterprise details
        jsx = <Enterprise enterprise={enterprise} />;
      }
    }

    return (
      <div className="enterprisepage-component page">
        {jsx}
      </div>
    );
  }
}

EnterprisePageComponent.displayName = 'EnterprisePageComponent';

export default EnterprisePageComponent;
