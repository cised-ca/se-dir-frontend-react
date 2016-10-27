'use strict';

import React from 'react';

class InstagramComponent extends React.Component {
  render() {
    var url = 'https://www.instagram.com/' + this.props.account;

    return (
      <div className="instagram-component">
        <a href={url}>
          <img className="socialmedia__icon" src="/images/instagram.png" alt="" />
          <span className="socialmedia__name">instagram</span>
        </a>
      </div>
    );
  }
}

InstagramComponent.displayName = 'SocialMediaInstagramComponent';

// Uncomment properties you need
// InstagramComponent.propTypes = {};
// InstagramComponent.defaultProps = {};

export default InstagramComponent;
