import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ConversationAvatar({ name, size = "md" }) {
  const colors = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-orange-400 to-orange-600",
    "from-green-400 to-green-600",
    "from-pink-400 to-pink-600",
  ];
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white font-medium">
        {name ? name.charAt(0).toUpperCase() : '?'}
      </span>
    </div>
  );
}

export function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
      </button>
      {isOpen && children && <div className="pt-1">{children}</div>}
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <span className="text-gray-900 truncate ml-2">{value || "—"}</span>
    </div>
  );
}

export function StatusBadge({ status, clickable }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    open: "bg-red-50 text-red-700 border-red-200",
    resolved: "bg-green-50 text-green-700 border-green-200",
  };

  const labels = {
    pending: "Pending",
    open: "Open",
    resolved: "Resolved",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.open} ${clickable ? "cursor-pointer hover:opacity-80" : ""}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'pending' ? 'bg-amber-500' :
        status === 'resolved' ? 'bg-green-500' : 'bg-red-500'
      }`} />
      {labels[status] || status}
    </span>
  );
}

export function CountryFlag({ country }) {
  if (!country || country.length !== 2) return null;
  const flag = String.fromCodePoint(
    ...country.toUpperCase().split("").map(c => 127397 + c.charCodeAt(0))
  );
  return <span className="text-sm">{flag}</span>;
}

export function NavItem({ icon: Icon, label, active, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
        active
          ? "bg-[#1d1f27] text-white"
          : "text-gray-700 hover:bg-[#dcdbcf]"
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-500"}`} />
      <span className="text-sm flex-1 text-left">{label}</span>
      {badge > 0 && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}
