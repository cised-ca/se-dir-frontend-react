'use strict';

import React from 'react';

require('styles/EnterprisePage.scss');

class EnterprisePageComponent extends React.Component {
  render() {
    var id = this.props.params.id;

    // TODO: Check if we have enterprise details in the cache
    //       if so, display that info
    //       if not, fetch data from API then display that info

    return (
      <div className="enterprise-details">
        Enterprise details for enterprise id "{id}" will be here.
      </div>
    );
  }
}

EnterprisePageComponent.displayName = 'EnterprisePageComponent';

// Uncomment properties you need
// EnterprisePageComponent.propTypes = {};
// EnterprisePageComponent.defaultProps = {};

export default EnterprisePageComponent;
