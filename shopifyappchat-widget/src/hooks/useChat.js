import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

const config = getConfig();
const api = new Client({
  environment: config.environment || 'development'
});

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
  const heartbeatIntervalRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

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
      const data = await api.initWidgetTwo({ shopId, shopName, orgSlug, email: userEmail, country });
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
      await api.markConversationRead({ conversationId, shopId });
    } catch (err) {
      // Silently fail
    }
  }, [conversationId, shopId]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId || !shopId) return;

    try {
      const data = await api.getWidgetMessages({ conversationId, shopId });
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

      const data = await api.sendWidgetMessage(params);
      setMessages(prev => [...prev, data.message]);
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

  // Poll for messages when chat is open
  useEffect(() => {
    if (isOpen && conversationId) {
      // Initial fetch and mark as read
      fetchMessages();
      markAsRead();

      // Start polling every 5 seconds - also mark as read while customer is viewing
      pollIntervalRef.current = setInterval(() => {
        fetchMessages();
        if (document.visibilityState === 'visible') {
          markAsRead();
        }
      }, 5000);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [isOpen, conversationId, fetchMessages, markAsRead]);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, updateActivity));

    return () => {
      events.forEach(event => window.removeEventListener(event, updateActivity));
    };
  }, []);

  // Send heartbeat when chat is open and user is active
  useEffect(() => {
    if (isOpen && email) {
      const sendHeartbeat = async () => {
        const isActive = (Date.now() - lastActivityRef.current) < 60000;
        console.log('Heartbeat check:', { isActive, visible: document.visibilityState, email });
        if (isActive && document.visibilityState === 'visible') {
          try {
            await api.sendHeartbeat({ email });
            console.log('Heartbeat sent successfully');
          } catch (err) {
            console.log('Heartbeat failed:', err);
          }
        }
      };

      // Send initial heartbeat
      sendHeartbeat();

      // Send heartbeat every 30 seconds
      heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000);

      return () => {
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }
      };
    }
  }, [isOpen, email]);

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
