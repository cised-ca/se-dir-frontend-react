'use strict';

import React from 'react';

import EnterpriseSummary from './EnterpriseSummaryComponent.js';

require('styles/Directory.scss');

class DirectoryComponent extends React.Component {
  render() {
    var directory = this.props.directory,
      jsx = [];

    // Directory hasn't loaded yet, display 'loading' notice
    if (directory === null) {
      jsx.push(<li>Loading...</li>);
    } else {
      jsx.push(
        directory.map(function(enterprise, index) {
          return (
            <li className='directory-item' key={index}>
              <EnterpriseSummary enterprise={enterprise} />
            </li>
          );
        })
      );
    }

    return (
      <ol className='directory-component'>
        {jsx}
      </ol>
    );
  }
}

DirectoryComponent.displayName = 'DirectoryComponent';

// Uncomment properties you need
// DirectoryComponent.propTypes = {};
// DirectoryComponent.defaultProps = {};

export default DirectoryComponent;
