// Virtual entry point for the app
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as remixBuild from 'virtual:remix/server-build';
import {createStorefrontClient, storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/remix-oxygen';
import {createAppLoadContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  /**
   * @param {Request} request
   * @param {Env} env
   * @param {ExecutionContext} executionContext
   * @return {Promise<Response>}
   */
  async fetch(request, env, executionContext) {
    try {
      const appLoadContext = await createAppLoadContext(
        request,
        env,
        executionContext,
      );

    //    /**
    //    * Create Hydrogen's Storefront client .
    //    */

    //  const { storefront} = createStorefrontClient({
      // cache,
      // waitUntil,
      // i18n: { language: 'ZH' , country: 'CN'},
      // publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      // privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      // storeDomain: `https://${env.PUBLIC_STORE_DOMAIN}`,
      // storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION,
      // storefrontId: env.PUBLIC_STOREFRONT_ID,
      // storefrontHeaders: getStorefrontHeaders(request),
    //  });


      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => appLoadContext,
      });

      const response = await handleRequest(request);

      if (appLoadContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await appLoadContext.session.commit(),
        );
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: appLoadContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
