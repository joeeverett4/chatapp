import React, { useEffect, useRef } from 'react';

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="sac-messages sac-empty">
        <p>Start a conversation with our support team.</p>
      </div>
    );
  }

  return (
    <div className="sac-messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`sac-message sac-message-${message.senderType}`}
        >
          <div className="sac-message-content">{message.content}</div>
          <div className="sac-message-time">
            {formatTime(message.createdAt)}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
