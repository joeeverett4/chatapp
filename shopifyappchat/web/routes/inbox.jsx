import { useState } from "react";
import { useUser } from "@gadgetinc/react";
import { api } from "../api";
import { InboxView } from "../components/views/InboxView";
import { MerchantsView } from "../components/views/MerchantsView";
import { MerchantView } from "../components/views/MerchantView";
import { ImportView } from "../components/views/ImportView";

// View configuration
const viewConfig = {
  inbox: {
    label: "Inbox",
    icon: "message",
  },
  merchants: {
    label: "Merchants",
    icon: "store",
    submenus: {
      import: {
        label: "Import",
        icon: "import",
      },
    },
  },
};

function SidebarNavItem({ icon, label, active, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: active ? '#f3f3f3' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <s-icon name={icon} />
      <s-text fontWeight={active ? "semibold" : "regular"}>{label}</s-text>
      {badge > 0 && (
        <s-badge tone="info">{badge}</s-badge>
      )}
    </div>
  );
}

export default function AppShell() {
  const user = useUser(api);
  const [activeView, setActiveView] = useState("inbox");
  const [selectedMerchantDomain, setSelectedMerchantDomain] = useState(null);

  const inboxData = InboxView({ isActive: activeView === "inbox" });
  const merchantsData = MerchantsView({
    isActive: activeView === "merchants" && !selectedMerchantDomain,
    onSelectMerchant: (domain) => {
      setSelectedMerchantDomain(domain);
    },
  });
  const merchantData = MerchantView({
    domain: selectedMerchantDomain,
    onBack: () => setSelectedMerchantDomain(null),
  });
  const importData = ImportView({ isActive: activeView === "import", user });

  const viewDataMap = {
    inbox: inboxData,
    merchants: selectedMerchantDomain ? merchantData : merchantsData,
    import: importData,
  };

  const viewData = viewDataMap[activeView];

  const handleViewChange = (key) => {
    if (key !== "merchants") {
      setSelectedMerchantDomain(null);
    }
    setActiveView(key);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar */}
      <div style={{
        width: '220px',
        backgroundColor: '#f6f6f7',
        borderRight: '1px solid #e1e3e5',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#f97316',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
            }}>
              S
            </div>
            <s-text fontWeight="semibold">Support Chat</s-text>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '8px' }}>
          {Object.entries(viewConfig).map(([key, config]) => {
            const submenuKeys = config.submenus ? Object.keys(config.submenus) : [];
            const isParentActive = activeView === key;
            const isSubmenuActive = submenuKeys.includes(activeView);
            const showSubmenus = isParentActive || isSubmenuActive;

            return (
              <div key={key}>
                <SidebarNavItem
                  icon={config.icon}
                  label={config.label}
                  active={isParentActive || isSubmenuActive}
                  badge={key === "merchants" ? 0 : (viewDataMap[key]?.badge || 0)}
                  onClick={() => handleViewChange(key)}
                />
                {/* Render submenus when parent or a submenu is active */}
                {config.submenus && showSubmenus && (
                  <div style={{ paddingLeft: '24px' }}>
                    {Object.entries(config.submenus).map(([subKey, subConfig]) => (
                      <SidebarNavItem
                        key={subKey}
                        icon={subConfig.icon}
                        label={subConfig.label}
                        active={activeView === subKey}
                        badge={viewDataMap[subKey]?.badge || 0}
                        onClick={() => setActiveView(subKey)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User Profile */}
        <div style={{ padding: '16px', borderTop: '1px solid #e1e3e5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <s-avatar name={user?.email || 'User'} size="small" />
            <s-text>{user?.email?.split('@')[0] || 'User'}</s-text>
          </div>
        </div>
      </div>

      {/* Content Area - adapts to layout type */}
      {viewData.layout === "single" ? (
        // Single column layout
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {viewData.fullContent}
        </div>
      ) : (
        // Three panel layout (default)
        <>
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {viewData.listPanel}
          </div>
          <div className="flex-1 flex flex-col bg-white min-w-0">
            {viewData.mainContent}
          </div>
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            {viewData.detailPanel}
          </div>
        </>
      )}
    </div>
  );
}
