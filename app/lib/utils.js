// import {countries} from '~/data/countries';

// export function getLocaleFromRequest(request) {
//   const url = new URL(request.url);

//   switch (url.host) {
//     case 'localhost:3000':
//       if (/^\/fr($|\/)/.test(url.pathname)) {
//         return countries['fr-ca'];
//       } else {
//         return countries['en-ca'];
//       }
//       break;
//     case 'hydrogen.au':
//       return countries['en-au'];
//       break;
//     default:
//       return countries['default'];
//   }
// }


export function getLocaleFromRequest(request) {
    // Get the user request URL
    const url = new URL(request.url);
  
    // Match the URL host
    switch (url.host) {
    //   case 'localhost:3000':
    case 'ca.hydrogen.shop':
        // This regex matches `/fr/` paths in the request
        if (/^\/fr($|\/)/.test(url.pathname)) {
          return {
            language: 'FR',
            country: 'FR',
          };
        } 
        
        break;
      default:
        return {
          language: 'EN',
          country: 'US',
        };
    }
  }


// export function getLocaleFromRequest(request) {
//     // Get the user request URL
//     const url = new URL(request.url);
  
//     // Match the URL host
//     switch (url.host) {
//       case 'ca.hydrogen.shop':
//         // This regex matches `/fr/` paths in the request
//         if (/^\/fr($|\/)/.test(url.pathname)) {
//           return {
//             language: 'FR',
//             country: 'CA',
//           };
//         } else {
//           return {
//             language: 'EN',
//             country: 'CA',
//           };
//         }
//         break;
//       default:
//         return {
//           language: 'EN',
//           country: 'US',
//         };
//     }
//   }

// import { getLocaleFromRequest } from '~/lib/utils';

// export async function loader({ request }) {
//   const { language, country, pathPrefix } = getLocaleFromRequest(request);
  
//   return { language, country, pathPrefix };
// }

import { useMatches } from "@remix-run/react";

export function usePrefixPathWithLocale(path) {
  const [root] = useMatches();
  const selectedLocale = root.data.selectedLocale;

  return selectedLocale
    ? `${selectedLocale.pathPrefix}${path.startsWith("/") ? path : "/" + path}`
    : path;
}