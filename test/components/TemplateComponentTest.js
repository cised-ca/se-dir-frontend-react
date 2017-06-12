/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import TemplateComponent from 'components/TemplateComponent.js';
import { HomepageComponent } from 'components/HomepageComponent.js';

describe('TemplateComponent', () => {
  let component;

  var stateProp = {};

  beforeEach(() => {
    component = shallow(
      <TemplateComponent state={stateProp}>
        <HomepageComponent />
      </TemplateComponent>
    );
  });

  it('should have its component name as default className', () => {
    expect(component.hasClass('template-component')).to.equal(true);
  });
});
