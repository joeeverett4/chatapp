import React, { useEffect, useRef } from 'react';

export default function MessageList({ messages, operatorLastReadAt }) {
  const bottomRef = useRef(null);

  console.log('MessageList operatorLastReadAt:', operatorLastReadAt);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if a customer/merchant message has been read by the operator
  const isMessageRead = (message) => {
    console.log("ISMESSAGEREADISMESSAGEREAD")
    // Customer messages can be 'customer' or 'merchant' depending on the system
    if (message.senderType === 'support') {
      console.log("retuning falseee")
      return false
    }
    if (!operatorLastReadAt) {
      console.log("no operateor last read")
      false
    }
    const isRead = new Date(message.createdAt) <= operatorLastReadAt;
    console.log('isMessageRead:', { msgTime: message.createdAt, operatorLastReadAt, isRead });
    return isRead;
  };

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
          {/* Display attachment image if present */}
          {message.attachment?.url && (
            <div className="sac-message-attachment">
              <img
                src={message.attachment.url}
                alt={message.attachment.fileName || 'Attachment'}
                onClick={() => window.open(message.attachment.url, '_blank')}
              />
            </div>
          )}
          {/* Display text content if present */}
          {message.content && (
            <div className="sac-message-content">{message.content}</div>
          )}
          <div className="sac-message-time">
            {formatTime(message.createdAt)}
            {message.senderType !== 'support' && isMessageRead(message) && (
              <span className="sac-read-status"> · Read</span>
            )}
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
