import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@gadget-client/shopappchat';
import Pusher from 'pusher-js';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

// Pusher configuration
const PUSHER_KEY = 'e972331887dfc1bd1756';
const PUSHER_CLUSTER = 'us3';

// Enable Pusher logging for debugging
Pusher.logToConsole = true;

const config = getConfig();
const api = new Client({
  environment: config.environment || 'production'
});

console.log("this is the gadget client")
console.log(api)

// Storage key for persisting conversation
const getStorageKey = (shopId) => `sac_conversation_${shopId}`;

const saveSession = (shopId, data) => {
  try {
    localStorage.setItem(getStorageKey(shopId), JSON.stringify(data));
  } catch (e) {
    // localStorage not available
    // u

  }
};

const loadSession = (shopId) => {
  try {
    const stored = localStorage.getItem(getStorageKey(shopId));
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
};

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState('');
  const [operatorLastReadAt, setOperatorLastReadAt] = useState(null);
  const pollIntervalRef = useRef(null);
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  const config = getConfig();
  const shopId = config.shopId || '';
  const shopName = config.shopName || 'Shop';
  const orgSlug = config.orgSlug || '';

  // Restore session from localStorage on mount
  useEffect(() => {
    if (!shopId) return;
    const session = loadSession(shopId);
    if (session?.conversationId && session?.email) {
      setConversationId(session.conversationId);
      setEmail(session.email);
    }
  }, [shopId]);

  // Get country from IP
  const getCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code || null;
    } catch {
      return null;
    }
  };

  // Initialize conversation with email
  const initConversation = useCallback(async (userEmail) => {
    if (!userEmail) {
      setError('Email is required');
      return;
    }

    if (!shopId || !orgSlug) {
      setError('Widget not configured properly - missing shopId or orgSlug');
      return;
    }

    setEmail(userEmail);
    setLoading(true);
    setError(null);

    try {
      const country = await getCountry();
      console.log('Country:', country);
      const data = await api.widget.initWidgetTwo({ shopId, shopName, orgSlug, email: userEmail, country });
      setConversationId(data.conversationId);
      setMessages(data.messages || []);
      // Save session to localStorage
      saveSession(shopId, { conversationId: data.conversationId, email: userEmail });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [shopId, shopName, orgSlug]);

  // Mark conversation as read
  const markAsRead = useCallback(async () => {

    console.log("balcs")
    if (!conversationId || !shopId) return;

    console.log("calcs")
    try {
      console.log("zalcs")
      await api.widget.markConversationRead({ conversationId, shopId });
    } catch (err) {
      // Silently fail
    }
  }, [conversationId, shopId]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId || !shopId) return;

    try {
      const data = await api.widget.getWidgetMessages({ conversationId, shopId });
      console.log('getWidgetMessages response:', data);
      console.log('operatorLastReadAt from API:', data.operatorLastReadAt);
      setMessages(data.messages || []);
      if (data.operatorLastReadAt) {
        setOperatorLastReadAt(new Date(data.operatorLastReadAt));
      }
    } catch (err) {
      // If conversation not found, clear the stored session
      if (err.message?.includes('not found') || err.message?.includes('Access denied')) {
        setConversationId(null);
        setEmail('');
        setMessages([]);
        saveSession(shopId, null);
      }
    }
  }, [conversationId, shopId]);

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove data URL prefix (e.g., "data:image/png;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  // Send message (with optional file attachment)
  const sendMessage = useCallback(async (content, file = null) => {
    if ((!content?.trim() && !file) || !conversationId || !shopId || !email) return;

    setSending(true);

    try {
      const params = {
        conversationId,
        content: content?.trim() || "",
        shopId,
        email
      };

      // Add attachment if file is provided
      if (file) {
        params.attachmentBase64 = await fileToBase64(file);
        params.attachmentFileName = file.name;
        params.attachmentMimeType = file.type;
      }

      await api.widget.sendWidgetMessage(params);
      // Message will be added via Pusher's new-message event to avoid duplicates
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }, [conversationId, shopId, email]);

  // Toggle chat open/closed
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // No auto-initialize - wait for email submission

  // Subscribe to Pusher presence channel for real-time updates and online status
  useEffect(() => {
    if (!conversationId || !email) {
      console.log('Pusher: skipping - missing conversationId or email', { conversationId, email });
      return;
    }

    console.log('Pusher: initializing connection', { conversationId, email, key: PUSHER_KEY, cluster: PUSHER_CLUSTER });

    // Initialize Pusher with custom authorizer that calls Gadget action
    pusherRef.current = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      authorizer: (channel) => ({
        authorize: async (socketId, callback) => {
          console.log('Pusher: authorizing channel', { socketId, channelName: channel.name, email, conversationId });
          try {
            const auth = await api.widget.pusherAuth({
              socketId,
              channelName: channel.name,
              email,
              conversationId
            });
            console.log('Pusher: auth success', auth);
            callback(null, auth);
          } catch (err) {
            console.error('Pusher: auth FAILED', err);
            callback(err, null);
          }
        }
      })
    });

    // Log connection state changes
    pusherRef.current.connection.bind('state_change', (states) => {
      console.log('Pusher: connection state changed', { previous: states.previous, current: states.current });
    });

    pusherRef.current.connection.bind('connected', () => {
      console.log('Pusher: connected! Socket ID:', pusherRef.current.connection.socket_id);
    });

    pusherRef.current.connection.bind('error', (err) => {
      console.error('Pusher: connection error', err);
    });

    // Subscribe to presence channel (tracks online/offline automatically)
    const channelName = `presence-conversation-${conversationId}`;
    console.log('Pusher: subscribing to channel', channelName);
    channelRef.current = pusherRef.current.subscribe(channelName);

    // Listen for successful subscription
    channelRef.current.bind('pusher:subscription_succeeded', (members) => {
      console.log('Pusher: subscription SUCCEEDED', { channelName, memberCount: members.count, members: members.members });
    });

    // Listen for subscription error
    channelRef.current.bind('pusher:subscription_error', (error) => {
      console.error('Pusher: subscription FAILED', { channelName, error });
    });

    // Listen for members joining
    channelRef.current.bind('pusher:member_added', (member) => {
      console.log('Pusher: member joined', member);
    });

    // Listen for members leaving
    channelRef.current.bind('pusher:member_removed', (member) => {
      console.log('Pusher: member left', member);
    });

    // Listen for new messages
    channelRef.current.bind('new-message', (message) => {
      console.log('Pusher: new-message event received', message);
      setMessages(prev => {
        // Avoid duplicates
        if (prev.some(m => m.id === message.id)) {
          console.log('Pusher: duplicate message, skipping', message.id);
          return prev;
        }
        console.log('Pusher: adding message to state', message.id);
        return [...prev, message];
      });
    });

    // Listen for operator read receipts
    channelRef.current.bind('operator-read', (data) => {
      console.log('Pusher: operator-read event received', data);
      if (data.readAt) {
        setOperatorLastReadAt(new Date(data.readAt));
      }
    });

    return () => {
      console.log('Pusher: cleaning up, unsubscribing from', channelName);
      if (channelRef.current) {
        channelRef.current.unbind_all();
        pusherRef.current.unsubscribe(channelName);
      }
      if (pusherRef.current) {
        pusherRef.current.disconnect();
        console.log('Pusher: disconnected');
      }
    };
  }, [conversationId, email]);

  // Initial fetch and fallback polling (slower, as backup to Pusher)
  useEffect(() => {
    if (isOpen && conversationId) {
      // Initial fetch and mark as read
      fetchMessages();
      markAsRead();

      // Fallback polling every 30 seconds (in case Pusher misses something)
      pollIntervalRef.current = setInterval(() => {
        fetchMessages();
        if (document.visibilityState === 'visible') {
          markAsRead();
        }
      }, 30000);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [isOpen, conversationId, fetchMessages, markAsRead]);

  // Mark as read when tab becomes visible (customer returns to tab)
  useEffect(() => {
    if (!conversationId || !shopId) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isOpen) {
        console.log('Tab visible, marking as read');
        markAsRead();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [conversationId, shopId, isOpen, markAsRead]);

  // Pusher presence channel handles disconnect detection automatically
  // When the WebSocket disconnects, Pusher sends a webhook to our server

  return {
    isOpen,
    toggleChat,
    messages,
    sendMessage,
    loading,
    error,
    sending,
    email,
    initConversation,
    operatorLastReadAt
  };
}
