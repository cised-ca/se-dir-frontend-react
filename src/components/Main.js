require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import { browserHistory, Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import Homepage from './HomepageComponent.js';
import EnterprisePage from './EnterprisePageComponent.js';
import Template from './TemplateComponent.js';

class AppComponent extends React.Component {
  render() {
    var locales = ['en', 'fr'],
      defaultLocale = 'en';

    return (
      <Router history={browserHistory}>
        <Route path='/'>
          {/* Redirect root to default locale homepage */}
          <IndexRedirect to={defaultLocale + '/'} />

          {locales.map(function(locale, index) {
            return (
              <Route key={index} path={locale + '/'} locale={locale} component={Template}>
                <IndexRoute component={Homepage} />,
                <Route name="enterprise" path='enterprise/:id' component={EnterprisePage} />
              </Route>
            );
          })}
        </Route>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
