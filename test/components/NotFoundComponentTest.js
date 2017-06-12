/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import { NotFoundComponent } from 'components/NotFoundComponent.js';

describe('NotFoundComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NotFoundComponent t={key => key} />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('notfound-component')).to.equal(true);
  });
});
