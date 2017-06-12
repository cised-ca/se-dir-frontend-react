'use strict';

import React from 'react';

import Banner from './BannerComponent';
import Loading from './LoadingComponent';
import Back from './BackComponent';

import { translate } from 'react-i18next';

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
    const { t } = this.props;

    // Show "Loading..." and bail early if we don't have the configs yet
    if (this.props.config === null) {
      return (
        <div className='applicationform-component page'>
          <Loading />
        </div>

      );
    }

    if (this.state.status === 'success') {
      return (
        <div className='applicationform-component page'>
          <Back />

          <Banner type='success' title='Success'>
            {t('applicationForm:processed')}
          </Banner>
        </div>
      );
    }

    return (
      <div className='applicationform-component page'>
        <Back />

        <h1>{t('applicationForm:title')}</h1>

        <form action='https://docs.google.com/forms/d/1pq5VthlSmoC9xxOUUZ9LBEGsa-OVHgkKZg0AgD1x-Dk'
          className='js-application-form' method='post' onSubmit={this.handleSubmit.bind(this)} ref='applicationForm' >

          <label className='required' htmlFor='enterprise-name'>{t('applicationForm:enterpriseName')}</label>
          <input id='enterprise-name' name='entry.2005620554' required='required' type='text' />

          <label htmlFor='parent-organization'>{t('applicationForm:parentOrganization')}</label>
          <input id='parent-organization' name='entry.1045781291' type='text' />

          <label htmlFor='business-description'>{t('applicationForm:businessDescription')}</label>
          <textarea id='business-description' name='entry.1065046570'></textarea>

          <label htmlFor='offering'>{t('applicationForm:serviceOffering')}</label>
          <textarea id='offering' name='entry.1166974658'></textarea>

          <label htmlFor='website'>{t('applicationForm:website')}</label>
          <input id='website' name='entry.839337160' type='url' />

          <label className='required' htmlFor='main-contact'>{t('applicationForm:mainContact')}</label>
          <input id='main-contact' name='entry.1217363806' required='required' type='text' />

          <label htmlFor='phone-number'>{t('applicationForm:phoneNumber')}</label>
          <input id='phone-number' name='entry.1930753223' type='tel' />

          <label htmlFor='email-address'>{t('applicationForm:emailAddress')}</label>
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

export default translate('applicationForm')(ApplicationFormComponent);
