'use strict';

import React from 'react';

require('styles/Enterprise.scss');

class EnterpriseComponent extends React.Component {
  render() {
    var enterprise = this.props.enterprise;

    return (
      <div className='search-result'>
        <div className="enterprise">
          <div className="enterprise__logo">
            <img src={'/images/logos/' + enterprise.logo} alt={enterprise.title + ' logo'}
              title={enterprise.title + ' logo'} />
          </div>
          <div className="enterprise__details">
            <h2 className="enterprise__title">{enterprise.title}</h2>
            <div className="enterprise__description">{enterprise.description}</div>
            <div className="enterprise__website">
              <a href={enterprise.website}>Website</a>
            </div>
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
