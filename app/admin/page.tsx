'use client';

import { useState, useEffect } from 'react';
import { ScriptItem, CustomerType, Notice, PolicyData, LogEntry, GlobalFeedback, Interaction } from '@/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'notices' | 'scripts' | 'customerTypes' | 'policy' | 'logs' | 'chatbot'>('notices');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [feedback, setFeedback] = useState<GlobalFeedback[]>([]);
  const [interactions, setInteractions] = useState<Record<string, Interaction>>({});
  const [chatbotSettings, setChatbotSettings] = useState<{ greeting: string, systemPrompt: string }>({ greeting: '', systemPrompt: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    async function loadData() {
      const [nRes, sRes, cRes, pRes, lRes, fRes, iRes, chatRes] = await Promise.all([
        fetch('/api/notices'), fetch('/api/scripts'), fetch('/api/customerTypes'), fetch('/api/policy'), fetch('/api/logs'), fetch('/api/feedback'), fetch('/api/interactions'), fetch('/api/chatbot')
      ]);
      setNotices(await nRes.json());
      setScripts(await sRes.json());
      setCustomerTypes(await cRes.json());
      setPolicy(await pRes.json());
      setLogs(await lRes.json());
      setFeedback(await fRes.json());
      setInteractions(await iRes.json());
      setChatbotSettings(await chatRes.json());
      setIsLoading(false);
    }
    loadData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234!!') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  const saveNotices = async () => {
    await fetch('/api/notices', { method: 'POST', body: JSON.stringify(notices) });
    alert('공지사항이 저장되었습니다.');
  };

  const saveScripts = async () => {
    await fetch('/api/scripts', { method: 'POST', body: JSON.stringify(scripts) });
    alert('스크립트가 저장되었습니다.');
  };

  const saveCustomerTypes = async () => {
    await fetch('/api/customerTypes', { method: 'POST', body: JSON.stringify(customerTypes) });
    alert('고객 유형이 저장되었습니다.');
  };

  const savePolicy = async () => {
    await fetch('/api/policy', { method: 'POST', body: JSON.stringify(policy) });
    alert('정책안내 기준이 저장되었습니다.');
  };

  const saveChatbotSettings = async () => {
    await fetch('/api/chatbot', { method: 'POST', body: JSON.stringify(chatbotSettings) });
    alert('챗봇 설정이 저장되었습니다.');
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('이 피드백을 삭제하시겠습니까?')) return;
    const newFeedback = feedback.filter(f => f.id !== id);
    await fetch('/api/feedback', { method: 'PUT', body: JSON.stringify(newFeedback) });
    setFeedback(newFeedback);
  };

  const deleteComment = async (scriptId: string, commentId: string) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;
    const newInteractions = { ...interactions };
    if (newInteractions[scriptId]) {
      newInteractions[scriptId].comments = newInteractions[scriptId].comments.filter(c => c.id !== commentId);
      await fetch('/api/interactions', { method: 'POST', body: JSON.stringify(newInteractions) });
      setInteractions(newInteractions);
    }
  };

  const replyToComment = async (scriptId: string, commentId: string) => {
    const replyText = prompt('관리자 답글을 입력하세요:');
    if (!replyText) return;
    const newInteractions = { ...interactions };
    if (newInteractions[scriptId]) {
      const commentIndex = newInteractions[scriptId].comments.findIndex(c => c.id === commentId);
      if (commentIndex > -1) {
        newInteractions[scriptId].comments[commentIndex].text += `\n[관리자] ${replyText}`;
        await fetch('/api/interactions', { method: 'POST', body: JSON.stringify(newInteractions) });
        setInteractions(newInteractions);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleLogin} className="card" style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 24 }}>관리자 로그인</h2>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="비밀번호를 입력하세요" 
            style={{ marginBottom: 16 }}
          />
          {errorMsg && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: 0, marginBottom: 16 }}>{errorMsg}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>접속하기</button>
        </form>
      </main>
    );
  }

  if (isLoading) return <main><p>데이터를 불러오는 중...</p></main>;

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>관리자 대시보드</h1>
        <a href="/report" className="btn-primary" style={{ background: '#2563eb', textDecoration: 'none' }}>📊 임원 보고서 보기</a>
      </div>
      <div className="toolbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
        <button className="btn-primary" onClick={() => setActiveTab('notices')} style={{ opacity: activeTab === 'notices' ? 1 : 0.6, whiteSpace: 'nowrap' }}>공지사항</button>
        <button className="btn-primary" onClick={() => setActiveTab('scripts')} style={{ opacity: activeTab === 'scripts' ? 1 : 0.6, whiteSpace: 'nowrap' }}>스크립트</button>
        <button className="btn-primary" onClick={() => setActiveTab('customerTypes')} style={{ opacity: activeTab === 'customerTypes' ? 1 : 0.6, whiteSpace: 'nowrap' }}>고객 유형</button>
        <button className="btn-primary" onClick={() => setActiveTab('policy')} style={{ opacity: activeTab === 'policy' ? 1 : 0.6, whiteSpace: 'nowrap' }}>정책안내</button>
        <button className="btn-primary" onClick={() => setActiveTab('logs')} style={{ opacity: activeTab === 'logs' ? 1 : 0.6, whiteSpace: 'nowrap' }}>통계/피드백</button>
        <button className="btn-primary" onClick={() => setActiveTab('chatbot')} style={{ opacity: activeTab === 'chatbot' ? 1 : 0.6, whiteSpace: 'nowrap', background: '#eab308' }}>🤖 챗봇 관리</button>
        <a href="/" style={{ marginLeft: 'auto', alignSelf: 'center', color: '#93c5fd', textDecoration: 'none', whiteSpace: 'nowrap' }}>메인으로 ➔</a>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        {activeTab === 'notices' && (
          <section>
            <h2>공지사항 편집 (JSON)</h2>
            <textarea 
              style={{ height: 400 }}
              value={JSON.stringify(notices, null, 2)}
              onChange={(e) => {
                try { setNotices(JSON.parse(e.target.value)); } catch (err) {}
              }}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={saveNotices} className="btn-primary">저장하기</button>
            </div>
          </section>
        )}

        {activeTab === 'scripts' && (
          <section>
            <h2>스크립트 편집 (JSON)</h2>
            <textarea 
              style={{ height: 600 }}
              value={JSON.stringify(scripts, null, 2)}
              onChange={(e) => {
                try { setScripts(JSON.parse(e.target.value)); } catch (err) {}
              }}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={saveScripts} className="btn-primary">저장하기</button>
            </div>
          </section>
        )}

        {activeTab === 'customerTypes' && (
          <section>
            <h2>고객 유형 편집 (JSON)</h2>
            <textarea 
              style={{ height: 600 }}
              value={JSON.stringify(customerTypes, null, 2)}
              onChange={(e) => {
                try { setCustomerTypes(JSON.parse(e.target.value)); } catch (err) {}
              }}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={saveCustomerTypes} className="btn-primary">저장하기</button>
            </div>
          </section>
        )}

        {activeTab === 'policy' && policy && (
          <section>
            <h2>정책안내(승인기준) 편집 (JSON)</h2>
            <textarea 
              style={{ height: 600 }}
              value={JSON.stringify(policy, null, 2)}
              onChange={(e) => {
                try { setPolicy(JSON.parse(e.target.value)); } catch (err) {}
              }}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={savePolicy} className="btn-primary">저장하기</button>
            </div>
          </section>
        )}

        {activeTab === 'logs' && (
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--color-surface-hover)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ marginTop: 0, borderBottom: '2px solid #2563eb', paddingBottom: '8px', display: 'inline-block' }}>📈 가장 많이 검색된 키워드 (Top 5)</h3>
                <div style={{ marginTop: '16px' }}>
                  {(() => {
                    const kwCount: Record<string, number> = {};
                    logs.forEach(l => { if (l.keyword && l.action === 'search') kwCount[l.keyword] = (kwCount[l.keyword] || 0) + 1; });
                    const topKws = Object.entries(kwCount).sort((a,b) => b[1] - a[1]).slice(0, 5);
                    const maxCount = topKws[0]?.[1] || 1;
                    return topKws.length === 0 ? <p>데이터가 없습니다.</p> : topKws.map(([kw, count], idx) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px' }}>
                          <span>{kw}</span><span>{count}회</span>
                        </div>
                        <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '4px', height: '12px', overflow: 'hidden' }}>
                          <div style={{ width: `${(count / maxCount) * 100}%`, background: '#2563eb', height: '100%' }}></div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div style={{ background: 'var(--color-surface-hover)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ marginTop: 0, borderBottom: '2px solid #eab308', paddingBottom: '8px', display: 'inline-block' }}>👍 가장 인기있는 스크립트 (Top 5)</h3>
                <div style={{ marginTop: '16px' }}>
                  {(() => {
                    const topLiked = Object.entries(interactions).map(([id, data]) => ({ id, likes: data.likes || 0 })).sort((a,b) => b.likes - a.likes).slice(0, 5);
                    const maxLikes = topLiked[0]?.likes || 1;
                    return topLiked.length === 0 ? <p>데이터가 없습니다.</p> : topLiked.map((item, idx) => {
                      const script = scripts.find(s => s.id === item.id);
                      const title = script ? script.situation : `스크립트 ${item.id}`;
                      return (
                        <div key={idx} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span title={title} style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80%' }}>{title}</span><span>{item.likes}👍</span>
                          </div>
                          <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '4px', height: '12px', overflow: 'hidden' }}>
                            <div style={{ width: `${(item.likes / maxLikes) * 100}%`, background: '#eab308', height: '100%' }}></div>
                          </div>
                        </div>
                      )
                    });
                  })()}
                </div>
              </div>
            </div>

            <h2>💬 실시간 현장 질문/댓글 관리</h2>
            <div style={{ background: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, marginBottom: 32, maxHeight: 400, overflowY: 'auto' }}>
              {(() => {
                const allComments = Object.entries(interactions).flatMap(([scriptId, data]) => 
                  (data.comments || []).map(c => ({ ...c, scriptId }))
                ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                
                return allComments.length === 0 ? <p>등록된 댓글이 없습니다.</p> : allComments.map((c, i) => {
                  const script = scripts.find(s => s.id === c.scriptId);
                  return (
                    <div key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                        <span className="badge" style={{ padding: '2px 6px', fontSize: '0.7rem', marginRight: 6 }}>{script?.category}</span>
                        {script?.situation || c.scriptId} - {new Date(c.date).toLocaleString()}
                      </div>
                      <p style={{ margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{c.text}</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => replyToComment(c.scriptId, c.id)} className="btn-primary" style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#475569' }}>관리자 답글</button>
                        <button onClick={() => deleteComment(c.scriptId, c.id)} className="btn-primary" style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#ef4444' }}>삭제</button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            <h2>💡 피드백 건의사항</h2>
            <div style={{ background: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, marginBottom: 32, maxHeight: 300, overflowY: 'auto' }}>
              {feedback.length === 0 ? <p>접수된 피드백이 없습니다.</p> : feedback.map((f, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge" style={{ marginRight: 8 }}>{f.type}</span>
                      <small style={{ color: 'var(--color-text-muted)' }}>{new Date(f.date).toLocaleString()}</small>
                    </div>
                    <button onClick={() => deleteFeedback(f.id)} className="btn-primary" style={{ padding: '4px 8px', fontSize: '0.8rem', background: '#ef4444' }}>삭제/해결</button>
                  </div>
                  <p style={{ margin: '8px 0 0 0' }}>{f.text}</p>
                </div>
              ))}
            </div>

            <h2>🔍 최근 사용 로그 (검색 기록 등)</h2>
            <div style={{ background: 'var(--color-surface-hover)', padding: 16, borderRadius: 8, maxHeight: 400, overflowY: 'auto' }}>
              {logs.length === 0 ? <p>로그가 없습니다.</p> : logs.map((l, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 4, marginBottom: 4, fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', marginRight: 16 }}>{new Date(l.timestamp).toLocaleString()}</span>
                  <strong style={{ color: 'var(--color-primary)' }}>[{l.action}]</strong> 
                  {l.keyword && <span> 검색어: '{l.keyword}'</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'chatbot' && (
          <section>
            <h2 style={{ borderBottom: '2px solid #eab308', paddingBottom: '8px', display: 'inline-block' }}>🤖 AI 챗봇 컨트롤 센터</h2>
            
            <div style={{ marginTop: '24px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>기본 인사말 (채팅창 처음에 뜨는 메시지)</label>
              <textarea 
                style={{ height: 100, fontSize: '1rem', padding: '12px', width: '100%' }}
                value={chatbotSettings.greeting}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, greeting: e.target.value })}
              />
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>시스템 프롬프트 (AI의 성격 및 규칙 지정)</label>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>* 이 텍스트는 챗봇 화면에 보이지 않지만, AI가 어떻게 행동할지 지시하는 중요한 명령어입니다.</p>
              <textarea 
                style={{ height: 150, fontSize: '0.95rem', padding: '12px', width: '100%', fontFamily: 'monospace', background: '#1e293b', color: '#f8fafc' }}
                value={chatbotSettings.systemPrompt}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, systemPrompt: e.target.value })}
              />
            </div>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button onClick={saveChatbotSettings} className="btn-primary" style={{ background: '#eab308', color: '#0f172a' }}>챗봇 설정 저장하기</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
