/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow, mount } from 'enzyme';

import { HomepageComponentWithoutRouter } from 'components/HomepageComponent.js';
import SearchForm from 'components/SearchFormComponent.js';
import SearchResults from 'components/SearchResultsComponent.js';

describe('HomepageComponent', () => {
  /**
   * Pageload with and without search-query
   */

  it('should render one <SearchForm /> component', () => {
    var locationProp,
      configProp,
      component;

    locationProp = {
      'query': ''
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    component = shallow(
      <HomepageComponentWithoutRouter location={locationProp} config={configProp} />
    );

    expect(component.find(SearchForm)).to.have.length(1);
  });


  /**
   * Query-less pageload
   */

  it('should not render <SearchResults /> on query-less pageloads', () => {
    var locationProp,
      configProp,
      component;

    locationProp = {
      'query': ''
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    component = shallow(
      <HomepageComponentWithoutRouter location={locationProp} config={configProp} />
    );

    expect(component.find(SearchResults)).to.have.length(0);
  });


  it('should show the intro title/tagline on query-less pageloads', () => {
    var locationProp,
      configProp,
      component;

    locationProp = {
      'query': ''
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    component = shallow(
      <HomepageComponentWithoutRouter location={locationProp} config={configProp} />
    );

    expect(component.find('.intro')).to.have.length(1);
  });


  /**
   * Pageload with a search-query
   */

  it('should render one <SearchResults /> component on pageloads with search-query', () => {
    var locationProp,
      configProp,
      component;

    locationProp  = {
      'query': {
        'q': 'ottawa'
      }
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    component = shallow(
      <HomepageComponentWithoutRouter location={locationProp} config={configProp} />
    );

    expect(component.find(SearchResults)).to.have.length(1);
  });


  it('should not show the intro title/tagline on pageloads with search-query', () => {
    var locationProp,
      configProp,
      component;

    locationProp  = {
      'query': {
        'q': 'ottawa'
      }
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    component = shallow(
      <HomepageComponentWithoutRouter location={locationProp} config={configProp} />
    );

    expect(component.find('.intro')).to.have.length(0);
  });


  /**
   * Other
   */

  it('should have its component name as default className', () => {
    var locationProp,
      configProp,
      component;

    locationProp = {
      'query': ''
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    component = shallow(<HomepageComponentWithoutRouter location={locationProp} config={configProp} />);

    expect(component.hasClass('homepage-component')).to.equal(true);
  });


  /**
   * Show results on form-submit
   */

  it('should display search results on form submit', () => {
    var locationProp,
      configProp,
      directoryProp = [],
      routerProp,
      homepage;

    routerProp = {
      'push': function() {} // no-op
    };

    locationProp = {
      'query': ''
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    homepage = mount(<HomepageComponentWithoutRouter location={locationProp} config={configProp}
      directory={directoryProp} router={routerProp} />);

    homepage.find('.search-form').simulate('submit');

    expect(homepage.find(SearchResults)).to.have.length(1);
  });


  /**
   * Animate hiding the intro on form-submit
   */

  it('should hide the intro on form submit', () => {
    var locationProp,
      configProp,
      directoryProp = [],
      routerProp,
      homepage;

    routerProp = {
      'push': function() {} // no-op
    };

    locationProp = {
      'query': ''
    };

    configProp = {
      'api_root': 'http://example.org/api/v1/'
    };

    homepage = mount(<HomepageComponentWithoutRouter location={locationProp} config={configProp}
      directory={directoryProp} router={routerProp} />);

    homepage.find('.search-form').simulate('submit');

    // We check if .intro has the class slide-up instead of checking whether .intro
    // is in the DOM or not, because when we're checking, the animation isn't done
    // and .intro is still in the DOM. It's removed after the animation is complete.
    expect(homepage.find('.intro').hasClass('slide-up')).to.equal(true);
  });
});

