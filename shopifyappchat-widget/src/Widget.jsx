import React from 'react';
import { useChat } from './hooks/useChat';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';

export default function Widget() {
  const {
    isOpen,
    toggleChat,
    messages,
    sendMessage,
    loading,
    error,
    sending
  } = useChat();

  return (
    <div className="sac-widget">
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSend={sendMessage}
          onClose={toggleChat}
          loading={loading}
          error={error}
          sending={sending}
        />
      )}
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
}
