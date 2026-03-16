import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

const config = getConfig();
const api = new Client({
  environment: config.environment || 'development'
});

console.log("api")
console.log(api);

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState('');
  const pollIntervalRef = useRef(null);

  const config = getConfig();
  const shopId = config.shopId || '';
  const shopName = config.shopName || 'Shop';
  const orgSlug = config.orgSlug || '';

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [shopId, shopName, orgSlug]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId || !shopId) return;

    try {
      const data = await api.getWidgetMessages({ conversationId, shopId });
      setMessages(data.messages || []);
    } catch (err) {
      // Silently fail on polling errors
    }
  }, [conversationId, shopId]);

  // Send message
  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || !conversationId || !shopId || !email) return;

    setSending(true);

    try {
      const data = await api.sendWidgetMessage({
        conversationId,
        content: content.trim(),
        shopId,
        email
      });
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
      // Initial fetch
      fetchMessages();

      // Start polling every 5 seconds
      pollIntervalRef.current = setInterval(fetchMessages, 5000);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [isOpen, conversationId, fetchMessages]);

  return {
    isOpen,
    toggleChat,
    messages,
    sendMessage,
    loading,
    error,
    sending,
    email,
    initConversation
  };
}
