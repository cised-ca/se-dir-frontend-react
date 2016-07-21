/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import SearchFormComponent from 'components//SearchFormComponent.js';

describe('SearchFormComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(SearchFormComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className.split(' ').indexOf('searchform-component')).not.to.equal(-1);
  });
});
