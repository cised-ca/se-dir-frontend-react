/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import ApplicationFormComponent from 'components/ApplicationFormComponent.js';

describe('ApplicationFormComponent', () => {
  let component;

  beforeEach(() => {
    var configProp = {
      'config': {
        'api_root': 'http://example.org/api/v1'
      }
    };

    component = shallow(<ApplicationFormComponent config={configProp} />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('applicationform-component')).to.equal(true);
  });
});
