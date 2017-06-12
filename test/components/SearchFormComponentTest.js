/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { mount } from 'enzyme';

import { SearchFormComponent } from 'components/SearchFormComponent.js';

describe('SearchFormComponent', () => {
  let component;

  beforeEach(() => {
    let componentOptions = {
      context: {
        config: {
          api_root: '',
          geo_api_root: 'test'
        }
      },
      childContextTypes: {
        'config': React.PropTypes.object
      }
    };
    component = mount(
      <SearchFormComponent t={key => key} />,
      componentOptions
    );
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('searchform-component')).to.equal(true);
  });
});
