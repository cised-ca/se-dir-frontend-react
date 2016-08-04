'use strict';

import React from 'react';
import { Link } from 'react-router';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterpriseSummaryComponent extends React.Component {
  render() {
    var enterprise = this.props.enterprise,
      enterprise_link = <Link to={'/enterprise/' + slug(enterprise.name)}>{enterprise.name}</Link>;

    if (this.props.linkto === 'external') {
      enterprise_link = <a href={enterprise.website}>{enterprise.name}</a>;
    }

    return (
      <div className="enterprise-summary enterprisesummary-component">
        <div className="enterprise__logo">
          <img src={'/images/logos/' + enterprise.logo} alt={enterprise.name + ' logo'}
            title={enterprise.name + ' logo'} />
        </div>
        <div className="enterprise__details">
          <h2 className="enterprise__title">
            {enterprise_link}
          </h2>
          <div className="enterprise__description">{enterprise.description}</div>
          <div className="enterprise__website">
            <a href={enterprise.website}>Website</a>
          </div>

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
