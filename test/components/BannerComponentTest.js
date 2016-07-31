/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import BannerComponent from 'components//BannerComponent.js';

describe('BannerComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(BannerComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className.split(' ').indexOf('banner-component')).not.to.equal(-1);
  });
});
