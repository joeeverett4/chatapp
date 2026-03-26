import { useFindMany } from "@gadgetinc/react";
import { api } from "../../api";
import { Users, Plus, Globe, ExternalLink } from "lucide-react";
import { ConversationAvatar } from "../shared/ViewComponents";

export function MerchantsView({ isActive = true }) {

  const [{ data: merchants, error }] = useFindMany(api.shop, {
    filter: {
      parentOrganizationId: { equals: "1" },
    },
  });

  console.log("merchants:", merchants);
  if (error) console.log("error:", error);

  return {
    layout: "single", // Use single column layout

    fullContent: (
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Merchants</h2>
            <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Merchant
            </button>
          </div>
        </div>

        {/* Merchant Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {merchants?.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <ConversationAvatar name={merchant.name || merchant.domain} size="sm" />
                      <span className="font-medium text-gray-900">
                        {merchant.name || "Unnamed Shop"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {merchant.domain}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {merchant.shopId}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${merchant.state === "INSTALLED"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${merchant.state === "INSTALLED" ? "bg-green-500" : "bg-gray-500"
                        }`} />
                      {merchant.state || "Unknown"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!merchants || merchants.length === 0) && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No merchants found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),

    badge: merchants?.length || 0,
  };
}
