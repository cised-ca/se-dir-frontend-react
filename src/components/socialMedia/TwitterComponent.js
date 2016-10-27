'use strict';

import React from 'react';

class TwitterComponent extends React.Component {
  render() {
    var url = 'https://www.twitter.com/' + this.props.account;

    return (
      <div className="twitter-component">
        <a href={url}>
          <img className="socialmedia__icon" src="/images/twitter.png" alt="" />
          <span className="socialmedia__name">twitter</span>
        </a>
      </div>
    );
  }
}

TwitterComponent.displayName = 'SocialMediaTwitterComponent';

// Uncomment properties you need
// TwitterComponent.propTypes = {};
// TwitterComponent.defaultProps = {};

export default TwitterComponent;
