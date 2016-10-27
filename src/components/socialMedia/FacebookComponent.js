'use strict';

import React from 'react';

class FacebookComponent extends React.Component {
  render() {
    var url = 'https://www.facebook.com/' + this.props.account;

    return (
      <div className="facebook-component">
        <a href={url}>
          <img className="socialmedia__icon" src="/images/facebook.png" alt="" />
          <span className="socialmedia__name">facebook</span>
        </a>
      </div>
    );
  }
}

FacebookComponent.displayName = 'SocialMediaFacebookComponent';

// Uncomment properties you need
// FacebookComponent.propTypes = {};
// FacebookComponent.defaultProps = {};

export default FacebookComponent;
