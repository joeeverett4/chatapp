

export const run = async ({ params, logger, api }) => {

  let { accessToken, organizationId } = params;

  if (!accessToken) {
    throw new Error("accessToken is required");
  }

  if (!organizationId) {
    throw new Error("organizationId is required");
  }

  const query = `
  query AppInstallInfo(
  $appId: ID!,
  $first: Int = 20,
  $occurredAtMin: DateTime,
  $occurredAtMax: DateTime
) {
  app(id: $appId) {
    id
    name
    apiKey

    events(
      first: $first,
      types: [RELATIONSHIP_INSTALLED],
      occurredAtMin: $occurredAtMin,
      occurredAtMax: $occurredAtMax
    ) {
      edges {
        cursor
        node {
          __typename      # will be RelationshipInstalled
          occurredAt      # when the install happened
          type            # RELATIONSHIP_INSTALLED

          shop {          # the installing store
            id
            name
            myshopifyDomain
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
  `
  organizationId = organizationId || process.env.SHOPIFY_PARTNER_ORG_ID;
  accessToken = accessToken || process.env.SHOPIFY_PARTNER_ACCESS_TOKEN;
  const apiVersion = "2026-01";
  const endpoint = `https://partners.shopify.com/${organizationId}/api/${apiVersion}/graphql.json`;

  logger.info({ organizationId, apiVersion }, "Making Shopify Partner API request");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query,
      variables: {
        appId: "gid://partners/App/103750238209",
        first: 20
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger.error({ status: response.status, error: errorText }, "Shopify Partner API request failed");
    throw new Error(`Shopify Partner API request failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  const events = data.data.app.events.edges.map(edge => edge.node);

  for (const event of events) {
    // Extract numeric ID from GID (e.g., "gid://partners/Shop/12345" -> 12345)
    const shopId = parseInt(event.shop.id.split("/").pop(), 10);

    const existingShop = await api.shop.maybeFindFirst({
      filter: { shopId: { equals: shopId } }
    });

    if (existingShop) {
      logger.info({ shopId }, "Shop already exists");
    } else {
      await api.shop.create({
        shopId,
        name: event.shop.name,
        domain: event.shop.myshopifyDomain,
        state: "INSTALLED",
        parentOrganization: { _link: "1" } // TODO: replace with actual organization ID
      });
      logger.info({ shopId }, "Shop created");
    }
  }

  if (data.errors) {
    logger.error({ errors: data.errors }, "Shopify Partner API returned errors");
    throw new Error(`Shopify Partner API errors: ${JSON.stringify(data.errors)}`);
  }

  logger.info("Shopify Partner API request successful");

  return { data: data.data };
};

export const params = {
  accessToken: { type: "string" },
  organizationId: { type: "string" }
};

export const options = {
  timeoutMS: 3600000,
  returnType: true
};

