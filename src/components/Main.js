require('normalize.css/normalize.css');
require('styles/App.css');

var lunr = require('lunr');

import React from 'react';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

var directory = (function() {
  return {
    enterprises: [
      {
        '_id' : '1',
        'title' : 'Cycle Salvation',
        'description' :
          'Cycle Salvation is a social enterprise operating under the umbrella ' +
          'of Causeway Work Centre. Our business strivesto achieve a triple ' +
          'bottom line (profit, people, planet) by providing training and ' +
          'employment in the field of bike mechanics to people who are ' +
          'economically disadvantaged, while at the same time diverting bikes ' +
          'destined for scrap and landfill sites.',
        'offering' : 'Bob Smith',
        'phone' : 27777777777,
        'email' : 'test1@test.com',
        'primary-purpose' : 'kjljlk;kj',
        'secondary-purpose' : 'whateve',
        'website' : 'http://google.com'
      },
      {
        '_id' : '2',
        'title' : 'Enactus uOttawa',
        'description' :
          'Student-run non-profit organization that uses the power of ' +
          'entrepreneurial action to empower people to improve their ' +
          'livelihoods. Founded in 2010, the University of Ottawa team is ' +
          'made up of students from 7 faculties that believe that building a ' +
          'better world starts at home.',
        'offering' : 'Bob Smith',
        'phone' : 2777777779,
        'email' : 's@s.com',
        'primary-purpose' : 'a primary-purpose',
        'secondary-purpose' : 'whatevekk',
        'website' : 'http://giggle.com'
      },
      {
        '_id' : '3',
        'title' : 'EnviroCentre',
        'description' :
          'EnviroCentre is an Ottawa-based non-profit organization that helps ' +
          'residents, businesses and organizations conserve energy and reduce ' +
          'their impact on the environment, while saving money.',
        'offering' : 'Bob Smith',
        'phone' : 27777777777,
        'email' : 'test1@test.com',
        'primary-purpose' : 'kjljlk;kj',
        'secondary-purpose' : 'whateve',
        'website' : 'http://google.com'
      },
      {
        '_id' : '4',
        'title' : 'Good Nature Groundskeeping',
        'description' :
          'Good Nature Groundskeeping is a social business, providing ' +
          'professional landscape maintenance services while also providing ' +
          'employment to people who are economically disadvantaged.',
        'offering' : 'Bob Smith',
        'phone' : 27777777777,
        'email' : 'test1@test.com',
        'primary-purpose' : 'kjljlk;kj',
        'secondary-purpose' : 'whateve',
        'website' : 'http://google.com'
      },
      {
        '_id' : '5',
        'title' : 'Gourmet Express',
        'description' :
          'In response to clients with multiple barriers to employment and ' +
          'without access to the labor market, the Vanier Community Service ' +
          'Centre has launched the Gourmet-Xpress social enterprise, a free ' +
          'learning program in food preparation and customer service.',
        'offering' : 'Bob Smith',
        'phone' : 27777777777,
        'email' : 'test1@test.com',
        'primary-purpose' : 'kjljlk;kj',
        'secondary-purpose' : 'whateve',
        'website' : 'http://google.com'
      },
      {
        '_id' : '6',
        'title' : 'Impact Hub',
        'description' :
          'Impact Hub Ottawa is the national capital region’s collaboration, ' +
          'innovation and incubation ecosystem for people and organizations ' +
          'working to better the world.',
        'offering' : 'Bob Smith',
        'phone' : 27777777777,
        'email' : 'test1@test.com',
        'primary-purpose' : 'kjljlk;kj',
        'secondary-purpose' : 'whateve',
        'website' : 'http://google.com'
      }
    ]
  };
}());

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    };

    // Init lunr
    var lunr_index = lunr(function() {
      this.field('title', {boost: 10});
      this.field('description');
      this.ref('id');
    });

    // Index enterprises
    directory.enterprises.forEach(function(enterprise, index) {
      lunr_index.add({
        title: enterprise.title,
        description: enterprise.description,
        id: index
      });
    });

    // Save the index
    this.index = lunr_index;
  }
  handleSearch(searchText) {
    /**
     * FIXME: This shouldn't be here, just using
     *        this space as a test
     */
    var intro = document.querySelector('.js-intro'),
      search_results = document.querySelector('.js-search-results');

    intro.classList.add('slide-up');

    window.setTimeout(function() {
      search_results.classList.add('fade-in');
    }, 1000);
    /**
     * End FIXME
     */

    this.setState({
      searchText: searchText
    });
  }
  render() {
    return (
      <div>
        <SearchForm onSearch={this.handleSearch.bind(this)} />
        <SearchResults searchText={this.state.searchText} directory={directory} lunr_index={this.index} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
