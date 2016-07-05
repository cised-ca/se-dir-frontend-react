'use strict';

var directory = {
	listOfEnterprises: [
		{
			'_id' : '1',
			'title' : 'enterprise 1',
			'description' : 'a place where lot\'s of people go to work and get things done description',
			'offering' : 'Bob Smith',
			'phone' : 27777777777,
			'email' : 'test1@test.com',
			'primary-purpose' : 'kjljlk;kj',
			'secondary-purpose' : 'whateve',
			'website' : 'http://google.com'
		},
		{
			'_id' : '2',
			'title' : 'enterprise 2',
			'description' : 'description2',
			'offering' : 'Bob Smith',
			'phone' : 2777777779,
			'email' : 's@s.com',
			'primary-purpose' : 'a primary-purpose',
			'secondary-purpose' : 'whatevekk',
			'website' : 'http://giggle.com'
		},
		{
			'_id' : '1',
			'title' : 'enterprise 1',
			'description' : 'a place where lot\'s of people go to work and get things done description',
			'offering' : 'Bob Smith',
			'phone' : 27777777777,
			'email' : 'test1@test.com',
			'primary-purpose' : 'kjljlk;kj',
			'secondary-purpose' : 'whateve',
			'website' : 'http://google.com'
		},
		{
			'_id' : '1',
			'title' : 'enterprise 1',
			'description' : 'a place where lot\'s of people go to work and get things done description',
			'offering' : 'Bob Smith',
			'phone' : 27777777777,
			'email' : 'test1@test.com',
			'primary-purpose' : 'kjljlk;kj',
			'secondary-purpose' : 'whateve',
			'website' : 'http://google.com'
		},
		{
			'_id' : '1',
			'title' : 'enterprise 1',
			'description' : 'a place where lot\'s of people go to work and get things done description',
			'offering' : 'Bob Smith',
			'phone' : 27777777777,
			'email' : 'test1@test.com',
			'primary-purpose' : 'kjljlk;kj',
			'secondary-purpose' : 'whateve',
			'website' : 'http://google.com'
		},
		{
			'_id' : '1',
			'title' : 'enterprise 1',
			'description' : 'a place where lot\'s of people go to work and get things done description',
			'offering' : 'Bob Smith',
			'phone' : 27777777777,
			'email' : 'test1@test.com',
			'primary-purpose' : 'kjljlk;kj',
			'secondary-purpose' : 'whateve',
			'website' : 'http://google.com'
		}
	]
};

import React from 'react';

require('styles//SearchResults.scss');

class SearchResultsComponent extends React.Component {
  render() {
    var list = directory.listOfEnterprises;

    return (
      <ol className='search-results js-search-results'>
        {
        	list.map(function(enterprise, index) {
        		return (
                    <li key={index} className='search-result organization four columns'>
                        <h2 key={index + 'title'} className="organization__title">{enterprise.title}</h2>
                        <div key={index + 'description'} className="organization__description">{enterprise.description}</div>
                        <div key={index + 'website'} className="organization__website"><a key={index + 'link'} href={enterprise.website}>Website</a></div>
                    </li>
        		);
        	})
        }
      </ol>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
