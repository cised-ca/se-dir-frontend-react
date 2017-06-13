import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n
  .use(XHR)
  .init({
    ns: ['common'],
    defaultNS: 'common',

    fallbackLng: 'en',

    debug: true,

    interpolation: {
      escapeValue: false
    },

    react: {
      wait: true
    }
  });

export default i18n;
