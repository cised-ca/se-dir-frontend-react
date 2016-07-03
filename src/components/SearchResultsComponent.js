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
      <div className='searchresults-component'>
        {
        	list.map(function(enterprise, index) {
        		return (
        			<div key={index} class='searchresults-component__listing four columns'>
      					<div key={index + 'title'} className="searchresults-component__listing__enterprise">{enterprise.title}</div>
      					<div key={index + 'description'} className="searchresults-component__listing__description">{enterprise.description}</div>
      					<div key={index + 'website'} className="searchresults-component__listing__website"><a key={index + 'link'} href={enterprise.website}>Website</a></div>
        			</div>
        		);
        	})
        }
      </div>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
