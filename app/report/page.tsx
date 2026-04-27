'use client';

import React from 'react';

export default function ReportPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: '40px' }} className="report-container">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print { display: none !important; }
          body, main { background: #fff !important; color: #000 !important; }
          @page { size: A4; margin: 20mm; }
        }
        .report-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 40px; }
        .report-title { font-size: 2.5rem; color: #0f172a; margin-bottom: 10px; font-weight: 800; }
        .report-section { margin-bottom: 40px; }
        .report-section h2 { color: #2563eb; border-left: 4px solid #2563eb; padding-left: 10px; margin-bottom: 20px; }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .stat-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-num { font-size: 2rem; font-weight: bold; color: #0f172a; }
        .stat-label { font-size: 1rem; color: #64748b; }
      `}} />

      <div className="no-print" style={{ textAlign: 'right', marginBottom: 20 }}>
        <button onClick={handlePrint} className="btn-primary" style={{ marginRight: 10 }}>PDF / 인쇄하기</button>
        <button onClick={() => window.location.href='/admin'} className="btn-primary" style={{ background: '#64748b' }}>돌아가기</button>
      </div>

      <div className="report-header">
        <h1 className="report-title">Data Intel PRO: 고객 해지방어 시스템 도입 제안서</h1>
        <p style={{ fontSize: '1.2rem', color: '#475569' }}>영업사원 실시간 대응 역량 강화 및 해지율 감소 솔루션</p>
      </div>

      <section className="report-section">
        <h2>1. 도입 배경 및 필요성</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          기존의 방대한 텍스트 위주의 매뉴얼은 영업사원이 현장(전화/대면)에서 해지 요청을 받았을 때 <strong>즉각적으로 대처하기 어렵습니다.</strong><br/>
          본 시스템은 상황별, 고객 심리별 최적의 스크립트와 리텐션 전략을 <strong>AI 및 검색 기반으로 실시간 제공</strong>하여 방어 성공률을 극대화합니다.
        </p>
      </section>

      <section className="report-section">
        <h2>2. 주요 도입 효과 (기대치)</h2>
        <div className="stat-grid">
          <div className="stat-box">
            <div className="stat-num">15% ▲</div>
            <div className="stat-label">해지 방어 성공률 상승</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">40% ▼</div>
            <div className="stat-label">신입 사원 교육 시간 단축</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">10초 이내</div>
            <div className="stat-label">상황별 맞춤 스크립트 검색</div>
          </div>
        </div>
      </section>

      <section className="report-section">
        <h2>3. 핵심 기능 소개</h2>
        <ul style={{ fontSize: '1.1rem', lineHeight: 2 }}>
          <li><strong>음성/키워드 통합 검색:</strong> 현장에서 즉시 "비싸다", "폐업" 등 키워드로 대응법 도출</li>
          <li><strong>고객 유형별 심리 분석:</strong> 단순 가격 불만인지, 불만 누적인지 파악하여 맞춤형 응대 제공</li>
          <li><strong>AI 챗봇 연동 (예정):</strong> 실시간 대화형으로 복합적인 상황에 대한 해답 제시</li>
          <li><strong>관리자 통계 및 피드백:</strong> 현장의 의견을 수렴하여 즉시 정책/스크립트 업데이트 가능</li>
        </ul>
      </section>

      <section className="report-section">
        <h2>4. 결론</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          본 <strong>고객해지방어 Q&A 시스템</strong> 도입은 단순한 툴의 변화가 아닌, 영업 조직 전체의 <strong>'실시간 대응 민첩성'</strong>을 높이는 투자입니다. 
          이탈 고객 1명을 방어할 때 절감되는 마케팅 비용을 고려할 때, 본 시스템은 즉각적인 ROI(투자 대비 수익)를 창출할 것입니다.
        </p>
      </section>

    </main>
  );
}
