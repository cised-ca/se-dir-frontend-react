'use strict';

import React from 'react';

import { translate } from 'react-i18next';

import Back from './BackComponent';

class LocationDisambiguationComponent extends React.Component {

  render() {
    const { t } = this.props;

    let locations = this.props.locations;
    let jsx = [];
    locations.map(function(location) {
      jsx.push(
        <li key={location.placeName} className='location-name'>
          <a href="#" onClick={() => {this.props.handleLocationSelection(location);}}>
            {location.placeName}, {location.adminCode1}
          </a>
        </li>
      );
    }.bind(this));

    return (
      <div className="locationdisambiguation-component page">
        <p>{t('locationDisambiguation:selectFromList')}</p>
        <ul key='location-results' className='location-results fade-in'>
          {jsx}
        </ul>

        <Back />
      </div>
    );
  }
}

LocationDisambiguationComponent.displayName = 'LocationDisambiguationComponent';

// Uncomment properties you need
// LocationDisambiguationComponent.propTypes = {};
// LocationDisambiguationComponent.defaultProps = {};

export { LocationDisambiguationComponent };
export default translate('locationDisambiguation')(LocationDisambiguationComponent);
