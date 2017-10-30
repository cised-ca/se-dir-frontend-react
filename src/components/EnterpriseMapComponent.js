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
      let latLng = [enterprise.locations.coordinates[0][1], enterprise.locations.coordinates[0][0]];
      return (
        <div className="enterprisemap-component">
          <Map center={latLng} zoom={15}>
            {tileLayer}
            {popupMarkers}
          </Map>
        </div>
      );
    }

    return (
      <div className="enterprisemap-component">
        <Map bounds={this.generateAllCoords(enterprise)}>
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
      let latLng = [coordinates[1], coordinates[0]];
      let coordsStr = latLng[0] + ',' + latLng[1];
      jsx.push(
        <Marker key={coordsStr} position={latLng}>
          <Popup>
            <span>{enterprise.name}</span>
          </Popup>
        </Marker>
      );
    });
    return jsx;
  }

  generateAllCoords(enterprise) {
    let allCoords = [];
    enterprise.locations.coordinates.map(coordinates => {
      let latLng = [coordinates[1], coordinates[0]];
      allCoords.push(latLng);
    });
    return allCoords;
  }
}

EnterpriseMapComponent.displayName = 'EnterpriseMapComponent';

// Uncomment properties you need
// EnterpriseMapComponent.propTypes = {};
// EnterpriseMapComponent.defaultProps = {};

export default EnterpriseMapComponent;
