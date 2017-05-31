'use strict';

import React from 'react';

import Facebook from './socialMedia/FacebookComponent.js';
import Instagram from './socialMedia/InstagramComponent.js';
import Twitter from './socialMedia/TwitterComponent.js';

class SocialMediaComponent extends React.Component {
  render() {
    var jsx = [],
      website = null,
      enterprise = this.props.enterprise;

    if (enterprise.facebook) {
      jsx.push(
        <li key="facebook" className="socialmedia__account">
          <Facebook key="facebook" account={enterprise.facebook} />
        </li>
      );
    }

    if (enterprise.instagram) {
      jsx.push(
        <li key="instagram" className="socialmedia__account">
          <Instagram key="instagram" account={enterprise.instagram} />
        </li>
      );
    }

    if (enterprise.twitter) {
      jsx.push(
        <li key="twitter" className="socialmedia__account">
          <Twitter key="twitter" account={enterprise.twitter} />
        </li>
      );
    }

    if (enterprise.website) {
      website = (
        <a href={enterprise.website} target="_blank" rel="noopener">Website</a>
      );
    }

    if (jsx.length > 0) {
      jsx = (
        <div className="socialmedia">
          <h2>Contact</h2>
          {website}
          <ul className="socialmedia__accounts socialmedia__accounts--mini">
            {jsx}
          </ul>
        </div>
      );
    } else {
      jsx = null;
    }

    return (
      <div className="socialmedia-component">
        {jsx}
      </div>
    );
  }
}

SocialMediaComponent.displayName = 'SocialMediaComponent';

// Uncomment properties you need
// SocialMediaComponent.propTypes = {};
// SocialMediaComponent.defaultProps = {};

export default SocialMediaComponent;
