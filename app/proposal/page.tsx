'use client';

import Link from 'next/link';

export default function ProposalPage() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', background: 'var(--color-bg-mesh)' }}>
      <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', marginBottom: 20, display: 'inline-block' }}>
        ← 메인으로 돌아가기
      </Link>
      
      <div className="card glass-panel" style={{ padding: '40px' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: 20, fontSize: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: 15 }}>
          📄 AI 기반 고객 해지방어 솔루션 기획안
        </h1>

        <div style={{ background: 'rgba(37, 99, 235, 0.1)', borderLeft: '4px solid #2563eb', padding: '15px 20px', borderRadius: '0 8px 8px 0', marginBottom: 30 }}>
          <strong>요약:</strong> 본 기획안은 기존 상담원의 개인 역량에 의존하던 해지방어 프로세스를 데이터 기반의 AI 어시스턴트와 정형화된 전문가 스크립트를 통해 시스템화하여 이탈률을 획기적으로 낮추기 위한 차세대 B2B SaaS 플랫폼 구축을 목적으로 합니다.
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 15, color: '#e2e8f0' }}>1. 솔루션 개요 (Overview)</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: 10 }}>1.1. 솔루션 명칭</h3>
          <p>Data Intelligence PRO - AI 리텐션 코치 플랫폼</p>

          <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: 15 }}>1.2. 도입 배경 및 문제점</h3>
          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li><strong>상담원 역량 편차:</strong> 해지방어 성공률이 상담원 역량에 극심하게 의존함.</li>
            <li><strong>실시간 대응 한계:</strong> 고객의 돌발 불만에 대해 적절한 대안(Offer)을 즉각 제시하기 어려움.</li>
            <li><strong>수동적인 혜택 관리:</strong> 혜택이 체계적이지 않고 남발되거나 누락되는 문제 발생.</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: 15 }}>1.3. 솔루션 목표</h3>
          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li>이탈률(Churn Rate) 최소 <strong>15% 이상 감소</strong></li>
            <li>신입도 상위 10% 수준의 퍼포먼스를 내도록 <strong>실시간 AI 코치</strong> 제공.</li>
            <li>최적의 혜택(리텐션P값, 안심통보 등) <strong>자동 추천</strong>.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 15, color: '#e2e8f0' }}>2. 핵심 기능 (Key Features)</h2>
          
          <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: 10 }}>2.1. 동적 해지방어 스크립트</h3>
          <p style={{ lineHeight: 1.6 }}>고객의 20여 가지 사유(가격, 서비스 등)를 분류해 최적 방어 논리 제공. (전문가 Top 10 기법 고정 배치)</p>

          <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: 15 }}>2.2. 실시간 AI 리텐션 코치</h3>
          <p style={{ lineHeight: 1.6 }}>드래그 가능한 플로팅 위젯. <em>"타사 단점 환기 → 장점 어필 → 타협안"</em>의 실전 대본 즉시 생성.</p>

          <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: 15 }}>2.3. 비용 효율적 혜택(Offer) 추천</h3>
          <div style={{ background: 'var(--color-surface)', padding: '15px', borderRadius: 8, marginTop: 10 }}>
            <strong style={{ color: '#eab308' }}>💡 추천 예시</strong>
            <ul style={{ paddingLeft: 20, marginTop: 10, lineHeight: 1.6 }}>
              <li><strong>보안/혜택 강화:</strong> 안심통보 서비스 무상제공, 감지기(열센서) 추가 설치 제안</li>
              <li><strong>소상공인 부담:</strong> 리텐션P값을 활용한 단계적 요금 할인 최우선 제안</li>
              <li><strong>휴업/이전:</strong> 일시정지 및 최소 요금제 전환 유도</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 15, color: '#e2e8f0' }}>3. 기대 효과 (Expected ROI)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: 10 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <th style={{ padding: '10px 5px', color: '#94a3b8' }}>구분</th>
                <th style={{ padding: '10px 5px', color: '#94a3b8' }}>도입 전</th>
                <th style={{ padding: '10px 5px', color: '#2563eb' }}>도입 후 (기대효과)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px 5px' }}><strong>방어율</strong></td>
                <td style={{ padding: '15px 5px' }}>상담원별 10~40% 편차</td>
                <td style={{ padding: '15px 5px', color: '#60a5fa' }}>평균 35% 이상 상향 평준화</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px 5px' }}><strong>시간</strong></td>
                <td style={{ padding: '15px 5px' }}>대응 상담 평균 8분</td>
                <td style={{ padding: '15px 5px', color: '#60a5fa' }}>평균 5분 이내 단축</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px 5px' }}><strong>비용</strong></td>
                <td style={{ padding: '15px 5px' }}>무분별한 위약금 면제</td>
                <td style={{ padding: '15px 5px', color: '#60a5fa' }}>저비용 고효율 대안 우선 적용</td>
              </tr>
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
}
