'use strict';

import React from 'react';

class LocationDisambiguationComponent extends React.Component {

  render() {
    let locations = this.props.locations;
    let jsx = [];
    locations.map(function(location) {
      jsx.push(
        <li key={location.placeName} className='location-name'>
          <a href="#" onClick={() => {this.props.handleLocationSelection(location);}}>
            {location.placeName}
          </a>
        </li>
      );
    }.bind(this));

    return (
      <div className="locationdisambiguation-component page">
        <p>Please select a location from the list:</p>
        <ul key='location-results' className='location-results fade-in'>
          {jsx}
        </ul>
      </div>
    );
  }
}

LocationDisambiguationComponent.displayName = 'LocationDisambiguationComponent';

// Uncomment properties you need
// LocationDisambiguationComponent.propTypes = {};
// LocationDisambiguationComponent.defaultProps = {};

export default LocationDisambiguationComponent;
