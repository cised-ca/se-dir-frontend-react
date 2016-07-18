'use strict';

import React from 'react';
import { Link } from 'react-router';

require('styles/Enterprise.scss');

var slug = require('slug');
slug.defaults.mode = 'rfc3986';

class EnterpriseComponent extends React.Component {
  render() {
    var enterprise = this.props.enterprise;

    return (
      <div className="enterprise">
        <div className="enterprise__logo">
          <img src={'/images/logos/' + enterprise.logo} alt={enterprise.name + ' logo'}
            title={enterprise.name + ' logo'} />
        </div>
        <div className="enterprise__details">
          <h2 className="enterprise__title">
            <Link to={'/enterprise/' + slug(enterprise.name)}>{enterprise.name}</Link>
          </h2>
          <div className="enterprise__description">{enterprise.description}</div>
          <div className="enterprise__website">
            <a href={enterprise.website}>Website</a>
          </div>
        </div>
      </div>
    );
  }
}

EnterpriseComponent.displayName = 'EnterpriseComponent';

// Uncomment properties you need
// EnterpriseComponent.propTypes = {};
// EnterpriseComponent.defaultProps = {};

export default EnterpriseComponent;
