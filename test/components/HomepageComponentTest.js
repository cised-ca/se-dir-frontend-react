/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import { HomepageComponentWithoutRouter } from 'components//HomepageComponent.js';

describe('HomepageComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(HomepageComponentWithoutRouter, {location: {query: ''}});
  });

  it('should have its component name as default className', () => {
    expect(component.props.className.split(' ').indexOf('homepage-component')).not.to.equal(-1);
  });
});
