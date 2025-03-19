/**
 * @param {Request} request
 */
export function getLocaleFromRequest(request) {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split('/')[1]?.toUpperCase() ?? '';

  let pathPrefix = '';
  let [language, country] = ['EN', 'US'];

  if (/^[A-Z]{2}-[A-Z]{2}$/i.test(firstPathPart)) {
    pathPrefix = '/' + firstPathPart;
    [language, country] = firstPathPart.split('-');
  }

  return {language, country, pathPrefix};
}

/**
 * @typedef {Object} I18nLocale
 * @property {string} pathPrefix
 */

// /** @typedef {import('@shopify/hydrogen').I18nBase} I18nBase */

// /**
//  * @param {Request} request
//  */
// export function getLocaleFromRequest(request) {
//   const url = new URL(request.url);
//   const firstPathPart = url.pathname.split('/')[1]?.toUpperCase() ?? '';

//   let pathPrefix = '';
//   let [language, country] = ['EN', 'US']; // Default to English (US)

//   // Supported locales (English and Chinese - Simplified & Traditional)
//   const supportedLocales = {
//     "EN-US": ["EN", "US"],  // English - United States
//     "ZH-CN": ["ZH", "CN"],  // Chinese - Simplified (Mainland China)
//     "ZH-TW": ["ZH", "TW"],  // Chinese - Traditional (Taiwan)
//   };

//   if (firstPathPart in supportedLocales) {
//     pathPrefix = '/' + firstPathPart;
//     [language, country] = supportedLocales[firstPathPart];
//   }

//   return { language, country, pathPrefix };
// }


// /**
//  * @typedef {Object} I18nLocale
//  * @property {string} pathPrefix
//  */

// /** @typedef {import('@shopify/hydrogen').I18nBase} I18nBase */