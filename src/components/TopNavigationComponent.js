'use strict';

import React from 'react';
import { Link } from 'react-router';

require('styles/TopNavigation.scss');

class TopNavigationComponent extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="nav nav--top">
          <ul className="nav__items">
            <li className="nav__item">
              <Link className="nav__link" to="/">Home</Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/directory">Directory</Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/application">Be part of our Directory</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

TopNavigationComponent.displayName = 'TopNavigationComponent';

// Uncomment properties you need
// TopNavigationComponent.propTypes = {};
// TopNavigationComponent.defaultProps = {};

export default TopNavigationComponent;
