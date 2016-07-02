'use strict';

import React from 'react';

require('styles//SearchForm.scss');

class SearchFormComponent extends React.Component {
  render() {
    return (
      <form className="search-form js-search-form">
        <div className="search__field-button">
          <input className="search-field" name="q" placeholder="Find Social Enterprises" type="search" />
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
