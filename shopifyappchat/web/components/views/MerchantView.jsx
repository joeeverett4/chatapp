import { useFindMany } from "@gadgetinc/react";
import { api } from "../../api";
import Timeline from "./Timeline";

function EventWithProperties({ eventName, properties }) {
  const hasProperties = properties && Object.keys(properties).length > 0;

  if (!hasProperties) {
    return <>{eventName}</>;
  }

  return (
    <details style={{ cursor: 'pointer' }}>
      <summary style={{
        listStyle: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {eventName}
        <svg width="12" height="12" viewBox="0 0 12 12" style={{ color: '#666' }}>
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      <s-box paddingBlockStart="200">
        <pre style={{
          fontSize: '12px',
          backgroundColor: '#f6f6f7',
          padding: '8px',
          borderRadius: '4px',
          overflow: 'auto',
          maxWidth: '300px'
        }}>
          {JSON.stringify(properties, null, 2)}
        </pre>
      </s-box>
    </details>
  );
}

export function MerchantView({ domain, onBack }) {

  const [{ data: events, fetching, error }] = useFindMany(api.analyticsFIVE, {
    filter: {
      shopId: { equals: domain },
    },
    sort: { timestamp: "Descending" },
    pause: !domain,
  });

  // Convert analytics events to timeline format
  const timelineItems = events?.map((event) => ({
    tone: 'base',
    timelineEvent: (
      <EventWithProperties
        eventName={event.event || "Unknown Event"}
        properties={event.properties}
      />
    ),
    timestamp: new Date(event.timestamp),
  })) || [];

  return {
    layout: "single",

    fullContent: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <s-page heading={domain} inlineSize="small">
          <s-link
            slot="breadcrumb-actions"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            href="#"
          >
            Merchants
          </s-link>

          <s-section heading="Analytics Events">
            {fetching ? (
              <s-box padding="800">
                <s-stack align="center" gap="300">
                  <s-spinner />
                  <s-text tone="subdued">Loading events...</s-text>
                </s-stack>
              </s-box>
            ) : error ? (
              <s-box padding="800">
                <s-stack align="center" gap="300">
                  <s-text tone="critical">Error loading events</s-text>
                  <s-text tone="subdued">{error.message}</s-text>
                </s-stack>
              </s-box>
            ) : timelineItems.length > 0 ? (
              <Timeline items={timelineItems} />
            ) : (
              <s-box padding="800">
                <s-stack align="center" gap="300">
                  <s-text tone="subdued">No analytics events found</s-text>
                  <s-text tone="subdued">Events will appear here once tracked for {domain}</s-text>
                </s-stack>
              </s-box>
            )}
          </s-section>
        </s-page>
      </div>
    ),

    badge: events?.length || 0,
  };
}
