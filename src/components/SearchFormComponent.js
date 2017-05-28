'use strict';

import React from 'react';

import { Link } from 'react-router';
import LocationDisambiguation from './LocationDisambiguationComponent.js';

const POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z]/;

class SearchFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationDisambiguation: null,
      searchText: null,
      searchLocationText: null
    };
  }

  componentDidMount() {
    this.reset();
  }

  componentWillReceiveProps() {
    this.reset();
  }

  reset() {
    this.setState({
      locationDisambiguation: null,
      searchText: null,
      searchLocationText: null
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      searchText: this.refs.searchTextInput.value,
      searchLocationText: this.refs.searchLocationInput.value
    }, this.handleSearch);
  }

  handleSearch() {
    if (!this.state.searchLocationText) {
      this.props.onSearch(this.state.searchText);
      return;
    }

    this.performLocationSearch();
  }

  handleLocationSelection(location) {
    this.setState({
      searchLocationText: location.placeName
    });
    this.props.onSearch(
      this.state.searchText,
      location.placeName,
      [location.longitude, location.latitude]
    );
  }

  handleNoLocationFound() {
    this.props.onSearch(
      this.state.searchText,
      this.state.searchLocationText
    );
  }

  isPostalCode(text) {
    return POSTAL_CODE_REGEX.exec(text);
  }

  performLocationSearch() {
    let locationText = this.state.searchLocationText;
    let url  = this.context.config.geo_api_root +
            '/api/placeNameSearch?placeName=' + locationText;
    if (this.isPostalCode(locationText)) {
      // strip to first 3 characters because Geonames dataset only contains
      // first half of canadian postal codes
      let postalCode = locationText.slice(0, 3).toUpperCase();
      url  = this.context.config.geo_api_root +
              '/api/postalCodeLookup?postalCode=' + postalCode;
    }

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.statusCode);
    })
    .then(results => {
      if (!Array.isArray(results)) {
        results = [results];
      }
      this.handleLocationQueryResponse(results);
    })
    .catch(err => {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }

  handleLocationQueryResponse(results) {
    let locationTextString = this.state.searchLocationText;
    if (results.length == 0) {
      this.handleNoLocationFound();
      return;
    }

    if (results.length == 1) {
      this.handleLocationSelection(results[0]);
      return;
    }

    let exactPlaceMatch = results.filter(location => {
      return location.placeName.toLowerCase() === locationTextString.toLowerCase();
    });
    if (exactPlaceMatch.length > 0) {
      this.handleLocationSelection(exactPlaceMatch[0]);
      return;
    }

    // Otherwise, we need to enter location disambiguation phase
    this.setState({locationDisambiguation: results});
  }

  render() {
    if (!this.context.config.geo_api_root) {
      return (<p>Loading...</p>);
    }

    if (this.state.locationDisambiguation && this.state.locationDisambiguation.length > 1) {
      return (
        <LocationDisambiguation locations={this.state.locationDisambiguation}
              handleLocationSelection={this.handleLocationSelection.bind(this)}/>
      );
    }

    var searchText = '';

    if (this.props.searchText) {
      searchText = this.props.searchText;
    }
    let searchLocation = this.props.searchLocation || '';

    return (
      <form className="search-form js-search-form searchform-component" onSubmit={this.handleSubmit.bind(this)}>
        <div className="search-bar">
          <input className="search-field" name="q" placeholder="Start Purchasing" type="search" ref="searchTextInput" defaultValue={searchText} />
          <span className="search-near-label">Near:</span>
          <input className="search-location-field" name="at" placeholder="Town / Postal code" type="search" ref="searchLocationInput" defaultValue={searchLocation} />
        </div>

        <input className="search-button button button--search" type="submit" value="Search" />
        <Link className='button' to='/directory'>Browse</Link>
      </form>
    );
  }
}

SearchFormComponent.displayName = 'SearchFormComponent';

SearchFormComponent.contextTypes = {
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

// Uncomment properties you need
// SearchFormComponent.propTypes = {};
// SearchFormComponent.defaultProps = {};

export default SearchFormComponent;
