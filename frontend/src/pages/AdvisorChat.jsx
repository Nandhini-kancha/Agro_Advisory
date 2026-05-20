import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../api';

export default function AdvisorChat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AgroAdviser. Where is your farm located and what crop are you currently growing?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setLoading(true);

    try {
      // In a real app, you would format the history properly for the API
      const history = messages.map(m => ({ role: m.sender, content: m.text }));
      const response = await sendChatMessage(userMessage, history);
      
      setMessages(prev => [...prev, { text: response.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I am having trouble connecting to the server.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in glass-panel" style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <h2>Fertilizer Advisor Chat</h2>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', padding: '1rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.5)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === 'bot' ? 'left' : 'right', marginBottom: '1rem' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '0.8rem 1.2rem', 
              borderRadius: '16px', 
              background: m.sender === 'bot' ? 'white' : 'var(--color-leaf-green)', 
              color: m.sender === 'bot' ? 'var(--color-soil-dark)' : 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              maxWidth: '80%',
              wordWrap: 'break-word',
              textAlign: 'left'
            }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', padding: '0.8rem 1.2rem', borderRadius: '16px', background: 'white', color: 'var(--color-soil-dark)', fontStyle: 'italic' }}>
              Typing...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          placeholder="Type your answer here..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} 
        />
        <button className="btn-primary" onClick={handleSend} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
