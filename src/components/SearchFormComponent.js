'use strict';

import React from 'react';

import { Link } from 'react-router';

class SearchFormComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSearch(
      this.refs.searchTextInput.value,
      this.refs.searchLocationInput.value
    );
  }

  render() {
    var searchText = '';

    if (this.props.searchText) {
      searchText = this.props.searchText;
    }
    let searchLocation = this.props.searchLocation || '';

    return (
      <form className="search-form js-search-form searchform-component" onSubmit={this.handleSubmit.bind(this)}>
        <div className="search-bar">
          <input className="search-field" name="q" placeholder="Find Social Enterprises" type="search" ref="searchTextInput" defaultValue={searchText} />
          <span className="search-near-label">Near:</span>
          <input className="search-location-field" name="at" placeholder="Postal code" type="search" ref="searchLocationInput" defaultValue={searchLocation} />
        </div>

        <input className="search-button button button--search" type="submit" value="Search" />
        <Link className='button' to='/directory'>Browse</Link>
      </form>
    );
  }
}

SearchFormComponent.displayName = 'SearchFormComponent';

// Uncomment properties you need
// SearchFormComponent.propTypes = {};
// SearchFormComponent.defaultProps = {};

export default SearchFormComponent;
