import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '해지방어 Q&A 시스템',
  description: '경비업체 리텐션 전략 및 현장 스크립트 가이드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
