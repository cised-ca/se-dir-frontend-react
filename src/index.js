import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Render the main component into the dom
ReactDOM.render(
  <I18nextProvider i18n={ i18n }><App /></I18nextProvider>,
  document.getElementById('app')
);
