'use strict';

import React from 'react';

import { browserHistory } from 'react-router';

class PrivacyPolicyComponent extends React.Component {
  render() {
    return (
      <div className="privacypolicy-component page">
        <a className="back" onClick={browserHistory.goBack}>Back</a>

        <h1>Privacy Policy</h1>

        <p>
          Any information obtained during login process through 3rd party
          providers (such as Facebook, Instagram) is not stored, and is not
          shared with any other parties.
        </p>
      </div>
    );
  }
}

PrivacyPolicyComponent.displayName = 'PrivacyPolicyComponent';

// Uncomment properties you need
// PrivacyPolicyComponent.propTypes = {};
// PrivacyPolicyComponent.defaultProps = {};

export default PrivacyPolicyComponent;
