'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';

// Mock Data for Security Company Churn Analysis
const monthlyData = [
  { month: '2025-05', rate: 4.2 },
  { month: '2025-06', rate: 4.0 },
  { month: '2025-07', rate: 4.5 },
  { month: '2025-08', rate: 4.8 },
  { month: '2025-09', rate: 4.3 },
  { month: '2025-10', rate: 4.1 },
  { month: '2025-11', rate: 3.8 },
  { month: '2025-12', rate: 3.5 },
  { month: '2026-01', rate: 3.2 },
  { month: '2026-02', rate: 3.0 },
  { month: '2026-03', rate: 2.8 },
  { month: '2026-04', rate: 2.5 },
];

const churnReasons = [
  { reason: '가격 부담', value: 35, color: '#3b82f6' },
  { reason: '서비스 불만', value: 25, color: '#60a5fa' },
  { reason: '경쟁사 이직', value: 20, color: '#93c5fd' },
  { reason: '폐업/이전', value: 15, color: '#bfdbfe' },
  { reason: '기타', value: 5, color: '#eff6ff' },
];

export default function AnalysisPage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '40px' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔐</div>
      <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>시스템 점검 및 데이터 업데이트 중</h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', lineHeight: '1.6' }}>
        현재 해지율 통계 데이터 동기화 및 보안 점검을 위해 해당 페이지를 일시적으로 닫아두었습니다. 
        점검 완료 후 다시 공개될 예정입니다. 이용에 불편을 드려 죄송합니다.
      </p>
      <Link href="/" className="btn-primary" style={{ marginTop: '30px', background: 'var(--color-primary)' }}>
        메인 화면으로 돌아가기
      </Link>
    </main>
  );
}
