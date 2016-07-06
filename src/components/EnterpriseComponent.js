'use strict';

import React from 'react';

require('styles/Enterprise.scss');

class EnterpriseComponent extends React.Component {
  render() {
    var enterprise = this.props.enterprise;

    return (
      <div className="col-md-3">
        <div className='search-result'>
          <div className="organization">
            <h2 className="organization__title">{enterprise.title}</h2>
            <div className="organization__description">{enterprise.description}</div>
            <div className="organization__website">
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
