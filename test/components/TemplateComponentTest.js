/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import TemplateComponent from 'components//TemplateComponent.js';
import { HomepageComponentWithoutRouter } from 'components//HomepageComponent.js';

describe('TemplateComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(
      TemplateComponent,
      {
        'state': {}
      },
      HomepageComponentWithoutRouter
    );
  });

  it('should have its component name as default className', () => {
    expect(component.props.className.split(' ').indexOf('template-component')).not.to.equal(-1);
  });
});
