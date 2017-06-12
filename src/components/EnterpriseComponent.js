'use strict';

import React from 'react';

import EnterpriseSummary from './EnterpriseSummaryComponent';
import SocialMedia from './SocialMediaComponent';
import EnterpriseMap from './EnterpriseMapComponent';
import Back from './BackComponent';

import { translate } from 'react-i18next';

class EnterpriseComponent extends React.Component {
  /**
   * Build JSX for fax information
   */
  build_faxes() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      faxes = enterprise.faxes,
      jsx = [];

    faxes.map(function(fax, index) {
      if (fax.public === true) {
        jsx.push(
          <li key={index} className="enterprise-extended__fax">
            {fax.fax}
          </li>
        );
      }
    });

    if (jsx.length > 0) {
      jsx = (
        <div className="enterprise-extended__faxes">
          <h2>{t('enterprise:faxes')}</h2>
          <ul>
            {jsx}
          </ul>
        </div>
      );
    }

    return jsx;
  }

  /**
   * Build JSX for offering
   */
  build_offering() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      offering = enterprise.offering,
      jsx = null;

    if (offering.length > 0) {
      jsx = (
        <div className="enterprise-extended__offering">
          <h2>{t('enterprise:offering')}</h2>
          {offering}
        </div>
      );
    }

    return jsx;
  }

  /**
   * Build JSX for address information
   */
  build_addresses() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      addresses = enterprise.addresses,
      jsx = [];

    addresses.map(function(address, index) {
      if (address.public === true) {
        jsx.push(
          <li key={index} className="enterprise-extended__address">
            {address.address}
          </li>
        );
      }
    });

    if (jsx.length > 0) {
      jsx = (
        <div className="enterprise-extended__addresses">
          <h2>{t('enterprise:address')}</h2>
          <ul>
            {jsx}
          </ul>
        </div>
      );
    }

    return jsx;
  }

  /**
   * Build JSX for phone information
   */
  build_phones() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      phones = enterprise.phones,
      jsx = [];

    // Get all the public phone numbers
    phones.map(function(phone, index) {
      if (phone.public === true) {
        jsx.push(
          <li key={index} className="enterprise-extended__phone-number">
            {phone.number}
          </li>
        );
      }
    });

    // If we got at least one, wrap the <li> in a <ul></ul>
    if (jsx.length > 0) {
      jsx = (
        <div className="enterprise-extended__phones">
          <h2>{t('enterprise:phone')}</h2>
          <ul className="enterprise-extended__phone-numbers">
            {jsx}
          </ul>
        </div>
      );
    }

    return jsx;
  }

  /**
   * Build JSX for email information
   */
  build_emails() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      emails = enterprise.emails,
      jsx = [];

    // Get all the public email addresses
    emails.map(function(email, index) {
      if (email.public === true) {
        jsx.push(
          <li key={index} className="enterprise-extended__email-address">
            {email.email}
          </li>
        );
      }
    });

    // If we got at least one, wrap the <li> in a <ul></ul>
    if (jsx.length > 0) {
      jsx = (
        <div className="enterprise-extended__emails">
          <h2>{t('enterprise:email')}</h2>
          <ul className="enterprise-extended__email-addresses">
            {jsx}
          </ul>
        </div>
      );
    }

    return jsx;
  }

  /**
   * Build JSX for purposes information
   */
  build_purposes() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      purposes = enterprise.purposes,
      jsx = [];

    // Get all the purposes
    purposes.map(function(purpose, index) {
      jsx.push(
        <li key={index} className="enterprise-extended__purpose">
          {purpose}
        </li>
      );
    });

    // If we got at least one, wrap the <li> in a <ul></ul>
    if (jsx.length > 0) {
      jsx = (
        <div className="enterprise-extended__purposes">
          <h2>{t('enterprise:purpose')}</h2>
          <ul className="enterprise-extended__purpose-list">
            {jsx}
          </ul>
        </div>
      );
    }

    return jsx;
  }

  /**
   * Build JSX for year started
   */
  build_year() {
    const { t } = this.props;

    var year_started = this.props.enterprise.year_started,
      jsx = null;

    if (year_started) {
      jsx = (
        <div className="enterprise-extended__year-started">
          <h2>{t('enterprise:yearStarted')}</h2>
          <p>
            {year_started}
          </p>
        </div>
      );
    }

    return jsx;
  }

  render() {
    var emails = this.build_emails(),
      phones = this.build_phones(),
      purposes = this.build_purposes(),
      addresses = this.build_addresses(),
      faxes = this.build_faxes(),
      offering = this.build_offering(),
      year_started = this.build_year(),
      enterprise = this.props.enterprise;

    return (
      <div className="enterprise-component">
        <Back />

        <EnterpriseSummary enterprise={enterprise} linkto='external'>
          <div className="enterprise-extended">
            {purposes}

            {offering}

            {addresses}

            {phones}

            {emails}

            {faxes}

            {year_started}

            <SocialMedia enterprise={enterprise} />

            <EnterpriseMap enterprise={enterprise} />
          </div>
        </EnterpriseSummary>
      </div>
    );
  }
}

EnterpriseComponent.displayName = 'EnterpriseComponent';

export default translate('enterprise')(EnterpriseComponent);
