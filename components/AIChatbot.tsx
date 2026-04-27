'use client';

import { useState, useRef, useEffect } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: -1, y: 20 }); // -1 for initial right-aligned
  const [buttonPosition, setButtonPosition] = useState({ x: -1, y: 80 }); // Top 80, Right 30 to not cover theme buttons
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const buttonDragRef = useRef({ isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0, hasMoved: false });
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Chat Window Drag
      if (dragRef.current.isDragging) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setPosition({
          x: dragRef.current.initialX + dx,
          y: dragRef.current.initialY + dy
        });
      }
      
      // Button Drag
      if (buttonDragRef.current.isDragging) {
        const dx = e.clientX - buttonDragRef.current.startX;
        const dy = e.clientY - buttonDragRef.current.startY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          buttonDragRef.current.hasMoved = true;
        }
        setButtonPosition({
          x: buttonDragRef.current.initialX + dx,
          y: buttonDragRef.current.initialY + dy
        });
      }
    };
    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
      buttonDragRef.current.isDragging = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        const errorData = await res.json().catch(() => ({ error: 'API 서버 통신 오류' }));
        throw new Error(errorData.error || `HTTP ${res.status} Error`);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `🚨 챗봇 오류 발생 🚨\n\n[상세 내용]: ${error.message}\n\n👉 해결 가이드:\n1. 로컬 환경: .env.local 파일에 키가 올바른지 확인하고 터미널에서 npm run dev 재시작\n2. Vercel 환경: 대시보드 Settings > Environment Variables에 OPENAI_API_KEY 등록 확인 및 재배포\n3. 공통: OpenAI 사이트에서 카드가 정상 등록되어 과금 가능한 상태인지(결제 정보) 확인하세요.` 
      }]);
    }
    
    setIsLoading(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x === -1 ? window.innerWidth - 380 : position.x,
      initialY: position.y
    };
  };

  const handleButtonMouseDown = (e: React.MouseEvent) => {
    buttonDragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: buttonPosition.x === -1 ? window.innerWidth - 90 : buttonPosition.x,
      initialY: buttonPosition.y,
      hasMoved: false
    };
  };

  return (
    <>
      <button 
        onClick={() => {
          if (!buttonDragRef.current.hasMoved) setIsOpen(true);
        }}
        onMouseDown={handleButtonMouseDown}
        style={{
          position: 'fixed', 
          top: buttonPosition.y, 
          left: buttonPosition.x !== -1 ? buttonPosition.x : undefined,
          right: buttonPosition.x === -1 ? 30 : undefined,
          width: 60, height: 60,
          borderRadius: '50%', background: '#2563eb', color: '#fff',
          border: 'none', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
          fontSize: '28px', cursor: 'grab', zIndex: 1000,
          display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
          transition: buttonDragRef.current.isDragging ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.6)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)'; }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', 
          top: position.y, 
          left: position.x !== -1 ? position.x : undefined,
          right: position.x === -1 ? 30 : undefined,
          width: '350px', height: '600px',
          background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', 
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 10000
        }}>
          <div 
            onMouseDown={handleMouseDown}
            style={{ background: 'rgba(15, 23, 42, 0.95)', color: '#fff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'grab' }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', pointerEvents: 'none' }}>🤖 AI 리텐션 코치</h3>
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
      )}
    </>
  );
}
