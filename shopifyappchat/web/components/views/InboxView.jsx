import { useState, useRef, useEffect } from "react";
import { useFindMany, useFindOne, useUser, useAction } from "@gadgetinc/react";
import { api } from "../../api";
import {
  Inbox,
  ChevronDown,
  Send,
  Image as ImageIcon,
  X,
  Plus,
  MoreHorizontal,
  Clock,
  Mail,
  Globe,
  Monitor,
  MessageCircle,
  ExternalLink,
  Check,
  CheckCheck,
  Users,
} from "lucide-react";
import { ConversationAvatar, CollapsibleSection, InfoRow, StatusBadge, CountryFlag } from "../shared/ViewComponents";

export function InboxView({ isActive = true }) {
  const user = useUser(api);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [{ fetching: sending }, sendMessage] = useAction(api.message.create);
  const [, updateConversation] = useAction(api.conversation.update);
  const [lastMessageCount, setLastMessageCount] = useState(0);

  const [{ data: conversations }] = useFindMany(api.conversation, {
    filter: user?.organizationId ? { organizationId: { equals: user.organizationId } } : undefined,
    select: {
      id: true,
      shopName: true,
      email: true,
      status: true,
      country: true,
      updatedAt: true,
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
    sort: { updatedAt: "Descending" },
    live: isActive,
    pause: !isActive || !user?.organizationId,
  });

  const [{ data: selectedConversation }] = useFindOne(api.conversation, selectedConversationId, {
    select: {
      id: true,
      shopName: true,
      email: true,
      status: true,
      country: true,
      lastReadAt: true,
      customer: {
        id: true,
        name: true,
        email: true,
        country: true,
        lastActiveAt: true,
      },
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
            attachment: {
              url: true,
              mimeType: true,
              fileName: true,
            },
          }
        }
      }
    },
    live: isActive,
    pause: !isActive || !selectedConversationId,
  });

  const messages = selectedConversation?.messages?.edges?.map(e => e.node) || [];
  const lastReadAt = selectedConversation?.lastReadAt ? new Date(selectedConversation.lastReadAt) : null;

  useEffect(() => {
    const messageCount = messages.length;
    if (selectedConversationId && messageCount > 0 && messageCount !== lastMessageCount) {
      updateConversation({
        id: selectedConversationId,
        operatorLastReadAt: new Date()
      });
      setLastMessageCount(messageCount);
    }
  }, [selectedConversationId, messages.length]);

  useEffect(() => {
    setLastMessageCount(0);
  }, [selectedConversationId]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedConversationId || (!messageContent.trim() && !selectedFile)) return;

    const messageData = {
      content: messageContent || "",
      senderType: "support",
      conversation: { _link: selectedConversationId },
      user: { _link: user.id }
    };

    if (selectedFile) {
      const base64 = await fileToBase64(selectedFile);
      messageData.attachment = {
        base64,
        fileName: selectedFile.name,
        mimeType: selectedFile.type
      };
    }

    await sendMessage(messageData);
    setMessageContent("");
    clearFile();
  };

  return {
    listPanel: (
      <>
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Inbox</h2>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors">
              All
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 rounded-md text-sm text-gray-600 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations?.map((conv) => {
            const lastMessage = conv.messages?.edges?.[conv.messages.edges.length - 1]?.node;
            const isSelected = selectedConversationId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  isSelected ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <ConversationAvatar name={conv.email || conv.shopName} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-medium text-sm text-gray-900 truncate">
                        {conv.email?.split('@')[0] || conv.shopName}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {formatTime(conv.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CountryFlag country={conv.country} />
                      <p className="text-sm text-gray-500 truncate flex-1">
                        {lastMessage?.content || "No messages"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <StatusBadge status={conv.status} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    ),

    mainContent: selectedConversation ? (
      <>
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div className="flex items-center gap-3">
            <ConversationAvatar name={selectedConversation.email || selectedConversation.shopName} size="sm" />
            <div>
              <h3 className="font-medium text-sm text-gray-900">
                {selectedConversation.email?.split('@')[0] || selectedConversation.shopName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CountryFlag country={selectedConversation.country} />
                <span>{selectedConversation.country || 'Unknown location'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={selectedConversation.status} clickable />
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fafafa]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderType === "support" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-end gap-2 max-w-[70%]">
                {msg.senderType !== "support" && (
                  <ConversationAvatar name={selectedConversation.email} size="xs" />
                )}
                <div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 ${
                      msg.senderType === "support"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.attachment?.url && (
                      <img
                        src={msg.attachment.url}
                        alt={msg.attachment.fileName || "Attachment"}
                        className="max-w-full max-h-48 rounded-lg mb-2 cursor-pointer"
                        onClick={() => window.open(msg.attachment.url, "_blank")}
                      />
                    )}
                    {msg.content && <p className="text-sm leading-relaxed">{msg.content}</p>}
                  </div>
                  <div className={`flex items-center gap-2 mt-1 text-xs text-gray-400 ${
                    msg.senderType === "support" ? "justify-end" : "justify-start"
                  }`}>
                    <span>{formatMessageTime(msg.createdAt)}</span>
                    <MessageStatus message={msg} lastReadAt={lastReadAt} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          {previewUrl && (
            <div className="mb-3 relative inline-block">
              <img src={previewUrl} alt="Preview" className="max-h-20 rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={clearFile}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-gray-50 rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 transition-all"
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={sending || (!messageContent.trim() && !selectedFile)}
              className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Send
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">No conversation selected</h3>
          <p className="text-sm text-gray-500">Choose a conversation from the list to start chatting</p>
        </div>
      </div>
    ),

    detailPanel: selectedConversation ? (
      <>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col items-center text-center">
            <ConversationAvatar name={selectedConversation.email} size="lg" />
            <h3 className="font-semibold text-lg mt-3 text-gray-900">
              {selectedConversation.email?.split('@')[0] || 'Customer'}
            </h3>
            <p className="text-sm text-gray-500">{selectedConversation.email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <CountryFlag country={selectedConversation.country} />
              <span className="text-sm text-gray-500">{selectedConversation.country || 'Unknown'}</span>
            </div>
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
            <ExternalLink className="w-4 h-4" />
            View full profile
          </button>
        </div>

        <div className="p-4 space-y-1">
          <CollapsibleSection title="Main information" defaultOpen>
            <div className="space-y-3 text-sm">
              <InfoRow icon={Mail} label="Email" value={selectedConversation.email} />
              <InfoRow icon={Globe} label="Location" value={selectedConversation.country || "Unknown"} />
              <InfoRow icon={Clock} label="Local time" value={new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} />
              <InfoRow icon={MessageCircle} label="Channel" value="Chat" />
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Visitor device">
            <div className="space-y-3 text-sm">
              <InfoRow icon={Monitor} label="Browser" value="Chrome" />
              <InfoRow icon={Globe} label="OS" value="Windows" />
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Conversation history">
            <p className="text-sm text-gray-500">First conversation</p>
          </CollapsibleSection>

          <CollapsibleSection title="Notes">
            <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              Add a note
            </button>
          </CollapsibleSection>
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">Select a conversation<br />to view details</p>
        </div>
      </div>
    ),

    badge: conversations?.filter(c => c.status === "pending").length || 0,
  };
}

function formatTime(date) {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return "now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  if (diff < 172800000) return "Yesterday";
  return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
}

function formatMessageTime(date) {
  if (!date) return "";
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MessageStatus({ message, lastReadAt }) {
  if (message.senderType !== "support") return null;

  let status = "Sent";
  let isRead = false;
  let isDelivered = false;

  if (message.emailReadAt) {
    status = "Read in email";
    isRead = true;
  } else if (message.emailDeliveredAt) {
    status = "Delivered to email";
    isDelivered = true;
  } else if (message.emailSentAt) {
    status = "Sent to email";
  } else if (lastReadAt && new Date(message.createdAt) <= lastReadAt) {
    status = "Read";
    isRead = true;
  }

  return (
    <span className={`flex items-center gap-1 ${
      isRead ? "text-blue-500" :
      isDelivered ? "text-green-500" :
      "text-gray-400"
    }`}>
      {isRead || isDelivered ? (
        <CheckCheck className="w-3 h-3" />
      ) : (
        <Check className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}
