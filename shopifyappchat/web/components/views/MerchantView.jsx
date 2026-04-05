import { useFindMany } from "@gadgetinc/react";
import { api } from "../../api";
import { ArrowLeft, Activity, Calendar, User, MousePointer, Eye, ShoppingCart, BarChart3 } from "lucide-react";

export function MerchantView({ domain, onBack }) {

  console.log("MerchantView domain:", domain);

  const [{ data: events, fetching, error }] = useFindMany(api.analyticsFIVE, {
    filter: {
      shopId: { equals: domain },
    },
    sort: { timestamp: "Descending" },
    pause: !domain,
  });

  console.log("MerchantView events:", events);

  const eventIcons = {
    pageview: Eye,
    click: MousePointer,
    purchase: ShoppingCart,
    default: Activity,
  };

  const getEventIcon = (eventName) => {
    const Icon = eventIcons[eventName?.toLowerCase()] || eventIcons.default;
    return Icon;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    layout: "single",

    fullContent: (
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{domain}</h2>
              <p className="text-sm text-gray-500">Analytics Events</p>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <BarChart3 className="w-4 h-4" />
                Total Events
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {events?.length || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Eye className="w-4 h-4" />
                Pageviews
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {events?.filter((e) => e.event?.toLowerCase() === "pageview").length || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <User className="w-4 h-4" />
                Unique Sessions
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(events?.map((e) => e.sessionId).filter(Boolean)).size || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Calendar className="w-4 h-4" />
                Unique Visitors
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(events?.map((e) => e.distinctId).filter(Boolean)).size || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="flex-1 overflow-auto">
          {fetching ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading events...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-sm text-red-500">Error loading events</p>
                <p className="text-xs text-gray-400 mt-1">{error.message}</p>
              </div>
            </div>
          ) : events && events.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Session ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distinct ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Properties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => {
                  const EventIcon = getEventIcon(event.event);
                  return (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <EventIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {event.event || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatTimestamp(event.timestamp)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 font-mono">
                        {event.sessionId?.slice(0, 8) || "N/A"}...
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 font-mono">
                        {event.distinctId?.slice(0, 8) || "N/A"}...
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {event.properties ? (
                          <details className="cursor-pointer">
                            <summary className="text-blue-500 hover:text-blue-600">
                              View properties
                            </summary>
                            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-w-xs">
                              {JSON.stringify(event.properties, null, 2)}
                            </pre>
                          </details>
                        ) : (
                          "None"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No analytics events found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Events will appear here once tracked for {domain}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    badge: events?.length || 0,
  };
}
