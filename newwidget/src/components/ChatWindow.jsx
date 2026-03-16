import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function EmailForm({ onSubmit, loading }) {
  const [emailInput, setEmailInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onSubmit(emailInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sac-email-form">
      <p className="sac-email-prompt">Please enter your email to start chatting:</p>
      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        placeholder="your@email.com"
        className="sac-email-input"
        required
        disabled={loading}
      />
      <button type="submit" className="sac-email-submit" disabled={loading || !emailInput.trim()}>
        {loading ? 'Starting...' : 'Start Chat'}
      </button>
    </form>
  );
}

export default function ChatWindow({ messages, onSend, onClose, loading, error, sending, email, onEmailSubmit }) {
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
        {!email ? (
          <EmailForm onSubmit={onEmailSubmit} loading={loading} />
        ) : loading ? (
          <div className="sac-loading">Loading...</div>
        ) : error ? (
          <div className="sac-error">{error}</div>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      {email && <MessageInput onSend={onSend} disabled={loading || sending} />}
    </div>
  );
}
