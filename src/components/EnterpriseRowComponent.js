'use strict';

import React from 'react';
import Enterprise from './EnterpriseComponent.js';

require('styles//EnterpriseRow.scss');

class EnterpriseRowComponent extends React.Component {
  render() {
    return (
      <div className='row'>
        {
          this.props.row.map(function(enterprise, index) {
            return (
              <Enterprise key={index} enterprise={enterprise} />
            );
          })
        }
      </div>
    );
  }
}

EnterpriseRowComponent.displayName = 'EnterpriseRowComponent';

// Uncomment properties you need
// EnterpriseRowComponent.propTypes = {};
// EnterpriseRowComponent.defaultProps = {};

export default EnterpriseRowComponent;
