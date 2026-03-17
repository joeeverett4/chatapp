import { useFindOne, useAction, useUser } from "@gadgetinc/react";
import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
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
  const [lastMessageCount, setLastMessageCount] = useState(0);

  const [{ data: conversation, fetching, error }, refetch] = useFindOne(api.conversation, id, {
    live: true,
    select: {
      id: true,
      shopName: true,
      externalShopId: true,
      subject: true,
      status: true,
      lastReadAt: true,
      messages: {
        edges: {
          node: {
            id: true,
            content: true,
            senderType: true,
            createdAt: true,
            emailSentAt: true,
            emailDeliveredAt: true,
            emailReadAt: true,
          }
        }
      }
    },
  });

  const [{ fetching: sending }, sendMessage] = useAction(api.message.create);

  const messages = conversation?.messages?.edges?.map(edge => edge.node) || [];

  // Mark conversation as read by operator when viewing or when new messages arrive
  useEffect(() => {

    console.log("messages")
    console.log(messages)
    const messageCount = messages.length;
    if (conversation?.id && messageCount > 0 && messageCount !== lastMessageCount) {
      api.conversation.update(conversation.id, {
        operatorLastReadAt: new Date()
      }).then(() => {
        console.log("setting last message count")
        setLastMessageCount(messageCount);
      }).catch(err => {
        console.error('Failed to mark as read:', err);
      });
    }
  }, [conversation?.id, messages.length, lastMessageCount]);

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

  if (fetching && !conversation) {
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

  const lastReadAt = conversation?.lastReadAt ? new Date(conversation.lastReadAt) : null;

  const getMessageStatus = (message) => {
    if (message.senderType !== "support") return null;

    // Email statuses take priority
    if (message.emailReadAt) return { type: "emailRead", label: "Read in email" };
    if (message.emailDeliveredAt) return { type: "emailDelivered", label: "Delivered to email" };
    if (message.emailSentAt) return { type: "emailSent", label: "Sent to email" };

    // In-app read status
    if (lastReadAt && new Date(message.createdAt) <= lastReadAt) {
      return { type: "read", label: "Read" };
    }

    return { type: "sent", label: "Sent" };
  };

  const renderStatus = (status) => {
    if (!status) return null;
    return <span className="ml-1">· {status.label}</span>;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
                <p className={`text-xs mt-1 flex items-center gap-1 ${message.senderType === "support" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.senderType} • {new Date(message.createdAt).toLocaleString()}
                  {renderStatus(getMessageStatus(message))}
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
