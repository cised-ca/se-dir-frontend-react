'use strict';

import React from 'react';

import { Link } from 'react-router';

class SearchFormComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSearch(
      this.refs.searchTextInput.value
    );
  }

  render() {
    var searchText = '';

    if (this.props.searchText) {
      searchText = this.props.searchText;
    }

    return (
      <form className="search-form js-search-form searchform-component" onSubmit={this.handleSubmit.bind(this)}>
        <input className="search-field" name="q" placeholder="Find Social Enterprises" type="search" ref="searchTextInput" defaultValue={searchText} />

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
