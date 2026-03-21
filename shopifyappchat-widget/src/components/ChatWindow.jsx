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

export default function ChatWindow({ messages, onSend, onClose, loading, error, sending, email, onEmailSubmit, operatorLastReadAt }) {
  return (
    <div className="sac-window">
      {/* Header */}
      <div className="sac-header">
        <div className="sac-header-top">
          <div className="sac-header-brand">
            <div className="sac-brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <span className="sac-brand-name">Support</span>
          </div>
          <button className="sac-minimize-btn" onClick={onClose} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>

        <div className="sac-header-content">
          <h2 className="sac-header-title">How can we help?</h2>
          <div className="sac-header-status">
            <span className="sac-status-badge">
              <span className="sac-online-dot"></span>
              Online
            </span>
            <span className="sac-status-divider">·</span>
            <span className="sac-response-time">Usually responds in minutes</span>
          </div>
        </div>
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
          <MessageList messages={messages} operatorLastReadAt={operatorLastReadAt} />
        )}
      </div>

      {email && <MessageInput onSend={onSend} disabled={loading || sending} />}
    </div>
  );
}
