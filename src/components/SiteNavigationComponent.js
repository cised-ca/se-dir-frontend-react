'use strict';

import React from 'react';
import { Link } from 'react-router';

class SiteNavigationComponent extends React.Component {
  render() {
    return (
      <header className="header sitenavigation-component">
        <nav className="nav nav--top">
          <ul className="nav__items">
            <li className="nav__item">
              <Link className="nav__link" to="/">Home</Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/apply">Be part of our Directory</Link>
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

export default SiteNavigationComponent;
