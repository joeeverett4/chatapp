import { useState, useRef } from "react";
import { useFindMany, useFindOne, useUser, useAction } from "@gadgetinc/react";
import { api } from "../api";
import {
  MessageSquare,
  Inbox,
  Search,
  Settings,
  Bot,
  Users,
  ChevronDown,
  Send,
  Image as ImageIcon,
  X,
} from "lucide-react";

export default function InboxPage() {
  const user = useUser(api);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [{ fetching: sending }, sendMessage] = useAction(api.message.create);

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
    live: true,
    pause: !user?.organizationId,
  });

  const [{ data: selectedConversation }] = useFindOne(api.conversation, selectedConversationId, {
    select: {
      id: true,
      shopName: true,
      email: true,
      status: true,
      country: true,
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
    live: true,
    pause: !selectedConversationId,
  });

  const messages = selectedConversation?.messages?.edges?.map(e => e.node) || [];

  // Convert file to base64
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

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Left Sidebar - Main Menu */}
      <div className="w-16 bg-slate-800 flex flex-col items-center py-4 gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 flex flex-col items-center gap-2 mt-4">
          <NavIcon icon={Inbox} active />
          <NavIcon icon={Bot} />
          <NavIcon icon={Users} />
          <NavIcon icon={Search} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <NavIcon icon={Settings} />
          <div className="w-8 h-8 bg-slate-600 rounded-full" />
        </div>
      </div>

      {/* Conversation List */}
      <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-gray-200 rounded text-sm">All</button>
            <button className="px-3 py-1 text-sm text-gray-500">Filters</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations?.map((conv) => {
            const lastMessage = conv.messages?.edges?.[conv.messages.edges.length - 1]?.node;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                  selectedConversationId === conv.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <FlagAvatar country={conv.country} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm truncate text-gray-900">{conv.email || conv.shopName}</span>
                      <span className="text-xs text-gray-500">
                        {formatTime(conv.updatedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {lastMessage?.content || "No messages"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {selectedConversation.status}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderType === "support" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[60%] rounded-lg p-3 ${
                      msg.senderType === "support"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
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
                    {msg.content && <p className="text-sm">{msg.content}</p>}
                    <p className={`text-xs mt-1 ${msg.senderType === "support" ? "text-blue-100" : "text-gray-500"}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              {/* Image Preview */}
              {previewUrl && (
                <div className="mb-3 relative inline-block">
                  <img src={previewUrl} alt="Preview" className="max-h-24 rounded-lg border" />
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex gap-2">
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
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Send your message..."
                  className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none border border-gray-200 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={sending || (!messageContent.trim() && !selectedFile)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>

      {/* Customer Details Sidebar */}
      <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
        {selectedConversation ? (
          <div className="p-4">
            {/* Customer Profile */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-3">
                <FlagAvatar country={selectedConversation.country} size="lg" />
              </div>
              <h3 className="font-semibold text-gray-900">{selectedConversation.email}</h3>
              <p className="text-sm text-gray-500">{selectedConversation.country}</p>
            </div>

            {/* Main Information */}
            <Section title="Main information">
              <InfoRow label="Email" value={selectedConversation.email} />
              <InfoRow label="Country" value={selectedConversation.country || "—"} />
              <InfoRow label="Status" value={selectedConversation.status} />
            </Section>

            {/* Customer */}
            {selectedConversation.customer && (
              <Section title="Customer">
                <InfoRow label="Name" value={selectedConversation.customer.name || "—"} />
                <InfoRow label="Last active" value={formatTime(selectedConversation.customer.lastActiveAt)} />
              </Section>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No conversation selected
          </div>
        )}
      </div>
    </div>
  );
}

function NavIcon({ icon: Icon, active }) {
  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 ${active ? "bg-slate-700" : ""}`}>
      <Icon className="w-5 h-5 text-slate-300" />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900">{value || "—"}</span>
    </div>
  );
}

function formatTime(date) {
  if (!date) return "—";
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return "now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return d.toLocaleDateString();
}

function countryToFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const code = countryCode.toUpperCase();
  return String.fromCodePoint(
    ...code.split("").map(c => 127397 + c.charCodeAt(0))
  );
}

function FlagAvatar({ country, size = "md" }) {
  const sizeClass = size === "lg" ? "w-16 h-16 text-3xl" : "w-10 h-10 text-xl";
  return (
    <div className={`${sizeClass} bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0`}>
      {countryToFlag(country)}
    </div>
  );
}
