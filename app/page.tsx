'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import StrategyCard from '@/components/StrategyCard';
import CustomerTypeCard from '@/components/CustomerTypeCard';
import PolicyGuide from '@/components/PolicyGuide';
import AIChatbot from '@/components/AIChatbot';
import FieldMessenger from '@/components/FieldMessenger';
import ScrollNav from '@/components/ScrollNav';
import { ScriptItem, CustomerType, Notice } from '@/types';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('전체');
  const [type, setType] = useState('전체');
  const [isTop10Mode, setIsTop10Mode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [theme, setTheme] = useState('premium'); // premium, cozy, clean, contrast

  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // 테마 변경 시 HTML body에 data-theme 속성 부여
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [scriptsRes, customerTypesRes, noticesRes] = await Promise.all([
          fetch('/api/scripts'),
          fetch('/api/customerTypes'),
          fetch('/api/notices')
        ]);
        const scriptsData = await scriptsRes.json();
        const customerTypesData = await customerTypesRes.json();
        const noticesData = await noticesRes.json();
        setScripts(scriptsData);
        setCustomerTypes(customerTypesData);
        setNotices(noticesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleListen = () => {
    if (isListening) return;
    
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저에서는 음성 인식을 지원하지 않습니다. 크롬을 사용해주세요.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const categories = useMemo(() => {
    return ['전체', ...Array.from(new Set(scripts.map((item) => item.category)))];
  }, [scripts]);

  const types = useMemo(() => {
    return ['전체', ...Array.from(new Set(scripts.map((item) => item.customerType)))];
  }, [scripts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = scripts.filter((item) => {
      const text = [item.category, item.customerType, item.situation, item.goal, item.script, ...item.strategy, ...item.offer, ...item.caution]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !q || text.includes(q);
      const matchesCategory = category === '전체' || item.category === category;
      const matchesType = type === '전체' || item.customerType === type;
      return matchesQuery && matchesCategory && matchesType;
    });

    if (isTop10Mode) {
      // Demo logic: Just grab the first 10 scripts or specific ones as "Top 10"
      result = result.slice(0, 10);
    }

    return result;
  }, [query, category, type, isTop10Mode, scripts]);

  // Log searches (debounced)
  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => {
      fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify({
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          action: 'search',
          keyword: query
        })
      }).catch(() => {});
    }, 1500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleGlobalFeedback = () => {
    const text = prompt('어떤 점을 보완하거나 추가하면 좋을까요? 자유롭게 의견을 남겨주세요!');
    if (text) {
      fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          id: Date.now().toString(),
          type: '보완요청',
          text,
          date: new Date().toISOString()
        })
      }).then(() => alert('소중한 의견 감사합니다! 관리자에게 전달되었습니다.'));
    }
  };

  if (isLoading) {
    return (
      <main>
        <section className="hero">
          <h1>고객해지방어 Q&A</h1>
          <p>데이터를 불러오는 중입니다...</p>
        </section>
      </main>
    );
  }

  const handleLogin = () => {
    if (password === '3867') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('암호가 일치하지 않습니다.');
    }
  };

  if (!isAuthenticated) {
    return (
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--color-bg)' }}>
        <div style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: '18px', padding: '40px', boxShadow: '0 10px 28px rgba(0,0,0,.06)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', marginBottom: '10px', color: 'var(--color-text-main)' }}>보안 로그인</h1>
          <p style={{ marginBottom: '20px', fontSize: '14px', color: 'var(--color-text-muted)' }}>문서를 열람하려면 암호를 입력하세요.</p>
          <input 
            type="password" 
            placeholder="암호 입력" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            style={{ 
              padding: '12px', 
              border: '1px solid var(--color-border)', 
              borderRadius: '8px', 
              width: '100%', 
              fontSize: '16px', 
              marginBottom: '10px', 
              outline: 'none', 
              boxSizing: 'border-box',
              background: 'var(--color-bg)',
              color: 'var(--color-text-main)'
            }}
          />
          {errorMsg && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '15px', marginTop: '0' }}>{errorMsg}</p>}
          <button 
            onClick={handleLogin}
            style={{ 
              padding: '12px', 
              background: 'var(--color-primary)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              width: '100%', 
              fontSize: '16px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              transition: 'all 0.2s ease' 
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            로그인
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="theme-selector">
        <button className={`theme-btn ${theme === 'premium' ? 'active' : ''}`} onClick={() => setTheme('premium')} style={{ background: '#0f172a' }} title="프리미엄 다크"></button>
        <button className={`theme-btn ${theme === 'cozy' ? 'active' : ''}`} onClick={() => setTheme('cozy')} style={{ background: '#f5eedc' }} title="편안한 스타일"></button>
        <button className={`theme-btn ${theme === 'clean' ? 'active' : ''}`} onClick={() => setTheme('clean')} style={{ background: '#ffffff' }} title="깔끔한 스타일"></button>
        <button className={`theme-btn ${theme === 'contrast' ? 'active' : ''}`} onClick={() => setTheme('contrast')} style={{ background: '#000', borderRadius: 0 }} title="텍스트 고대비 강조"></button>
      </div>

      {notices.filter(n => n.active).map(notice => (
        <div key={notice.id} className="notice-banner">
          <div>
            <h3 className="notice-title">✨ {notice.title}</h3>
            <p className="notice-desc">{notice.content}</p>
          </div>
          <small style={{ opacity: 0.7, whiteSpace: 'nowrap' }}>{notice.date}</small>
        </div>
      ))}

      <PolicyGuide />

      <section className="hero">
        <h1>고객해지방어 Q&A</h1>
        <p>
          고객 해지 요청을 받았을 때 바로 활용할 수 있는 리텐션 전략, 현장 스크립트,
          고객 유형별 심리 분석을 제공합니다. (모바일, 태블릿 완벽 지원)
        </p>
        {/* 임시 숨김 처리: 해지율 분석 통계 및 제안서 버튼
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Link href="/analysis" className="btn-primary" style={{ background: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 실시간 해지율 분석 통계
          </Link>
          <Link href="/report" className="btn-primary" style={{ background: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📄 도입 제안서 보기
          </Link>
        </div>
        */}
      </section>

      <section className="toolbar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="예: 비싸다, 타사, 위약금, 출동, 폐업"
        />
        <button 
          onClick={toggleListen}
          style={{
            background: isListening ? 'rgba(239, 68, 68, 0.2)' : 'var(--color-badge-bg)',
            border: `1px solid ${isListening ? '#ef4444' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)',
            color: isListening ? '#ef4444' : 'var(--color-text-main)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}
          title="음성 검색"
        >
          {isListening ? '🎙️' : '🎤'}
        </button>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </section>

      <p className="small" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>검색 결과: {filtered.length}개</span>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: isTop10Mode ? 'rgba(234, 179, 8, 0.2)' : 'transparent', padding: '4px 10px', borderRadius: 20, border: `1px solid ${isTop10Mode ? '#eab308' : 'var(--color-border)'}` }}>
          <input type="checkbox" checked={isTop10Mode} onChange={e => setIsTop10Mode(e.target.checked)} style={{ margin: 0 }} />
          👑 전문가 Top 10 기법
        </label>
      </p>
      <section className="grid">
        {filtered.map((item) => <StrategyCard key={item.id} item={item} isTop10={isTop10Mode} />)}
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>고객 유형별 심리 분석 + 대응 전략</h2>
        <div className="type-grid">
          {customerTypes.map((item) => <CustomerTypeCard key={item.name} item={item} />)}
        </div>
      </section>
      <section style={{ marginTop: 36, textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 24, paddingBottom: 60 }}>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>시스템 사용 중 불편한 점이나 추가하고 싶은 스크립트가 있나요?</p>
        <button onClick={handleGlobalFeedback} className="btn-primary" style={{ background: '#475569' }}>
          💡 더 보완해주세요 / 추가해주세요
        </button>
      </section>

      <AIChatbot />
      <FieldMessenger />
      <ScrollNav />
    </main>
  );
}
