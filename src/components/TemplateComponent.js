'use strict';

import React from 'react';

import TopNavigation from './TopNavigationComponent.js';

var lunr = require('lunr');

require('styles//Template.scss');

class TemplateComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      directory: null,
      index: null
    };
  }

  /**
   * This is called automatically by React. Immediately after the initial render.
   * See: https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount
   */
  componentDidMount() {
    var app = this; // Cache 'this' so we can use it in xhr callback
    this.serverRequest = new XMLHttpRequest();

    this.serverRequest.onreadystatechange = function(response) {
      if (this.readyState === 4){
        // TODO: Error handling
        var directory = JSON.parse(response.target.response);
        app.initializeClientSideSearch(directory);
      }
    };

    this.serverRequest.open('GET', '/data/directory.json', true);
    this.serverRequest.send();
  }

  /**
   * Initialize the Lunr search
   * @param {Object} directory The CISED directory data
   */
  initializeClientSideSearch(directory) {
    // Init lunr
    var lunr_index = lunr(function() {
      this.field('title', {boost: 10});
      this.field('description');
      this.ref('id');
    });

    // Index enterprises
    directory.enterprises.forEach(function(enterprise, index) {
      lunr_index.add({
        title: enterprise.title,
        description: enterprise.description,
        id: index
      });
    });

    // Save the index and directory data
    this.setState({
      index: lunr_index,
      directory: directory
    });
  }

  render() {
    /* Copy state information from this component to the child component's properties */
    var childWithProps = React.cloneElement(this.props.children, this.state);

    return (
      <div>
        {/* Every page will have the navigation component */}
        <TopNavigation />

        {/* The router will decide what to render here based on the URL we're at */}
        {childWithProps}
      </div>
    );
  }
}

TemplateComponent.displayName = 'TemplateComponent';

// Uncomment properties you need
// TemplateComponent.propTypes = {};
// TemplateComponent.defaultProps = {};

export default TemplateComponent;
