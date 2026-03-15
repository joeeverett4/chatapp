import { useFindMany, useUser } from "@gadgetinc/react";
import { Link } from "react-router";
import { api } from "../api";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function ConversationsPage() {
  const user = useUser(api, { select: { id: true, organizationId: true } });

  const [{ data: conversations, fetching, error }] = useFindMany(api.conversation, {
    filter: user?.organizationId ? { organizationId: { equals: user.organizationId } } : undefined,
    select: {
      id: true,
      shopName: true,
      externalShopId: true,
      subject: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    sort: { updatedAt: "Descending" },
    pause: !user?.organizationId,
  });

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user.organizationId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">No Organization</h1>
        <p className="text-muted-foreground">You are not assigned to an organization. Please contact an administrator.</p>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading conversations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Support Conversations</h1>

      {conversations?.length === 0 ? (
        <p className="text-muted-foreground">No conversations yet.</p>
      ) : (
        <div className="grid gap-4">
          {conversations?.map((conversation) => (
            <Link key={conversation.id} to={`/conversations/${conversation.id}`}>
              <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{conversation.shopName || conversation.externalShopId}</h3>
                    <p className="text-sm text-muted-foreground">{conversation.subject}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={conversation.status === "open" ? "default" : conversation.status === "pending" ? "secondary" : "outline"}>
                      {conversation.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(conversation.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
