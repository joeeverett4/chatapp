import Timeline from './Timeline';

export function Example() {
    // Event timestamps must be in date order (ascending or descending)
    // tone is optional
    //  - critical and caution will use Alert indicator
    //  - success will use Check indicator
    //  - all other tones will use Chevron indicator with Polaris tone color applied
    //  - undefined will show the Shopify-style timeline marker
    // url is optional
    // icon is optional
    // timelineEvent will accept a string or a JSX.Element

    const timelineItems = [
        {
            tone: 'base',
            url: undefined,
            timelineEvent: (
                <>
                    A refund was processed for order <span style={{ display: 'inline-block' }}><s-badge>#1242</s-badge></span>. An ARN was generated - 23587235897.
                </>
            ),
            timestamp: new Date('2024-09-12T13:30:00')
        },
        {
            tone: 'base',
            icon: <img src='/timeline-icon_ricemill.png' width='16' height='16' />,
            url: undefined,
            timelineEvent: (
                <>
                    Order <span style={{ display: 'inline-block' }}><s-badge>#1241</s-badge></span> was successfully delivered. (Ricemill)
                </>
            ),
            timestamp: new Date('2024-09-12T09:29:00')
        },
        {
            tone: 'critical',
            url: undefined,
            timelineEvent: (
                <>
                    Order <span style={{ display: 'inline-block' }}><s-badge>#1240</s-badge></span> flagged for review due to suspicious activity.
                </>
            ),
            timestamp: new Date('2024-09-11T15:00:00')
        },
        {
            tone: 'success',
            url: 'https://example.com/order/1235',
            timelineEvent: (
                <>
                    Order <span style={{ display: 'inline-block' }}><s-badge>#1235</s-badge></span> shipped via Fedex.
                </>
            ),
            timestamp: new Date('2024-09-11T14:59:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: <>Customer logged in.</>,
            timestamp: new Date('2024-09-11T09:44:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: <>Failed login attempt detected.</>,
            timestamp: new Date('2024-09-11T06:59:00')
        },
        {
            tone: 'base',
            url: undefined,
            icon: <img src='/timeline-icon_loyalty.png' width='16' height='16' />,
            timelineEvent: (
                <>
                    Customer redeemed 50 reward points on an order <span style={{ display: 'inline-block' }}><s-badge>#1237</s-badge></span> (LoyaltyPlus)
                </>
            ),
            timestamp: new Date('2024-09-10T18:19:00')
        },
        {
            tone: 'base',
            url: undefined,
            icon: <img src='/timeline-icon_loyalty.png' width='16' height='16' />,
            timelineEvent: (
                <>Customer earned 100 reward points for subscribing to your mailing list. (LoyaltyPlus)</>
            ),
            timestamp: new Date('2024-09-10T18:14:00')
        },
        {
            tone: 'caution',
            url: undefined,
            timelineEvent: <>Account flagged for unusual activity.</>,
            timestamp: new Date('2024-09-10T16:00:00')
        },
        {
            tone: 'base',
            url: 'https://example.com/fraud-check',
            timelineEvent: (
                <>
                    Fraud check was initiated for order <span style={{ display: 'inline-block' }}><s-badge>#1236</s-badge></span>
                </>
            ),
            timestamp: new Date('2024-09-10T12:10:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: (
                <>
                    Customer placed an order <span style={{ display: 'inline-block' }}><s-badge>#1234</s-badge></span>
                </>
            ),
            timestamp: new Date('2024-09-10T10:30:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: (
                <>
                    Customer placed order <span style={{ display: 'inline-block' }}><s-badge>#1239</s-badge></span>
                </>
            ),
            timestamp: new Date('2024-09-09T13:25:00')
        },
        {
            tone: 'base',
            url: 'https://example.com/points-earned',
            timelineEvent: <>Customer earned 200 reward points after purchase.</>,
            timestamp: new Date('2024-09-09T13:00:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: <>Customer earned 100 reward points.</>,
            timestamp: new Date('2024-09-09T11:30:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: <>Customer contacted support regarding an issue with order.</>,
            timestamp: new Date('2024-09-09T11:00:00')
        },
        {
            tone: 'critical',
            url: undefined,
            icon: <img src='/timeline-icon_security.png' width='16' height='16' />,
            timelineEvent: <>Customer flagged for fraud. (Securité)</>,
            timestamp: new Date('2024-09-09T08:15:00')
        },
        {
            tone: 'base',
            url: undefined,
            icon: <img src='/timeline-icon_ricemill.png' width='16' height='16' />,
            timelineEvent: <>Customer updated their shipping address. (Ricemill)</>,
            timestamp: new Date('2024-09-08T14:09:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: <>Customer&apos;s email address was updated.</>,
            timestamp: new Date('2024-09-08T12:44:00')
        },
        {
            tone: 'base',
            url: 'https://example.com/account-updated',
            timelineEvent: <>Account details updated.</>,
            timestamp: new Date('2024-09-08T11:19:00')
        },
        {
            tone: 'base',
            url: undefined,
            timelineEvent: <>Customer subscribed to newsletter.</>,
            timestamp: new Date('2024-09-07T09:29:00')
        }
    ];

    return (
        <s-page inlineSize="small">
            <Timeline items={timelineItems} />
        </s-page>
    );
}

/*
import { Fragment } from 'react';
import styles from './timeline.module.css';

export default function Timeline({ items }) {
  function getBulletIconFromTone(tone) {
    switch (tone) {
      case 'critical':
      case 'caution':
        return { type: 'alert-circle', tone: tone };
      case 'success':
        return { type: 'check-circle', tone: 'success' };
      case 'base':
      case undefined:
        return null;
      default:
        return { type: 'circle-chevron-right', tone: tone };
    }
  }

  let lastDate = null;

  return (
    <s-box paddingInline="base">
      <s-stack direction="block" gap="base">
        {items?.length ? (
          items.map((item, index) => {
            const currentDate = item.timestamp.toLocaleDateString([], {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const showDate = currentDate !== lastDate;
            lastDate = currentDate;
            const bulletIcon = getBulletIconFromTone(item.tone);

            return (
              <Fragment key={index}>
                {showDate && (
                  <s-grid gridTemplateColumns="30px auto 90px" columnGap="small">
                    <div>&nbsp;</div>
                    <s-stack direction="block" gap="none">
                      <s-box paddingBlockStart="base">
                        <s-text alignment="start" color="subdued">
                          {currentDate}
                        </s-text>
                      </s-box>
                    </s-stack>
                    <div>&nbsp;</div>
                  </s-grid>
                )}

                <s-grid gridTemplateColumns="30px auto 90px" columnGap="small">
                  <div className={styles['timeline-icon']}>
                    {item.tone === 'base' || !bulletIcon ? (
                      <div className={styles['timeline-icon-base']}>
                        <div className={styles['timeline-icon-base-inner']} />
                      </div>
                    ) : (
                      <span className={styles['timeline-icon-polaris-icon']}>
                        <s-icon type={bulletIcon.type} tone={bulletIcon.tone} />
                      </span>
                    )}
                  </div>
                  <div className={styles['timeline-event-description']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {item.icon}
                      {item.url ? (
                        <s-link url={item.url} monochrome removeUnderline>
                          <s-stack direction="inline" gap="none" wrap={false} alignItems="start">
                            <span className={styles['timeline-event-link-main']}>
                              {item.timelineEvent}
                            </span>
                            <s-icon type="chevron-right" />
                          </s-stack>
                        </s-link>
                      ) : (
                        <s-text>{item.timelineEvent}</s-text>
                      )}
                    </div>
                  </div>
                  <s-text alignment="end" color="subdued">
                    {item.timestamp.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </s-text>
                </s-grid>
              </Fragment>
            );
          })
        ) : (
          <s-text>No timeline events available.</s-text>
        )}
      </s-stack>
    </s-box>
  );
}


timeline.module.css

.timeline-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.timeline-icon-base {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #E1E3E5;
}

.timeline-icon-base-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #FFFFFF;
}

.timeline-icon-polaris-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.timeline-event-description {
  display: flex;
  align-items: center;
  height: 100%;
}

.timeline-event-link-main {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

*/