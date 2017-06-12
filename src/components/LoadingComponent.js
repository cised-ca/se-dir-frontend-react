'use strict';

import React from 'react';

import { translate } from 'react-i18next';

class LoadingComponent extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="loading-component">
        <p>{t('loading:loading')}</p>
      </div>
    );
  }
}

LoadingComponent.displayName = 'LoadingComponent';

// Uncomment properties you need
// BannerComponent.propTypes = {};
// BannerComponent.defaultProps = {};

export { LoadingComponent };
export default translate('loading')(LoadingComponent);
