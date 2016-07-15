require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import Homepage from './HomepageComponent.js';
import EnterprisePage from './EnterprisePageComponent.js';
import Template from './TemplateComponent.js';

class AppComponent extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Template}>
          <IndexRoute component={Homepage} />
          <Route name="enterprise" path='/enterprise/:id' component={EnterprisePage} />
        </Route>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
