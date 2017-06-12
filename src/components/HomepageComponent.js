'use strict';

import React from 'react';
import { Link, withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

import { translate } from 'react-i18next';

class HomepageComponent extends React.Component {
  /**
   * Before the Component is rendered, check if we have a query
   * in the URL (direct link to a search results) and set the
   * state appropriately.
   */
  componentWillMount() {
    var query = this.props.location.query;

    let state = {
      'searchText': null,
      'searchLocationText': null,
      'searchCoords': null
    };

    if (query.q) {
      state.searchText = query.q;
    }
    if (query.at) {
      state.searchCoords = query.at;
    }
    if (query.near) {
      state.searchLocationText = query.near;
    }

    this.setState(state);
  }

  /**
   * Triggered when the search form is submitted
   *
   * @param {String} searchText The text in the search field input box
   * @param {String} searchLocationText The text in the search location input box
   */
  handleSearch(searchText, searchLocationText, searchCoords) {
    let state = {
      'searchText': null,
      'searchLocationText': null,
      'searchCoords': null
    };

    if (searchText) {
      state.searchText = searchText;
    }
    if (searchLocationText) {
      state.searchLocationText = searchLocationText;
    }
    if (searchCoords) {
      state.searchCoords = searchCoords[0] + ',' + searchCoords[1];
    }

    if (!searchText && !searchLocationText && !searchCoords) {
      // There is no form data entered but they clicked search anyway.
      // Let's search for empty string.
      state.searchText = ' ';
    }

    this.setState(state, () => {
      this.finishSearch();
    });
  }

  finishSearch() {
    let query = {};
    if (this.state.searchText) {
      query.q = this.state.searchText;
    }
    if (this.state.searchCoords) {
      query.at = this.state.searchCoords;
    }
    if (this.state.searchLocationText) {
      query.near = this.state.searchLocationText;
    }

    this.props.router.push({
      'pathname': '/',
      'query': query
    });
  }

  /**
   * When this component is about to receive new props, like when the URL changes,
   * check if we still have a search query in the URL. If not, show the intro.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search && !nextProps.location.search) {
      this.setState({
        'searchText': null,
        'searchLocationText': null,
        'searchCoords': null
      });
    }
  }

  isLocationNotFound() {
    // If we have a location but no coords, it means the location was not found.
    return this.state.searchLocationText && !this.state.searchCoords;
  }

  shouldShowSearchResults() {
    if (!this.props.config.api_root) {
      // Don't try to get search results if we haven't parsed the config file yet
      return false;
    }

    if (this.isLocationNotFound()) {
      return false;
    }

    if (this.state.searchText || this.state.searchLocationText) {
      return true;
    }

    return false;
  }

  render() {
    var intro = null,
      privacy_policy = null,
      rhok = null,
      searchResults = null,
      powered_by = null,
      apply = null;

    const { t } = this.props;

    if (this.state.searchText === null && this.state.searchLocationText === null) {
      intro = (
        <div className='intro js-intro'>
          <h1 className='title'>{t('homepage:title')}</h1>

          <p className='tagline'>
            {t('homepage:tagline')}
          </p>
        </div>
      );

      apply = (
        <p className="apply">
          {t('homepage:apply')}&nbsp;
          <Link to="/apply">{t('homepage:applyLinkText')}</Link>.
        </p>
      );

      rhok = (
        <p className="rhok">
          {t('homepage:created')}&nbsp;

          <a href='https://rhok.ca/projects/ottawa-social-enterprise-marketplace'>
            {t('homepage:rhok')}
          </a>
        </p>
      );

      powered_by = (
        <p className="powered_by">
          {t('homepage:poweredBy')}&nbsp;
          <a href="http://csedottawa.ca/">CSED</a> |&nbsp;
          <a href="http://csedottawa.ca/">{t('homepage:connectLinkText')}</a> {t('homepage:connect')}
        </p>
      );

      privacy_policy = (
        <p className='privacy-policy'>
          <Link to='/privacy'>{t('homepage:privacyPolicy')}</Link>
          | {t('homepage:locationData')}
          <Link to='http://www.geonames.org/'>geonames.org</Link>
        </p>
      );
    } else if (this.shouldShowSearchResults()) {
      searchResults = (
        <div className='page'>
          <SearchResults searchText={this.state.searchText}
                         searchLocationText={this.state.searchLocationText}
                         searchCoords={this.state.searchCoords}/>
        </div>
      );
    } else if (this.isLocationNotFound()) {
      searchResults = (
        <div className="page">
          <p>{t('homepage:locationNotFound')} "{this.state.searchLocationText}"</p>
          <p>{t('homepage:trySearchAgain')}</p>
        </div>
      );
    }


    return (
      <div className='homepage-component'>
        <ReactCSSTransitionGroup transitionName={{leave: 'slide-up'}}
          transitionEnter={false} transitionLeaveTimeout={2000}>
          {intro}
        </ReactCSSTransitionGroup>

        <SearchForm onSearch={this.handleSearch.bind(this)} searchText={this.state.searchText}
          searchLocation={this.state.searchLocationText} />

        {apply}

        {rhok}

        {powered_by}

        {privacy_policy}

        {searchResults}
      </div>
    );
  }
}

HomepageComponent.displayName = 'HomepageComponent';

export { HomepageComponent };
export default translate('homepage')(withRouter(HomepageComponent));
