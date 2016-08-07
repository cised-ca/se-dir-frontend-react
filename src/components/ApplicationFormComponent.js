'use strict';

import React from 'react';

import Banner from './BannerComponent.js';

var serialize = require('form-serialize');

// TODO: Client-side form validation
class ApplicationFormComponent extends React.Component {
  componentWillMount() {
    this.setState({
      'status': 'init'
    });
  }

  /**
   * After we re-render the component (due to form submission) focus/scroll on
   * the banner to ensure people see the success/error status
   */
  componentDidUpdate() {
    var banner = document.querySelector('.banner');

    if (banner) {
      banner.focus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var component = this,
      form = e.target,
      url = form.getAttribute('action'),
      obj = serialize(form, {hash: true}),
      json;

    try {
      json = JSON.stringify(obj);
    } catch(e) {
      component.setState({
        'status': 'error',
        'error': 'Invalid response from server'
      });
    }

    component
      .http_post(url, json)
      .then(function() {
        component.setState({
          'status': 'success'
        });

        document.querySelector('.js-application-form').style.display = 'none';
      })
      .catch(function(err) {
        component.setState({
          'status': 'error',
          'error': err
        });
      });
  }

  http_post(url, data) {
    var promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject(this.status + ' ' + this.statusText); // TODO: Better and translatable error messages.
        }
      };

      xhr.onerror = function() {
        var statusText = this.statusText;

        if (this.status === 0 && statusText === '') {
          statusText = 'Unsent.';
        }

        reject(this.status + ' ' + statusText); // TODO: Better and translatable error messages.
      };

      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data);
    });

    return promise;
  }

  render() {
    var banner = null;

    // Show "Loading..." and bail early if we don't have the configs yet
    if (this.props.config === null) {
      return (
        <div className='applicationform-component page'>
          Loading...
        </div>

      );
    }

    switch(this.state.status) {
      case 'success':
        banner = (
          <Banner type='success' title='Success'>
            Your application will be processed shortly.
          </Banner>
        );
        break;
      case 'error':
        banner = (
          <Banner type='error' title='Error'>
            <p>
              We were unable to submit your application at this time.
              Please let us know of the issue, and include this error code:&nbsp;
              "{this.state.error}"
            </p>
          </Banner>
        );
        break;
    }

    return (
      <div className='applicationform-component page'>
        <h1>Application</h1>

        {banner}

        <form action={this.props.config.api_root + '/enterprise'} className='js-application-form'
          method='post' onSubmit={this.handleSubmit.bind(this)}>

          <label className='required' htmlFor='enterprise-name'>Enterprise Name</label>
          <input id='enterprise-name' name='name' required='required' type='text' />

          <label htmlFor='parent-organization'>Parent Organization (if applicable)</label>
          <input id='parent-organization' name='parent-organization' type='text' />

          <label htmlFor='business-description'>Business Description</label>
          <textarea id='business-description' name='description'></textarea>

          <label htmlFor='offering'>Product/Service Offering</label>
          <textarea id='offering' name='offering'></textarea>

          <label htmlFor='website'>Website</label>
          <input id='website' name='website' type='url' />

          <label className='required' htmlFor='main-contact'>Main Contact Person</label>
          <input id='main-contact' name='main-contact' required='required' type='text' />

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
