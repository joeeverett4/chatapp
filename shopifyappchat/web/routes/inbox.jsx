import { useState } from "react";
import { useUser } from "@gadgetinc/react";
import { api } from "../api";
import { Inbox, Users } from "lucide-react";
import { NavItem } from "../components/shared/ViewComponents";
import { InboxView } from "../components/views/InboxView";
import { MerchantsView } from "../components/views/MerchantsView";

// View configuration - add new views here
const viewConfig = {
  inbox: {
    label: "Inbox",
    icon: Inbox,
    useView: InboxView,
  },
  merchants: {
    label: "Merchants",
    icon: Users,
    useView: MerchantsView,
  },
  // Easy to add more views:
  // settings: {
  //   label: "Settings",
  //   icon: Settings,
  //   useView: SettingsView,
  // },
};

export default function AppShell() {
  const user = useUser(api);
  const [activeView, setActiveView] = useState("inbox");

  // Always call all hooks (React requires consistent hook calls)
  // Pass isActive so views can pause queries when not visible
  const inboxData = InboxView({ isActive: activeView === "inbox" });
  const merchantsData = MerchantsView({ isActive: activeView === "merchants" });

  // Map view keys to their data
  const viewDataMap = {
    inbox: inboxData,
    merchants: merchantsData,
  };

  const viewData = viewDataMap[activeView];

  return (
    <div className="flex h-screen bg-[#f3f4f6] text-[#1d1f27]">
      {/* Left Sidebar - Navigation */}
      <div className="w-56 bg-[#e8e8e4] flex flex-col border-r border-[#d9d9d5]">
        {/* Logo */}
        <div className="p-3 border-b border-[#d9d9d5]">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-sm font-medium">Support Chat</span>
          </div>
        </div>

        {/* Main Navigation - Generated from config */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {Object.entries(viewConfig).map(([key, config]) => (
            <NavItem
              key={key}
              icon={config.icon}
              label={config.label}
              active={activeView === key}
              badge={viewDataMap[key]?.badge || 0}
              onClick={() => setActiveView(key)}
            />
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-[#d9d9d5]">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#dcdbcf] cursor-pointer transition-colors">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.email?.split('@')[0] || 'User'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area - adapts to layout type */}
      {viewData.layout === "single" ? (
        // Single column layout
        <div className="flex-1 flex flex-col min-w-0">
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
