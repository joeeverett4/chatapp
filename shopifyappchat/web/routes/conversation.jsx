import { useFindOne, useAction, useUser } from "@gadgetinc/react";
import { useParams, Link } from "react-router";
import { useState } from "react";
import { api } from "../api";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Send } from "lucide-react";

export default function ConversationPage() {
  const { id } = useParams();
  const [replyContent, setReplyContent] = useState("");
  const user = useUser(api);

  const [{ data: conversation, fetching, error }, refetch] = useFindOne(api.conversation, id, {
    live: true,
    select: {
      id: true,
      shopName: true,
      externalShopId: true,
      subject: true,
      status: true,
      messages: {
        edges: {
          node: {
            id: true,
            content: true,
            senderType: true,
            createdAt: true,
          }
        }
      }
    },
  });

  const [{ fetching: sending }, sendMessage] = useAction(api.message.create);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    await sendMessage({
      content: replyContent,
      senderType: "support",
      conversation: { _link: id },
      user: { _link: user.id }
    });

    setReplyContent("");
    refetch();
  };

  if (fetching) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading conversation...</p>
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

  const messages = conversation?.messages?.edges?.map(edge => edge.node) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/conversations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to conversations
      </Link>

      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{conversation?.shopName || conversation?.externalShopId}</h1>
            <p className="text-sm text-muted-foreground">{conversation?.subject}</p>
          </div>
          <Badge variant={conversation?.status === "open" ? "default" : conversation?.status === "pending" ? "secondary" : "outline"}>
            {conversation?.status}
          </Badge>
        </div>
      </Card>

      <div className="space-y-4 mb-6">
        {messages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === "support" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${message.senderType === "support"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                  }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.senderType === "support" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.senderType} • {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSendReply} className="flex gap-2">
        <Textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1 min-h-[80px]"
        />
        <Button type="submit" disabled={sending || !replyContent.trim()}>
          <Send className="w-4 h-4 mr-2" />
          {sending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
