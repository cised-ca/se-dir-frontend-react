'use strict';

import React from 'react';

require('styles//Banner.scss');

class BannerComponent extends React.Component {
  render() {
    var type = this.props.type || 'info',
      title = '';

    if (this.props.title) {
      title = <h1 className='banner__heading'>{this.props.title}</h1>;
    }

    return (
      <section className={'banner banner-component banner--' + type}
        tabIndex='-1'>
        {title}
        {this.props.children}
      </section>
    );
  }
}

BannerComponent.displayName = 'BannerComponent';

// Uncomment properties you need
// BannerComponent.propTypes = {};
// BannerComponent.defaultProps = {};

export default BannerComponent;
