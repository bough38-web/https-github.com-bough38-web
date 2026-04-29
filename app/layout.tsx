import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '해지방어 Q&A 시스템',
  description: '경비업체 리텐션 전략 및 현장 스크립트 가이드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <div className="fixed bottom-4 right-4 text-xs text-slate-400/60 z-[9999] pointer-events-none select-none tracking-wide">
          Copyright © 2026.05 Seeun Papa. All rights reserved. 본 저작물의 무단 전재 및 재배포를 엄격히 금지합니다.
        </div>
      </body>
    </html>
  );
}
