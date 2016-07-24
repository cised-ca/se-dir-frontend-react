/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import ApplicationFormComponent from 'components//ApplicationFormComponent.js';

describe('ApplicationFormComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(ApplicationFormComponent, {
      'config': {
        'api_root': 'http://example.org/api/v1'
      }
    });
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('applicationform-component');
  });
});
