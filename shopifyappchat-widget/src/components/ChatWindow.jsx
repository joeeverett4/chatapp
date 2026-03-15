import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({ messages, onSend, onClose, loading, error, sending }) {
  return (
    <div className="sac-window">
      <div className="sac-header">
        <span className="sac-header-title">Support Chat</span>
        <button className="sac-close-btn" onClick={onClose} aria-label="Close chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="sac-body">
        {loading ? (
          <div className="sac-loading">Loading...</div>
        ) : error ? (
          <div className="sac-error">{error}</div>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <MessageInput onSend={onSend} disabled={loading || sending} />
    </div>
  );
}
