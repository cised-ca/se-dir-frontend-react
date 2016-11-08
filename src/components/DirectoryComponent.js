'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

import EnterpriseSummary from './EnterpriseSummaryComponent.js';

class DirectoryComponent extends React.Component {
  render() {
    var directory = this.props.directory,
      jsx = [],
      app = this;

    // Directory hasn't loaded yet, display 'loading' notice
    if (directory === null) {
      jsx.push(<li key="loading" >Loading...</li>);
    } else {
      jsx.push(
        directory.map(function(enterprise) {
          return (
            <li className='directory-item' key={enterprise.id}>
              <EnterpriseSummary enterprise={enterprise} api_root={app.props.config.api_root} />
            </li>
          );
        })
      );
    }

    return (
      <div className="directory-component page">
        <a className="back" onClick={browserHistory.goBack}>Back</a>

        <ol className="directory__list">
          {jsx}
        </ol>
      </div>
    );
  }
}

DirectoryComponent.displayName = 'DirectoryComponent';

// Uncomment properties you need
// DirectoryComponent.propTypes = {};
// DirectoryComponent.defaultProps = {};

export default DirectoryComponent;
