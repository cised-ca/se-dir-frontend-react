'use strict';

import React from 'react';

require('styles//SearchForm.scss');

class SearchFormComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSearch(
      this.refs.searchTextInput.value
    );
  }
  render() {
    return (
      <form className="search-form js-search-form searchform-component" onSubmit={this.handleSubmit.bind(this)}>
        <div className="search__field-button">
          <input className="search-field" name="q" placeholder="Find Social Enterprises" type="search" ref="searchTextInput" />
          <input className="search-button" type="submit" value="Search" />
        </div>
      </form>
    );
  }
}

SearchFormComponent.displayName = 'SearchFormComponent';

// Uncomment properties you need
// SearchFormComponent.propTypes = {};
// SearchFormComponent.defaultProps = {};

export default SearchFormComponent;
