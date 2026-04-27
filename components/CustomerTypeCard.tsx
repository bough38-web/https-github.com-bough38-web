import { CustomerType } from '@/types';

export default function CustomerTypeCard({ item }: { item: CustomerType }) {
  return (
    <article className="card">
      <h2>{item.name}</h2>
      <p className="small">{item.psychology}</p>
      <div className="section-title">추천 접근</div>
      <ul>{item.approach.map((s) => <li key={s}>{s}</li>)}</ul>
      <div className="section-title">피해야 할 대응</div>
      <ul>{item.avoid.map((s) => <li key={s}>{s}</li>)}</ul>
    </article>
  );
}
