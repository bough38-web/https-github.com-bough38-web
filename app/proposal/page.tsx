'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProposalPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', background: 'var(--color-bg-mesh)' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        .animate-fade-in { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }
        .delay-4 { animation-delay: 0.7s; }
        
        .scenario-card { 
          background: rgba(15, 23, 42, 0.6); 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 16px; 
          padding: 24px; 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
        }
        .scenario-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(37,99,235,0.15); 
          border-color: rgba(37,99,235,0.4); 
        }
        
        .chat-bubble {
          padding: 12px 18px;
          border-radius: 18px;
          max-width: 80%;
          margin-bottom: 12px;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
        }
        .chat-customer {
          background: var(--color-surface-hover);
          color: var(--color-text-main);
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        .chat-agent {
          background: #2563eb;
          color: #fff;
          border-bottom-right-radius: 4px;
          align-self: flex-end;
          box-shadow: 0 4px 15px rgba(37,99,235,0.3);
        }
      `}} />

      <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', marginBottom: 20, display: 'inline-block', fontWeight: 600 }}>
        ← 워크스페이스로 돌아가기
      </Link>
      
      <div className="card glass-panel animate-fade-in" style={{ padding: '50px 40px', overflow: 'hidden', position: 'relative' }}>
        {/* BG Decoration */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(15,23,42,0) 70%)', borderRadius: '50%', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20 }}>
            <span style={{ background: '#2563eb', color: '#fff', padding: '6px 12px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1 }}>B2C RETENTION</span>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Data Intelligence PRO</span>
          </div>

          <h1 style={{ color: '#fff', marginBottom: 25, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            고객 접점별 맞춤형<br/><span style={{ color: '#3b82f6' }}>AI 해지방어 시나리오</span> 기획안
          </h1>

          <div style={{ background: 'rgba(37, 99, 235, 0.1)', borderLeft: '4px solid #3b82f6', padding: '20px 25px', borderRadius: '0 12px 12px 0', marginBottom: 50, fontSize: '1.05rem', lineHeight: 1.7, color: '#e2e8f0' }}>
            본 기획안은 B2C 고객의 다양한 해지 사유를 분석하고, 고객과 직접 대면/소통하는 <strong>SP(영업), SE(기술), SG(출동)</strong> 직군별 특성에 맞춘 최적화된 방어 스크립트와 혜택(Offer)을 AI가 실시간으로 코칭하는 시스템 구축안입니다.
          </div>

          <section className="animate-fade-in delay-1" style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: 25, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '2.2rem' }}>🎯</span> 직군별 타겟팅 방어 시나리오
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
              {/* SP Card */}
              <div className="scenario-card">
                <div style={{ fontSize: '2rem', marginBottom: 15 }}>💼</div>
                <h3 style={{ color: '#60a5fa', fontSize: '1.3rem', marginBottom: 10 }}>SP (영업사원)</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: 15, lineHeight: 1.6 }}>요금 불만 및 타사 비교 방어에 특화된 가치 입증 및 비용 분석 스크립트 제공.</p>
                <ul style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <li>리텐션 P값 활용 요금 컨설팅</li>
                  <li>장기 고객 우대 할인 혜택 부각</li>
                  <li>타사 위약금 대납의 함정 안내</li>
                </ul>
              </div>

              {/* SE Card */}
              <div className="scenario-card">
                <div style={{ fontSize: '2rem', marginBottom: 15 }}>🔧</div>
                <h3 style={{ color: '#34d399', fontSize: '1.3rem', marginBottom: 10 }}>SE (기술사원)</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: 15, lineHeight: 1.6 }}>기기 잦은 고장 등 서비스 불만 고객을 위한 하드웨어 무상 업그레이드 제안.</p>
                <ul style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <li>최신형 단말기 무상 교체 제안</li>
                  <li>열센서/자석센서 취약구역 보강</li>
                  <li>A/S 이력 기반 맞춤형 점검 예약</li>
                </ul>
              </div>

              {/* SG Card */}
              <div className="scenario-card">
                <div style={{ fontSize: '2rem', marginBottom: 15 }}>🚓</div>
                <h3 style={{ color: '#fbbf24', fontSize: '1.3rem', marginBottom: 10 }}>SG (출동사원)</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: 15, lineHeight: 1.6 }}>현장 대면의 신뢰감을 바탕으로 한 안심/보안 밀착 케어 서비스 제안.</p>
                <ul style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <li>안심통보 서비스 무상 제공</li>
                  <li>현장 정밀 보안 진단 서비스</li>
                  <li>심야 시간대 특별 순찰 강화 보장</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="animate-fade-in delay-2" style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: 25, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '2.2rem' }}>💬</span> SE(기술사원) 실전 AI 코칭 예시
            </h2>
            
            <div style={{ background: '#0b1120', borderRadius: 20, padding: '30px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ alignSelf: 'center', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', color: '#94a3b8', marginBottom: 10 }}>고객 (서비스 불만 / 잦은 오작동)</div>
              
              <div className="chat-bubble chat-customer">
                "센서가 자꾸 오작동해서 시끄럽고 불편해요. 그냥 해지할게요."
              </div>
              
              <div style={{ alignSelf: 'center', background: 'rgba(37, 99, 235, 0.2)', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', color: '#60a5fa', margin: '15px 0' }}>💡 AI 코치 실시간 분석 및 추천 답변 (SE용)</div>
              
              <div className="chat-bubble chat-agent">
                "고객님, 잦은 오작동으로 많이 불편하셨죠. 정말 죄송합니다. 제가 <strong>SE(기술 담당)</strong>로서 시스템 기록을 확인해보니, 특정 구역의 감지기가 노후화된 것으로 보입니다."
              </div>
              <div className="chat-bubble chat-agent" style={{ animation: 'pulseGlow 2s infinite' }}>
                "해지하시기 전에 마지막으로 기회를 주신다면, <strong>최신형 열/자석 센서로 무상 교체</strong>해 드리고, 오늘 당장 방문해서 <strong>전체 보안 취약점 정밀 진단</strong>을 다시 해드리겠습니다. 비용은 일절 발생하지 않습니다."
              </div>
            </div>
          </section>

          <section className="animate-fade-in delay-3" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: 25, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '2.2rem' }}>📈</span> 직군 맞춤형 도입 기대 효과
            </h2>
            
            <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', borderRadius: 16 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <th style={{ padding: '18px 20px', color: '#94a3b8', fontWeight: 600, width: '20%' }}>직군</th>
                    <th style={{ padding: '18px 20px', color: '#94a3b8', fontWeight: 600, width: '40%' }}>기존 Pain Point</th>
                    <th style={{ padding: '18px 20px', color: '#3b82f6', fontWeight: 600, width: '40%' }}>AI 도입 효과 (Resolution)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '18px 20px', fontWeight: 600, color: '#60a5fa' }}>SP (영업)</td>
                    <td style={{ padding: '18px 20px', color: '#cbd5e1' }}>타사 요금 비교 시 논리적 대응 부족</td>
                    <td style={{ padding: '18px 20px', color: '#f8fafc' }}>실시간 TCO(총소유비용) 비교 스크립트 제공으로 전환율 20% 상승</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '18px 20px', fontWeight: 600, color: '#34d399' }}>SE (기술)</td>
                    <td style={{ padding: '18px 20px', color: '#cbd5e1' }}>하드웨어/서비스 불만에 단순 사과로 일관</td>
                    <td style={{ padding: '18px 20px', color: '#f8fafc' }}>센서/기기 업그레이드 등 구체적 대안 적시 제시로 이탈 35% 방어</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '18px 20px', fontWeight: 600, color: '#fbbf24' }}>SG (출동)</td>
                    <td style={{ padding: '18px 20px', color: '#cbd5e1' }}>현장에서의 즉각적인 혜택 부여 권한/정보 부족</td>
                    <td style={{ padding: '18px 20px', color: '#f8fafc' }}>모바일 챗봇으로 즉시 '안심통보' 무상 혜택 결재 및 제안 가능</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
