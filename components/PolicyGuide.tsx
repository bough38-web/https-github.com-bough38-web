'use client';

import React, { useState, useEffect } from 'react';
import { PolicyData } from '@/types';

export default function PolicyGuide() {
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/policy')
      .then(res => res.json())
      .then(data => {
        setPolicy(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load policy data', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !policy) {
    return null; // Or a simple skeleton loading state
  }

  return (
    <details className="policy-accordion">
      <summary className="policy-summary">
        <span className="summary-title">📖 리텐션P값 승인 정책안내 (접기/펼치기)</span>
        <span className="summary-icon">▼</span>
      </summary>
      
      <div className="policy-content">
        <h2>해지방어 P값 사용 및 승인 기준</h2>

        <div className="desc-box">
          <strong>■ 대상:</strong> 
          <ul>
            {policy.targets.map((target, idx) => (
              <li key={idx}>{target}</li>
            ))}
            {policy.note && <li className="note">{policy.note}</li>}
          </ul>
          {policy.important && <strong className="important">{policy.important}</strong>}
        </div>

        <div className="table-responsive">
          <table className="policy-table">
            <thead>
                <tr className="header-main">
                    <th rowSpan={2}>구분</th>
                    <th rowSpan={2}>보고 기준<br/>(계약 월정료)</th>
                    <th rowSpan={2}>보고자<br/>(SP/SC)</th>
                    <th colSpan={4}>전결권자</th>
                </tr>
                <tr className="sub-bg">
                    <th>지사장</th>
                    <th>지역본부장</th>
                    <th>사내채널팀장</th>
                    <th>마케팅본부장</th>
                </tr>
            </thead>
            <tbody>
              {policy.rules.map((rule) => (
                <tr key={rule.id}>
                  {!rule.hideType && (
                    <td rowSpan={rule.typeSpan} className="sub-bg font-bold">{rule.type}</td>
                  )}
                  {!rule.hideCriteria && (
                    <td rowSpan={rule.criteriaSpan}>{rule.criteria}</td>
                  )}
                  <td>{rule.condition}</td>
                  <td>{rule.jisa}</td>
                  <td>{rule.jiyeok}</td>
                  <td>{rule.yeongup}</td>
                  <td>{rule.marketing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="note-footer">
          {policy.footerNotes.map((note, idx) => (
            <div key={idx}>{note}</div>
          ))}
        </div>
      </div>
    </details>
  );
}
