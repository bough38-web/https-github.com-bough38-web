'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  sender: 'field' | 'admin' | 'system';
  senderName: string;
  content: string;
  timestamp: string;
};

export default function FieldMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages on mount
  useEffect(() => {
    fetchMessages();
    
    // Polling for "real-time" feel (every 5 seconds)
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'field',
      senderName: '현장직원',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userMsg)
      });

      if (res.ok) {
        // Mock Admin Response logic for demonstration
        if (userMsg.content.includes('질문') || userMsg.content.includes('문의')) {
          setTimeout(async () => {
            const adminReply: Message = {
              id: (Date.now() + 1).toString(),
              sender: 'admin',
              senderName: '본사 관리자',
              content: '문의하신 내용 확인했습니다. 담당 부서 확인 후 답변 드리겠습니다.',
              timestamp: new Date().toISOString()
            };
            await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(adminReply)
            });
            fetchMessages();
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Failed to send message', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 30,
          left: 30,
          width: 65,
          height: 65,
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #fef01b 0%, #f7e600 100%)', // Kakao-like Yellow
          color: '#3c1e1e',
          border: 'none',
          boxShadow: '0 8px 24px rgba(247, 230, 0, 0.3)',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 999,
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
      >
        💬
        <span style={{ 
          position: 'absolute', top: -5, right: -5, 
          background: '#ff4d4f', color: '#fff', 
          fontSize: '12px', padding: '2px 6px', 
          borderRadius: '10px', fontWeight: 'bold',
          border: '2px solid #fff'
        }}>NEW</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 30,
          left: 30,
          width: '380px',
          height: '600px',
          background: '#abc1d1', // Classic Kakao Chat Background
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10001,
          animation: 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(30px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}} />

          {/* Header */}
          <div style={{ 
            background: '#abc1d1', 
            padding: '15px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            color: '#1e1e1e'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>현장직원 소통방 🤝</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'transparent', border: 'none', color: '#1e1e1e', cursor: 'pointer', fontSize: '1.4rem' }}
            >✕</button>
          </div>

          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            padding: '20px 15px', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 15 
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#556677', marginTop: '40%', fontSize: '0.9rem' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>👋</div>
                현장 업무 중 궁금한 점을 남겨주세요.<br/>관리자가 실시간으로 답변해 드립니다.
              </div>
            )}
            
            {messages.map((m) => {
              const isMine = m.sender === 'field';
              return (
                <div key={m.id} style={{ 
                  alignSelf: isMine ? 'flex-end' : 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMine ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}>
                  {!isMine && <span style={{ fontSize: '12px', color: '#445566', marginBottom: '4px', marginLeft: '4px' }}>{m.senderName}</span>}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '5px',
                    flexDirection: isMine ? 'row-reverse' : 'row'
                  }}>
                    <div style={{ 
                      background: isMine ? '#fee500' : '#fff',
                      color: '#1e1e1e',
                      padding: '10px 14px',
                      borderRadius: isMine ? '15px 0px 15px 15px' : '0px 15px 15px 15px',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      position: 'relative'
                    }}>
                      {m.content}
                    </div>
                    <span style={{ fontSize: '10px', color: '#667788', whiteSpace: 'nowrap' }}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ 
            padding: '15px', 
            background: '#fff', 
            display: 'flex', 
            gap: 10,
            alignItems: 'center'
          }}>
            <textarea 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="메시지 입력..."
              rows={1}
              style={{ 
                flex: 1, 
                padding: '10px 14px', 
                borderRadius: '20px', 
                border: '1px solid #e0e0e0', 
                fontSize: '0.95rem',
                resize: 'none',
                background: '#f8f8f8',
                maxHeight: '100px'
              }}
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim()}
              style={{ 
                background: input.trim() ? '#fee500' : '#f0f0f0', 
                color: '#1e1e1e',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 16px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
}
