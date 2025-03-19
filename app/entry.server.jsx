import {RemixServer} from '@remix-run/react';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 * @param {AppLoadContext} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  context,
) {
  let {nonce, header, NonceProvider} = createContentSecurityPolicy({

    scriptSrc: ["'self'", "maps.googleapis.com"],
    imgSrc: ["'self'", "maps.googleapis.com"],

    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google.com',
      'https://maps.googleapis.com',  // Required for Google Maps API
      'https://maps.gstatic.com', // Google Maps styles
      'https://goo.gle/js-api-loading',
    ],
    connectSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://*.googleapis.com',
      'https://www.google.com',
      'https://monorail-edge.shopifysvc.com', 
      'https://atp-data-services.myshopify.com',
    ],
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://maps.gstatic.com',  // Google Maps styles
      'http://localhost:*',
      "'unsafe-inline'", // Required for inline styles
    ],
    
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://*.googleusercontent.com',
      'data:',
      'blob:',
    ],
    frameSrc: [
      "'self'",
      'https://www.google.com',
      'https://maps.googleapis.com',
      'https://maps.gstatic.com',
      'https://*.google.com', // Allow embedded Google Maps
    ],

    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  // const customCsp = [
  //   header,
  //   "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline'",
  //   "img-src 'self' data: https://maps.gstatic.com https://*.googleapis.com https://cdn.shopify.com",
  //   "connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://monorail-edge.shopifysvc.com https://*.tryhydrogen.dev ws://localhost:* ws://127.0.0.1:*",
  //   "frame-src 'self' https://maps.googleapis.com",
  //   "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.gstatic.com",
  //   "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  // ].join('; '); // ✅ Fix: Convert array to single line
  
  // responseHeaders.set('Content-Security-Policy', customCsp);

    
  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }
//  header = header.replace( 'https://cdn.shopify.com', 'https://cdn.shopify.com https://maps.googleapis.com https://maps.googleapis.com https://www.hlgross.com https://hydralyte.com  https://monorail-edge.shopifysvc.com https://atp-data-services.myshopify.com https://atp-data-services.myshopify.com https://maps.gstatic.com https://maps.googleapis.com https://www.google.com https://goo.gle/js-api-loading  https://atp-data-services.myshopify.com  https://maps.googleapis.com/ https://www.google.com https://maps.googleapis.com  https://monorail-edge.shopifysvc.com https://atp-data-services.myshopify.com https://atp-data-services.myshopify.com ');
  //header = header.replace( 'https://cdn.shopify.com','https://cdn.shopify.com')

  header = header.replace(
    'https://cdn.shopify.com',
    "https://cdn.shopify.com https://maps.googleapis.com https://cdn.shopify.com https://maps.gstatic.com https://www.google.com https://goo.gle/js-api-loading https://monorail-edge.shopifysvc.com https://atp-data-services.myshopify.com http://localhost:3003 ws://localhost:3003 ws://127.0.0.1:3003"
  );
  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

//   let newHeader = header
//   .replaceAll('https://cdn.shopify.com', 'https://cdn.shopify.com')
//   .replaceAll('http://localhost:*', 'http://localhost:*')
//   .replaceAll('https://maps.gstatic.com/mapfiles/openhand_8_8.cur', 'https://maps.gstatic.com/mapfiles/openhand_8_8.cur')
//   .replaceAll('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true', 'https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true')
//   .replaceAll('https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetViewportInfo', 'https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetViewportInfo');

// responseHeaders.set('Content-Security-Policy', newHeader); // ✅ Apply the modified header

return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
/** @typedef {import('@shopify/remix-oxygen').AppLoadContext} AppLoadContext */


