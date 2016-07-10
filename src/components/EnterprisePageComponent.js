'use strict';

import React from 'react';

import Enterprise from './EnterpriseComponent.js';

require('styles/EnterprisePage.scss');

class EnterprisePageComponent extends React.Component {
  render() {
    var id = this.props.params.id,
      directory = this.props.directory,
      enterprise,
      jsx;

    // FIXME: Right now, we're just displaying title, desc, website
    //        exactly like the search results. I'm just using this for testing
    //        until we make the decision described below.

    // TODO: Decide if we pull _all_ enterprise data on AppLoad
    //       If so, display extra data from the cached directory here
    //       If not, see the next todo.

    // TODO: Check if we have enterprise details in the cache
    //       if so, display that info
    //       if not, fetch data from API then display that info

    if (directory === null) { // The directory hasn't loaded yet
      jsx = 'Loading...';
    } else if (!directory.enterprises[id]) { // Invalid enterprise id
      jsx = 'Unknown Enterprise';
    } else { // Display enterprise details
      // Array indexes are zero-based, enterprise ids are not
      enterprise = directory.enterprises[id - 1];
      jsx = <Enterprise enterprise={enterprise} />;
    }

    return (
      <div className="enterprise-details">
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
