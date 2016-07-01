require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import SearchForm from './SearchFormComponent.js';

class AppComponent extends React.Component {
    render() {
        return (
            <SearchForm />
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
