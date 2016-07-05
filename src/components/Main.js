require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
    }
    handleSearch(searchText) {
        this.setState({
            searchText: searchText
        });
    }
    render() {
        return (
        	<div>
	            <SearchForm onSearch={this.handleSearch.bind(this)} />
	            <SearchResults searchText={this.state.searchText} />
	        </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
