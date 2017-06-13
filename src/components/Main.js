require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';

import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import Homepage from './HomepageComponent.js';
import EnterprisePage from './EnterprisePageComponent.js';
import NotFound from './NotFoundComponent.js';
import Template from './TemplateComponent.js';
import Directory from './DirectoryComponent.js';
import ApplicationForm from './ApplicationFormComponent.js';
import PrivacyPolicy from './PrivacyPolicyComponent.js';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-97087495-1');

import 'whatwg-fetch';

class AppComponent extends React.Component {
  logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router history={browserHistory} onUpdate={this.logPageView}>
        <Route
          component={Template}
          path='/'
          onChange={(prevState, nextState) => {
            if (nextState.location.action !== 'POP') {
              window.scrollTo(0, 0);
            }
          }}
        >
          <IndexRoute component={Homepage} />
          <Route name="enterprise" path='/enterprise/:id/:slug' component={EnterprisePage} />
          <Route name="directory" path='/directory' component={Directory} />
          <Route name='application-form' path='/apply' component={ApplicationForm} />
          <Route name='privacy-policy' path='/privacy' component={PrivacyPolicy} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
