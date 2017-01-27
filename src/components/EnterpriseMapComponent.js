'use strict';

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class EnterpriseMapComponent extends React.Component {

  render() {
    let enterprise = this.props.enterprise;
    if (enterprise.locations == null ||
        enterprise.locations.coordinates == null ||
        enterprise.locations.coordinates.length === 0) {
      return null;
    }

    let popupMarkers = this.generatePopupMarkers(enterprise);
    let tileLayer = this.generateTileLayer();

    if (enterprise.locations.coordinates.length === 1) {
      return (
        <div className="enterprisemap-component">
          <Map center={enterprise.locations.coordinates[0]} zoom={15}>
            {tileLayer}
            {popupMarkers}
          </Map>
        </div>
      );
    }

    return (
      <div className="enterprisemap-component">
        <Map bounds={enterprise.locations.coordinates}>
          {tileLayer}
          {popupMarkers}
        </Map>
      </div>
    );
  }

  generateTileLayer() {
    return (
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
    );
  }

  generatePopupMarkers(enterprise) {
    let jsx = [];
    enterprise.locations.coordinates.map(coordinates => {
      jsx.push(
        <Marker position={coordinates}>
          <Popup>
            <span>{enterprise.name}</span>
          </Popup>
        </Marker>
      );
    });
    return jsx;
  }
}

EnterpriseMapComponent.displayName = 'EnterpriseMapComponent';

// Uncomment properties you need
// EnterpriseMapComponent.propTypes = {};
// EnterpriseMapComponent.defaultProps = {};

export default EnterpriseMapComponent;
