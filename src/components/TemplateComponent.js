'use strict';

import React from 'react';

import TopNavigation from './TopNavigationComponent.js';

require('styles//Template.scss');

class TemplateComponent extends React.Component {
  render() {
    return (
      <div>
        {/* Every page will have a navigation item */}
        <TopNavigation />

        {/* The router will decide what to render here based on the URL we're at */}
        {this.props.children}
      </div>
    );
  }
}

TemplateComponent.displayName = 'TemplateComponent';

// Uncomment properties you need
// TemplateComponent.propTypes = {};
// TemplateComponent.defaultProps = {};

export default TemplateComponent;
