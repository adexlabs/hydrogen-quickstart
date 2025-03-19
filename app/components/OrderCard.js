export const ORDER_CARD_FRAGMENT = `#graphql
  fragment OrderCard on Order {
    id
    name
    processedAt
    totalPriceV2 {
      amount
      currencyCode
    }
    lineItems(first: 3) {
      edges {
        node {
          title
          quantity
          variant {
            image {
              url
            }
          }
        }
      }
    }
  }
`;
