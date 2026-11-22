export default function StatCard({ title, value, caption, icon: Icon }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-bottom">
        <strong className="stat-value">{value}</strong>
        <span className="stat-caption">{caption}</span>
      </div>
    </article>
  )
}