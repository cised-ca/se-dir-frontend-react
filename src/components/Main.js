require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import { Router, Route } from 'react-router';
import Homepage from './HomepageComponent.js';

class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Homepage} />
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
