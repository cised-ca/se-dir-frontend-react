'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

class NotFoundComponent extends React.Component {
  render() {
    return (
      <div className="page notfound-component">
        <a className="back" onClick={browserHistory.goBack}>Back</a>

        <p>Page not found.</p>
      </div>
    );
  }
}

NotFoundComponent.displayName = 'NotFoundComponent';

export default NotFoundComponent;
