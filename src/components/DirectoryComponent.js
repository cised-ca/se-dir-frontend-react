'use strict';

import React from 'react';

import { browserHistory } from 'react-router';
import SearchResults from './SearchResultsComponent.js';

class DirectoryComponent extends React.Component {
  render() {
    return (
      <div className="directory-component page">
        <a className="back" onClick={browserHistory.goBack}>Back</a>

        <SearchResults searchText="" />
      </div>
    );
  }
}

DirectoryComponent.displayName = 'DirectoryComponent';

export default DirectoryComponent;
