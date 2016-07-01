'use strict';

import React from 'react';

require('styles//SearchForm.scss');

class SearchFormComponent extends React.Component {
  render() {
    return (
      <div className="searchform-component">
        <form>
          <input name="q" />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

SearchFormComponent.displayName = 'SearchFormComponent';

// Uncomment properties you need
// SearchFormComponent.propTypes = {};
// SearchFormComponent.defaultProps = {};

export default SearchFormComponent;
