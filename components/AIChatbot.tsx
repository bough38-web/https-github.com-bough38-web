'use client';

import { useState, useRef, useEffect } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetch('/api/chatbot')
        .then(res => res.json())
        .then(data => {
          setMessages([{ role: 'assistant', content: data.greeting || '안녕하세요! 무엇을 도와드릴까요?' }]);
        })
        .catch(() => {
          setMessages([{ role: 'assistant', content: '안녕하세요! 고객 해지방어 전담 AI 어시스턴트입니다.\n어떤 상황의 고객을 응대하고 계신가요?' }]);
        });
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Try to call the real AI route (we'll create this next)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      // 2. Fallback if API fails or no key
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '죄송합니다. 현재 AI 서버와 연결할 수 없습니다. (API Key 확인 필요)\n임시 답변: 고객의 불만사항에 대해 우선 공감하시고, [경제적 사정]이 이유라면 30만원 미만 구간의 "할인율 30%" 제안을 검토해 보세요.' 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 30, right: 30, width: 60, height: 60,
          borderRadius: '50%', background: '#2563eb', color: '#fff',
          border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: '24px', cursor: 'pointer', zIndex: 1000,
          display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0, 0, 0, 0.6)', zIndex: 10000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={() => setIsOpen(false)}>
          
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%', maxWidth: '450px', height: '80vh', maxHeight: '700px',
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
          >
            <div style={{ background: '#0f172a', color: '#fff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>🤖 AI 리텐션 코치</h3>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>
            
            <div style={{ flex: 1, padding: 15, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ 
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? '#2563eb' : 'var(--color-surface-hover)',
                  color: m.role === 'user' ? '#fff' : 'var(--color-text-main)',
                  padding: '10px 14px', borderRadius: 12, maxWidth: '85%',
                  whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.5
                }}>
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--color-surface-hover)', padding: '10px 14px', borderRadius: 12, fontSize: '0.9rem' }}>
                  AI가 답변을 생성중입니다... 💭
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: 15, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 8, background: 'var(--color-surface)' }}>
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="상황이나 질문을 입력하세요..."
                style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
              />
              <button onClick={handleSend} className="btn-primary" style={{ padding: '0 20px', background: '#2563eb', fontWeight: 'bold' }}>전송</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
