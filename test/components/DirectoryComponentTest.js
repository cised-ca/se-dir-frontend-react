/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import DirectoryComponent from 'components//DirectoryComponent.js';

describe('DirectoryComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(
      DirectoryComponent,
      {
        directory: []
      }
    );
  });

  it('should have its component name as default className', () => {
    expect(component.props.className.split(' ').indexOf('directory-component')).not.to.equal(-1);
  });
});
