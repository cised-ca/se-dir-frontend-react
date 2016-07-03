require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

class AppComponent extends React.Component {
    render() {
        return (
        	<div>
	            <SearchForm />
	            <SearchResults />
	        </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
