require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import Homepage from './HomepageComponent.js';
import EnterprisePage from './EnterprisePageComponent.js';
import Template from './TemplateComponent.js';
import Directory from './DirectoryComponent.js';
import ApplicationForm from './ApplicationFormComponent.js';

class AppComponent extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Template}>
          <IndexRoute component={Homepage} />
          <Route name="enterprise" path='/enterprise/:slug' component={EnterprisePage} />
          <Route name="directory" path='/directory' component={Directory} />
          <Route name='application-form' path='/apply' component={ApplicationForm} />
        </Route>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
