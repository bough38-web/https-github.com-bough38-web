'use client';

import { useState, useEffect } from 'react';
import { ScriptItem } from '@/types';

export default function StrategyCard({ item, isTop10 }: { item: ScriptItem, isTop10?: boolean }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<{id: string, text: string, date: string}[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    // Fetch interactions for this specific card
    fetch('/api/interactions')
      .then(res => res.json())
      .then(data => {
        if (data[item.id]) {
          setLikes(data[item.id].likes || 0);
          setComments(data[item.id].comments || []);
        }
      });
  }, [item.id]);

  const updateServer = async (newLikes: number, newComments: any[]) => {
    try {
      const res = await fetch('/api/interactions');
      const data = await res.json();
      data[item.id] = { likes: newLikes, comments: newComments };
      await fetch('/api/interactions', { method: 'POST', body: JSON.stringify(data) });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = () => {
    const nextLikes = likes + 1;
    setLikes(nextLikes);
    updateServer(nextLikes, comments);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newC = { id: Date.now().toString(), text: newComment, date: new Date().toISOString() };
    const nextComments = [...comments, newC];
    setComments(nextComments);
    setNewComment('');
    updateServer(likes, nextComments);
  };

  return (
    <article className="card" style={isTop10 ? { border: '2px solid #eab308', boxShadow: '0 4px 15px rgba(234, 179, 8, 0.2)' } : {}}>
      {isTop10 && <div style={{ color: '#eab308', fontWeight: 'bold', marginBottom: 8 }}>👑 Top 10 우수 기법</div>}
      <h2>{item.situation}</h2>
      <div className="badges">
        <span className="badge">{item.category}</span>
        <span className="badge">{item.customerType}</span>
      </div>
      <p className="small"><b>목표:</b> {item.goal}</p>

      <div className="section-title">대응 전략</div>
      <ul>{item.strategy.map((s) => <li key={s}>{s}</li>)}</ul>

      <div className="section-title">현장 스크립트</div>
      <div className="script">{item.script}</div>

      <div className="section-title">제안 가능 옵션</div>
      <ul>{item.offer.map((s) => <li key={s}>{s}</li>)}</ul>

      <div className="section-title">주의사항</div>
      <ul>{item.caution.map((s) => <li key={s}>{s}</li>)}</ul>

      <hr style={{ margin: '20px 0', borderColor: 'var(--color-border)' }} />
      
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={handleLike} className="btn-primary" style={{ background: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '6px 12px' }}>
          👍 좋아요 {likes}
        </button>
        <button onClick={() => setIsInteracting(!isInteracting)} className="btn-primary" style={{ background: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '6px 12px' }}>
          💬 질문/댓글 ({comments.length})
        </button>
      </div>

      {isInteracting && (
        <div style={{ background: 'var(--color-surface-hover)', padding: 12, borderRadius: 8 }}>
          {comments.map(c => (
            <div key={c.id} style={{ marginBottom: 8, fontSize: '0.9rem', borderBottom: '1px solid var(--color-border)', paddingBottom: 4 }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginRight: 8 }}>{new Date(c.date).toLocaleDateString()}</span>
              <div style={{ marginTop: 4 }}>
                {c.text.split('\n').map((line, idx) => (
                  <div key={idx} style={{ 
                    fontWeight: line.startsWith('[관리자]') ? 'bold' : 'normal',
                    color: line.startsWith('[관리자]') ? '#2563eb' : 'inherit',
                    paddingLeft: line.startsWith('[관리자]') ? 8 : 0,
                    borderLeft: line.startsWith('[관리자]') ? '2px solid #2563eb' : 'none',
                    marginTop: line.startsWith('[관리자]') ? 4 : 0
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input 
              type="text" 
              placeholder="이럴 땐 어떻게 해요? 질문이나 의견을 남겨주세요" 
              value={newComment} 
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddComment()}
              style={{ flex: 1, padding: '6px 10px', fontSize: '0.9rem' }}
            />
            <button onClick={handleAddComment} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>등록</button>
          </div>
        </div>
      )}
    </article>
  );
}
