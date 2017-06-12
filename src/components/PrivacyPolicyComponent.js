'use strict';

import React from 'react';

import { translate } from 'react-i18next';

import Back from './BackComponent';

class PrivacyPolicyComponent extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="privacypolicy-component page">
        <Back />

        <h1>{t('privacyPolicy:title')}</h1>

        <p>
          {t('privacyPolicy:policy')}
        </p>
      </div>
    );
  }
}

PrivacyPolicyComponent.displayName = 'PrivacyPolicyComponent';

// Uncomment properties you need
// PrivacyPolicyComponent.propTypes = {};
// PrivacyPolicyComponent.defaultProps = {};

export { PrivacyPolicyComponent };
export default translate('privacyPolicy')(PrivacyPolicyComponent);
