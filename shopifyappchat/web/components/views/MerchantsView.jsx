import { useState } from "react";
import { useFindMany } from "@gadgetinc/react";
import { api } from "../../api";

export function MerchantsView({ isActive = true, onSelectMerchant }) {
  const [search, setSearch] = useState("");

  const [{ data: merchants, fetching, error }] = useFindMany(api.shop, {
    filter: {
      parentOrganizationId: { equals: "1" },
      ...(search && {
        OR: [
          { name: { startsWith: search } },
          { domain: { startsWith: search } },
        ]
      })
    },
    sort: { createdAt: "Descending" },
    pause: !isActive,
  });

  const getStatusTone = (state) => {
    switch (state) {
      case "INSTALLED": return "success";
      case "UNINSTALLED": return "critical";
      default: return "info";
    }
  };

  const handleRowClick = (merchant) => {
    onSelectMerchant?.(merchant.domain);
  };

  return {
    layout: "single",

    fullContent: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <s-page heading="Merchants" inlineSize="small">
          <s-section>
            <s-stack gap="400">
              <s-search-field
                placeholder="Search by name or domain..."
                value={search}
                onInput={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
              />
              <div style={{ marginTop: '20px' }}>
            <s-table loading={fetching}>
                <s-table-header-row>
                  <s-table-header>Shop</s-table-header>
                  <s-table-header>Domain</s-table-header>
                  <s-table-header>Status</s-table-header>
                </s-table-header-row>
                <s-table-body>
                  {merchants?.map((merchant) => (
                    <s-table-row
                      key={merchant.id}
                      onClick={() => handleRowClick(merchant)}
                      style={{ cursor: 'pointer' }}
                    >
                      <s-table-cell>
                        <s-text fontWeight="semibold">{merchant.name || "Unnamed Shop"}</s-text>
                      </s-table-cell>
                      <s-table-cell>
                        <s-text tone="subdued">{merchant.domain}</s-text>
                      </s-table-cell>
                      <s-table-cell>
                        <s-badge tone={getStatusTone(merchant.state)}>
                          {merchant.state || "Unknown"}
                        </s-badge>
                      </s-table-cell>
                    </s-table-row>
                  ))}
                </s-table-body>
              </s-table>
              </div>

            {/* Empty State */}
            {!fetching && (!merchants || merchants.length === 0) && (
              <s-box padding="800">
                <s-stack align="center" gap="300">
                  <s-text tone="subdued">No merchants found</s-text>
                </s-stack>
              </s-box>
            )}
            </s-stack>
          </s-section>
        </s-page>
      </div>
    ),

    badge: merchants?.length || 0,
  };
}
