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
    <div className="sac-email-section">
      <div className="sac-email-card">
        <div className="sac-email-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h3 className="sac-email-title">Let's stay in touch</h3>
        <p className="sac-email-subtitle">We'll notify you when we respond</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email address"
            className="sac-email-input"
            required
            disabled={loading}
          />
          <button type="submit" className="sac-email-submit" disabled={loading || !emailInput.trim()}>
            {loading ? 'Connecting...' : 'Continue'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

function WelcomeSection() {
  return (
    <div className="sac-welcome-section">
      <div className="sac-welcome-card">
        <p className="sac-welcome-text">
          Hey there! 👋 We're here to help. Ask us anything.
        </p>
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, onSend, onClose, loading, error, sending, email, onEmailSubmit }) {
  return (
    <div className="sac-window">
      {/* Header */}
      <div className="sac-header">
        <div className="sac-header-left">
          <div className="sac-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="sac-header-info">
            <span className="sac-header-title">Support</span>
            <span className="sac-header-status">
              <span className="sac-online-dot"></span>
              Online now
            </span>
          </div>
        </div>
        <button className="sac-minimize-btn" onClick={onClose} aria-label="Close chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="sac-body">
        {!email ? (
          <>
            <WelcomeSection />
            <EmailForm onSubmit={onEmailSubmit} loading={loading} />
          </>
        ) : loading ? (
          <div className="sac-loading">
            <div className="sac-loading-spinner"></div>
            <span>Connecting...</span>
          </div>
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
