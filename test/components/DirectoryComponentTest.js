/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import DirectoryComponent from 'components/DirectoryComponent.js';

describe('DirectoryComponent', () => {
  let component;

  var directoryProp = [];

  beforeEach(() => {
    component = shallow(<DirectoryComponent directory={directoryProp} />);
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('directory-component')).to.equal(true);
  });
});
