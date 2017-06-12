'use strict';

import React from 'react';
import { Link } from 'react-router';

import { translate } from 'react-i18next';

class SiteNavigationComponent extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <header className="header sitenavigation-component">
        <nav className="nav nav--top">
          <ul className="nav__items">
            <li className="nav__item">
              <Link className="nav__link" to="/">{t('siteNavigation:home')}</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

SiteNavigationComponent.displayName = 'SiteNavigationComponent';

// Uncomment properties you need
// SiteNavigationComponent.propTypes = {};
// SiteNavigationComponent.defaultProps = {};

export default translate('siteNavigation')(SiteNavigationComponent);
