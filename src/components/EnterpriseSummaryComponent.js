'use strict';

import React from 'react';
import { Link } from 'react-router';

import { translate } from 'react-i18next';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterpriseSummaryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logo_error: false
    };
  }

  onError() {
    this.setState({
      logo_error: true
    });
  }

  render() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      enterprise_description = enterprise.short_description,
      enterprise_logo = null,
      enterprise_link = <Link to={'/enterprise/' + enterprise.id + '/' + slug(enterprise.name)}>{enterprise.name}</Link>,
      more_info = (
          <div className="enterprise__website">
            <Link to={'/enterprise/' + enterprise.id}>{t('enterpriseSummary:moreInfo')}</Link>
          </div>
      );

    if (this.props.linkto === 'external') {
      enterprise_link = <a href={enterprise.website}>{enterprise.name}</a>;
      enterprise_description = enterprise.description;
      more_info = null;
    }

    if (!this.state.logo_error) {
      enterprise_logo = (
        <img onError={this.onError.bind(this)}
          src={this.context.config.api_root + '/enterprise/' + enterprise.id + '/logo'}
          alt={enterprise.name + ' logo'} title={enterprise.name + ' logo'} />
      );
    }

    return (
      <div className="enterprise-summary enterprisesummary-component">
        <div className="enterprise__logo">
          {enterprise_logo}
        </div>
        <div className="enterprise__details">
          <h2 className="enterprise__title">
            {enterprise_link}
          </h2>
          <div className="enterprise__description">{enterprise_description}</div>
          {more_info}

          {this.props.children}
        </div>
      </div>
    );
  }
}

EnterpriseSummaryComponent.displayName = 'EnterpriseSummaryComponent';

EnterpriseSummaryComponent.contextTypes = {
  'config': React.PropTypes.object
};

export { EnterpriseSummaryComponent };
export default translate('enterpriseSummary')(EnterpriseSummaryComponent);
