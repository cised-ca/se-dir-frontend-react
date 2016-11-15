'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

import Banner from './BannerComponent.js';

var submitGoogleForm = require('google-form');

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

  // TODO: Error handling
  handleSubmit(e) {
    e.preventDefault();

    var applicationForm = this.refs.applicationForm;

    // Submit the form
    submitGoogleForm.submitGoogleForm(applicationForm);

    // Acknowledgement message
    this.setState({
      'status': 'success'
    });
  }

  render() {
    // Show "Loading..." and bail early if we don't have the configs yet
    if (this.props.config === null) {
      return (
        <div className='applicationform-component page'>
          Loading...
        </div>

      );
    }

    if (this.state.status === 'success') {
      return (
        <div className='applicationform-component page'>
          <a className="back" onClick={browserHistory.goBack}>Back</a>

          <Banner type='success' title='Success'>
            Your application will be processed shortly.
          </Banner>
        </div>
      );
    }

    return (
      <div className='applicationform-component page'>
        <a className="back" onClick={browserHistory.goBack}>Back</a>

        <h1>Application</h1>

        <form action='https://docs.google.com/forms/d/1pq5VthlSmoC9xxOUUZ9LBEGsa-OVHgkKZg0AgD1x-Dk'
          className='js-application-form' method='post' onSubmit={this.handleSubmit.bind(this)} ref='applicationForm' >

          <label className='required' htmlFor='enterprise-name'>Enterprise Name</label>
          <input id='enterprise-name' name='entry.2005620554' required='required' type='text' />

          <label htmlFor='parent-organization'>Parent Organization (if applicable)</label>
          <input id='parent-organization' name='entry.1045781291' type='text' />

          <label htmlFor='business-description'>Business Description</label>
          <textarea id='business-description' name='entry.1065046570'></textarea>

          <label htmlFor='offering'>Product/Service Offering</label>
          <textarea id='offering' name='entry.1166974658'></textarea>

          <label htmlFor='website'>Website</label>
          <input id='website' name='entry.839337160' type='url' />

          <label className='required' htmlFor='main-contact'>Main Contact Person</label>
          <input id='main-contact' name='entry.1217363806' required='required' type='text' />

          <label htmlFor='phone-number'>Phone Number</label>
          <input id='phone-number' name='entry.1930753223' type='tel' />

          <label htmlFor='email-address'>Email Address</label>
          <input id='email-address' name='entry.1617852215' type='email' />

          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

ApplicationFormComponent.displayName = 'ApplicationFormComponent';

ApplicationFormComponent.contextTypes = {
  'logger': React.PropTypes.object
};

// Uncomment properties you need
// ApplicationFormComponent.propTypes = {};
// ApplicationFormComponent.defaultProps = {};

export default ApplicationFormComponent;
