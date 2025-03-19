/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, context}) {
  return context.customerAccount.login();
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */


// import {
//   json,
//   redirect
// } from '@shopify/remix-oxygen';
// import {
//   Form,
//   useActionData,
//   useLoaderData
// } from '@remix-run/react';
// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { getInputStyleClasses } from '~/lib/utils';
// import { Link } from '~/components';
// import i18next from '~/i18next.server';

// export const handle = {
//   isPublic: true,
// };

// export async function loader({ context, params }) {
//   const customerAccessToken = await context.session.get('customerAccessToken');

//   if (customerAccessToken) {
//     return redirect(params.locale ? `${params.locale}/account` : '/account');
//   }

//   return json({ shopName: 'Hydrogen' });
// }

// const badRequest = (data) => json(data, { status: 400 });

// export const action = async ({ request, context, params }) => {
//   const formData = await request.formData();

//   const email = formData.get('email');
//   const password = formData.get('password');
//   const { session, storefront, cart } = context;
//   const locale = storefront.i18n.language.toLowerCase();
//   const t = await i18next.getFixedT(locale);

//   if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
//     return badRequest({ formError: t('formError.invalid') });
//   }

//   try {
//     const customerAccessToken = await doLogin(context, { email, password });
//     session.set('customerAccessToken', customerAccessToken);

//     const result = await cart.updateBuyerIdentity({ customerAccessToken });
//     const headers = cart.setCartId(result.cart.id);

//     headers.append('Set-Cookie', await session.commit());

//     return redirect(params.locale ? `/${params.locale}/account` : '/account', { headers });
//   } catch (error) {
//     if (storefront.isApiError(error)) {
//       return badRequest({ formError: t('formError.wrong') });
//     }

//     return badRequest({ formError: t('formError.recognize') });
//   }
// };

// export default function Login() {
//   const { shopName } = useLoaderData();
//   const actionData = useActionData();
//   const [nativeEmailError, setNativeEmailError] = useState(null);
//   const [nativePasswordError, setNativePasswordError] = useState(null);
//   const { t } = useTranslation();

//   return (
//     <div className="flex justify-center my-24 px-4">
//       <div className="max-w-md w-full">
//         <h1 className="text-4xl">{t('account.login')}</h1>
//         <Form method="post" noValidate className="pt-6 pb-8 mt-4 mb-4 space-y-3">
//           {actionData?.formError && (
//             <div className="flex items-center justify-center mb-6 bg-zinc-500">
//               <p className="m-4 text-s text-contrast">{actionData.formError}</p>
//             </div>
//           )}
//           <div>
//             <input
//               className={`mb-1 ${getInputStyleClasses(nativeEmailError)}`}
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               placeholder={t('fields.email')}
//               autoFocus
//               onBlur={(event) => {
//                 setNativeEmailError(
//                   event.currentTarget.value.length && !event.currentTarget.validity.valid
//                     ? 'Invalid email address'
//                     : null
//                 );
//               }}
//             />
//             {nativeEmailError && <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>}
//           </div>

//           <div>
//             <input
//               className={`mb-1 ${getInputStyleClasses(nativePasswordError)}`}
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               placeholder={t('fields.password')}
//               minLength={8}
//               required
//               onBlur={(event) => {
//                 setNativePasswordError(
//                   event.currentTarget.validity.valid || !event.currentTarget.value.length
//                     ? null
//                     : 'Passwords must be at least 8 characters'
//                 );
//               }}
//             />
//             {nativePasswordError && <p className="text-red-500 text-xs">{nativePasswordError} &nbsp;</p>}
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
//               type="submit"
//               disabled={!!(nativePasswordError || nativeEmailError)}
//             >
//               {t('account.login')}
//             </button>
//           </div>
//           <div className="flex justify-between items-center mt-8 border-t border-gray-300">
//             <p className="align-baseline text-sm mt-6">
//               <Link className="inline underline" to="/account/register">
//                 {t('account.create')}
//               </Link>
//             </p>
//             <Link className="mt-6 inline-block align-baseline text-sm text-primary/50" to="/account/recover">
//               {t('account.forgot')}
//             </Link>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }

// const LOGIN_MUTATION = `#graphql
//   mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
//     customerAccessTokenCreate(input: $input) {
//       customerUserErrors {
//         code
//         field
//         message
//       }
//       customerAccessToken {
//         accessToken
//         expiresAt
//       }
//     }
//   }
// `;

// export async function doLogin({ storefront }, { email, password }) {
//   const data = await storefront.mutate(LOGIN_MUTATION, {
//     variables: { input: { email, password } },
//   });

//   if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
//     return data.customerAccessTokenCreate.customerAccessToken.accessToken;
//   }

//   throw new Error(data?.customerAccessTokenCreate?.customerUserErrors.join(', '));
// }
