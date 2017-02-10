'use strict';

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class SearchResultsMapComponent extends React.Component {

  enterpriseHasCoords(enterprise) {
    if (enterprise.locations == null ||
        enterprise.locations.coordinates == null ||
        enterprise.locations.coordinates.length === 0) {
      return false;
    }
    return true;
  }

  render() {
    let enterprises = this.props.enterprises;
    let allCoords = this.generateCoords(enterprises);
    let popupMarkers = this.generatePopupMarkers(enterprises);
    let tileLayer = this.generateTileLayer();

    if (allCoords == null || allCoords.length == 0) {
      return null;
    }
    if (allCoords.length === 1) {
      return (
        <div className="searchresultsmap-component">
          <Map center={allCoords[0]} zoom={15}>
            {tileLayer}
            {popupMarkers}
          </Map>
        </div>
      );
    }

    return (
      <div className="searchresultsmap-component">
        <Map bounds={allCoords}>
          {tileLayer}
          {popupMarkers}
        </Map>
      </div>
    );
  }

  generateCoords(enterprises) {
    let allCoords = [];
    enterprises.map(enterprise => {
      if (!this.enterpriseHasCoords(enterprise)) {
        return;
      }
      enterprise.locations.coordinates.map(coordinates => {
        allCoords.push(coordinates);
      });
    });
    return allCoords;
  }

  generateTileLayer() {
    return (
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
    );
  }

  generatePopupMarkers(enterprises) {
    let jsx = [];
    enterprises.map(enterprise => {
      if (!this.enterpriseHasCoords(enterprise)) {
        return;
      }
      enterprise.locations.coordinates.map(coordinates => {
        jsx.push(
          <Marker position={coordinates}>
            <Popup>
              <span>{enterprise.name}</span>
            </Popup>
          </Marker>
        );
      });
    });
    return jsx;
  }
}

SearchResultsMapComponent.displayName = 'SearchResultsMapComponent';

// Uncomment properties you need
// SearchResultsMapComponent.propTypes = {};
// SearchResultsMapComponent.defaultProps = {};

export default SearchResultsMapComponent;
