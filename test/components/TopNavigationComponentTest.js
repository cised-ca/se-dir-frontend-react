/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import TopNavigationComponent from 'components//TopNavigationComponent.js';

describe('TopNavigationComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(TopNavigationComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('topnavigation-component');
  });
});
