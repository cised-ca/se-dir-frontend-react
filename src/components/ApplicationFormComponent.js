'use strict';

import React from 'react';

var serialize = require('form-serialize');

require('styles/ApplicationForm.scss');

class ApplicationFormComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    var form = e.target,
      url = form.getAttribute('action'),
      obj = serialize(form, {hash: true}),
      json;

    try {
      json = JSON.stringify(obj);
    } catch(e) {
      // TODO: user feedback (display error)
    }

    this
      .http_post(url, json)
      .then(function() {
        // TODO: user feedback (acknowledgment notice/page)
      })
      .catch(function(/*err*/) {
        // TODO: user feedback (display error)
      });
  }

  http_post(url, data) {
    var promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };

      xhr.onerror = function() {
        reject(this.statusText);
      };

      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data);
    });

    return promise;
  }

  render() {
    return (
      <div className='applicationform-component'>
        <h1>Application Form</h1>

        <form action={this.props.config.api_root + '/enterprise'} method='post'
          onSubmit={this.handleSubmit.bind(this)}>

          <label className='required' htmlFor='enterprise-name'>Enterprise Name</label>
          <input id='enterprise-name' name='name' required='required' />

          <label htmlFor='parent-organization'>Parent Organization (if applicable)</label>
          <input id='parent-organization' name='parent-organization' />

          <label htmlFor='business-description'>Business Description</label>
          <textarea id='business-description' name='description'></textarea>

          <label htmlFor='offering'>Product/Service Offering</label>
          <textarea id='offering' name='offering'></textarea>

          <label htmlFor='website'>Website</label>
          <input id='website' name='website' type='url' />

          <label className='required' htmlFor='main-contact'>Main Contact Person</label>
          <input id='main-contact' name='main-contact' required='required' />

          <label htmlFor='phone-number'>Phone Number</label>
          <input id='phone-number' name='phone-number' type='tel' />

          <label htmlFor='email-address'>Email Address</label>
          <input id='email-address' name='email-address' type='email' />

          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

ApplicationFormComponent.displayName = 'ApplicationFormComponent';

// Uncomment properties you need
// ApplicationFormComponent.propTypes = {};
// ApplicationFormComponent.defaultProps = {};

export default ApplicationFormComponent;
