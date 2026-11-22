import { STATUSES } from '../data/sampleTasks'

export default function FilterTabs({ active, onChange, totalCount }) {
  const tabs = ['All', ...STATUSES]

  return (
    <div className="tabs" role="group" aria-label="Filter by status">
      {tabs.map(tab => (
        <button
          key={tab}
          className={tab === active ? 'tab active' : 'tab'}
          onClick={() => onChange(tab)}
          aria-pressed={tab === active}
        >
          {tab === 'All' ? `All tasks ${totalCount}` : tab}
        </button>
      ))}
    </div>
  )
}